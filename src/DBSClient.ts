import { Signer } from 'ethers'
import axios from 'axios'
import {
  StorageInfo,
  GetQuoteArgs,
  GetQuoteResult,
  GetStatusResult,
  GetLinkResult,
  RegisterArgs,
  AcceptedPayment,
  FileData
} from './@types'
import { getSignedHash } from './utils'
import validator from 'validator'
import fs from 'fs'
import { createHelia } from 'helia'
import { unixfs } from '@helia/unixfs'
import { promisify } from 'util'

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
    this.validateBaseURL(baseURL)
    this.baseURL = baseURL
    this.signer = signer
  }

  private validateBaseURL(baseURL: string): void {
    if (!baseURL || typeof baseURL !== 'string' || baseURL.trim() === '') {
      throw new Error('Invalid baseURL provided. baseURL cannot be empty or undefined.')
    }

    // Using the validator library to check for a valid URL.
    // Including { require_tld: false } to allow 'localhost' as a valid URL.
    if (!validator.isURL(baseURL, { require_tld: false })) {
      throw new Error('Invalid baseURL format provided.')
    }
  }

  private getFileSizes(files: string[]): FileData[] {
    return files.map((file) => {
      const stats = fs.statSync(file)
      return {
        length: stats.size
      }
    })
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
  async getQuote(
    type: string,
    duration: number,
    payment: AcceptedPayment,
    userAddress: string,
    filePath?: string[],
    fileInfo?: FileData[]
  ): Promise<GetQuoteResult> {
    if (!filePath && !fileInfo) {
      throw new Error('Either filePath or fileInfo must be provided.')
    }
    const fileSizes: FileData[] = fileInfo || this.getFileSizes(filePath)

    const args: GetQuoteArgs = {
      type,
      files: fileSizes,
      duration,
      payment,
      userAddress
    }

    const response = await axios.post<GetQuoteResult>(`${this.baseURL}/getQuote`, args)
    return response.data
  }

  /**
   * Uploads files according to the quote request.
   *
   * @param {string} quoteId - The quote ID.
   * @param {Buffer[]} files - An array of files to upload.
   * @returns {Promise<void>}
   */
  async upload(quoteId: string, filePath: string): Promise<any> {
    // Create a Helia node
    const helia = await createHelia()

    // Create a filesystem on top of Helia, in this case it's UnixFS
    const fileSystem = unixfs(helia)
    const readFileAsync = promisify(fs.readFile)
    const fileContent = await readFileAsync(filePath)

    // Add the bytes to your node and receive a unique content identifier (CID)
    const cid = await fileSystem.addFile({
      path: filePath,
      content: fileContent
    })

    console.log('Added file:', cid.toString())
    const nonce = Date.now()
    const signature = await getSignedHash(this.signer, quoteId, nonce)

    const payload = {
      quoteId,
      nonce,
      signature,
      files: [cid]
    }
    const response = await axios.post<GetQuoteResult>(`${this.baseURL}/upload`, payload)

    return response.data
  }

  /**
   * Fetches a quote for storing files on a specific storage and uploads files according to the quote request.
   * @param {GetQuoteArgs} args - The arguments needed for getting a quote.
   * @returns {Promise<GetQuoteResult>}
   */
  // async getQuoteAndUpload(args: GetQuoteArgs): Promise<any> {
  //   const quote = await this.getQuote(args)
  //   const uploadResponse = await this.upload(quote.quoteId, args.files)
  //   return uploadResponse
  // }

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
