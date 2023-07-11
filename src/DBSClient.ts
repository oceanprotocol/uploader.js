import { ethers, Signer } from 'ethers'
import axios from 'axios'
import FormData from 'form-data'
import {
  StorageInfo,
  GetQuoteArgs,
  GetQuoteResult,
  GetStatusResult,
  GetLinkResult,
  RegisterArgs,
  File
} from './@types'
import { getSignedHash } from './utils'

/**
 * DBSClient is a TypeScript library for interacting with the DBS API.
 */
export class DBSClient {
  private baseURL: string
  private signer: Signer

  /**
   * Creates an instance of the DBSClient.
   * @param {string} baseURL - The base URL of the DBS API.
   * @param {Signer} signer The signer object.
   */
  constructor(baseURL: string, signer?: Signer) {
    this.baseURL = baseURL
    this.signer = signer
  }

  /**
   * Fetches information about supported storage types and payments.
   *
   * @returns {Promise<StorageInfo[]>} - A promise that resolves to an array of storage information.
   */
  async getStorageInfo(): Promise<StorageInfo[]> {
    const response = await axios.get<StorageInfo[]>(`${this.baseURL}/`)
    return response.data
  }

  /**
   * Fetches a quote for storing files on a specific storage.
   *
   * @param {GetQuoteArgs} args - The arguments needed for getting a quote.
   * @returns {Promise<GetQuoteResult>} - A promise that resolves to the quote result.
   */
  async getQuote(args: GetQuoteArgs): Promise<GetQuoteResult> {
    const response = await axios.post<GetQuoteResult>(`${this.baseURL}/getQuote`, args)
    return response.data
  }

  /**
   * Uploads files according to the quote request.
   *
   * @param {string} quoteId - The quote ID.
   * @param {File[]} files - An array of files to upload.
   * @returns {Promise<void>}
   */
  async upload(quoteId: string, files: File[]): Promise<void> {
    const nonce = Date.now()
    const signature = await getSignedHash(this.signer, quoteId, nonce)
    const formData = new FormData()
    files.forEach((file, index) => {
      formData.append(`file${index}`, new Blob([new ArrayBuffer(file.length)]))
    })

    await axios.post(`${this.baseURL}/upload`, formData, {
      params: { quoteId, nonce, signature },
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }

  /**
   * Fetches a quote for storing files on a specific storage and uploads files according to the quote request.
   * @param {GetQuoteArgs} args - The arguments needed for getting a quote.
   * @returns {Promise<GetQuoteResult>}
   */
  async getQuoteAndUpload(args: GetQuoteArgs): Promise<GetQuoteResult> {
    const quote = await this.getQuote(args)
    await this.upload(quote.quoteId, args.files)
    return quote
  }

  /**
   * Fetches the status of a job.
   *
   * @param {string} quoteId - The quote ID.
   * @returns {Promise<GetStatusResult>} - A promise that resolves to the status result.
   */
  async getStatus(quoteId: string): Promise<GetStatusResult> {
    const response = await axios.post<GetStatusResult>(`${this.baseURL}/getStatus`, {
      quoteId
    })
    return response.data
  }

  /**
   * Fetches the DDO files object for a job.
   *
   * @param {string} quoteId - The quote ID.
   * @returns {Promise<GetLinkResult[]>} - A promise that resolves to an array of link results.
   */

  async getLink(quoteId: string): Promise<GetLinkResult[]> {
    const nonce = Date.now()
    const signature = await getSignedHash(this.signer, quoteId, nonce)
    const response = await axios.post<GetLinkResult[]>(`${this.baseURL}/getLink`, null, {
      params: { quoteId, nonce, signature }
    })
    return response.data
  }

  /**
   * Registers a new microservice that handles a storage type.
   *
   * @param {RegisterArgs} args - The arguments needed for registering a microservice.
   * @returns {Promise<void>}
   */
  async registerMicroservice(args: RegisterArgs): Promise<void> {
    await axios.post(`${this.baseURL}/register`, args)
  }
}
