/// <reference types="node" />
import { Signer } from 'ethers'
import {
  StorageInfo,
  GetQuoteArgs,
  GetQuoteResult,
  GetStatusResult,
  GetLinkResult,
  RegisterArgs
} from './@types'
import { ReadStream } from 'fs'
/**
 * DBSClient is a TypeScript library for interacting with the DBS API.
 */
export declare class DBSClient {
  private baseURL
  private signer
  /**
   * Creates an instance of the DBSClient.
   * @param {string} baseURL - The base URL of the DBS API.
   * @param {Signer} signer The signer object.
   */
  constructor(baseURL: string, signer?: Signer)
  private validateBaseURL
  /**
   * Fetches information about supported storage types and payments.
   *
   * @returns {Promise<StorageInfo[]>} - A promise that resolves to an array of storage information.
   */
  getStorageInfo(): Promise<StorageInfo[]>
  /**
   * Fetches a quote for storing files on a specific storage.
   *
   * @param {GetQuoteArgs} args - The arguments needed for getting a quote.
   * @returns {Promise<GetQuoteResult>} - A promise that resolves to the quote result.
   */
  getQuote(args: GetQuoteArgs): Promise<GetQuoteResult>
  /**
   * Uploads files according to the quote request.
   *
   * @param {string} quoteId - The quote ID.
   * @param {ReadStream[]} files - An array of files to upload.
   * @returns {Promise<void>}
   */
  upload(quoteId: string, files: ReadStream[]): Promise<any>
  /**
   * Fetches a quote for storing files on a specific storage and uploads files according to the quote request.
   * @param {GetQuoteArgs} args - The arguments needed for getting a quote.
   * @returns {Promise<GetQuoteResult>}
   */
  getQuoteAndUpload(args: GetQuoteArgs): Promise<any>
  /**
   * Fetches the status of a job.
   *
   * @param {string} quoteId - The quote ID.
   * @returns {Promise<GetStatusResult>} - A promise that resolves to the status result.
   */
  getStatus(quoteId: string): Promise<GetStatusResult>
  /**
   * Fetches the DDO files object for a job.
   *
   * @param {string} quoteId - The quote ID.
   * @returns {Promise<GetLinkResult[]>} - A promise that resolves to an array of link results.
   */
  getLink(quoteId: string): Promise<GetLinkResult[]>
  /**
   * Registers a new microservice that handles a storage type.
   *
   * @param {RegisterArgs} args - The arguments needed for registering a microservice.
   * @returns {Promise<void>}
   */
  registerMicroservice(args: RegisterArgs): Promise<void>
}
