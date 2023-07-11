import {
  StorageInfo,
  GetQuoteArgs,
  GetQuoteResult,
  GetStatusResult,
  GetLinkResult,
  RegisterArgs
} from './@types'
/**
 * DBSClient is a TypeScript library for interacting with the DBS API.
 */
declare class DBSClient {
  private baseURL
  /**
   * Creates an instance of the DBSClient.
   *
   * @param {string} baseURL - The base URL of the DBS API.
   */
  constructor(baseURL: string)
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
   * @param {number} nonce - A timestamp (must be higher than the previously stored nonce for the user).
   * @param {string} signature - A user-signed hash of SHA256(quoteId + nonce).
   * @param {File[]} files - An array of files to upload.
   * @returns {Promise<void>}
   */
  upload(quoteId: string, nonce: number, signature: string, files: File[]): Promise<void>
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
   * @param {number} nonce - A timestamp (must be higher than the previously stored nonce for the user).
   * @param {string} signature - A user-signed hash of SHA256(quoteId + nonce).
   * @returns {Promise<GetLinkResult[]>} - A promise that resolves to an array of link results.
   */
  getLink(quoteId: string, nonce: number, signature: string): Promise<GetLinkResult[]>
  /**
   * Registers a new microservice that handles a storage type.
   *
   * @param {RegisterArgs} args - The arguments needed for registering a microservice.
   * @returns {Promise<void>}
   */
  registerMicroservice(args: RegisterArgs): Promise<void>
}
export default DBSClient
