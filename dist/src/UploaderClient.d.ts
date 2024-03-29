import { Signer } from 'ethers'
import { AxiosResponse } from 'axios'
import {
  StorageInfo,
  GetQuoteArgs,
  GetQuoteResult,
  GetStatusResult,
  GetLinkResult,
  RegisterArgs
} from './@types'
/**
 * Client is a TypeScript library for interacting with the Uploader API.
 */
export declare class UploaderClient {
  private baseURL
  private signer
  private uploaderAddress
  /**
   * Creates an instance of the Client.
   * @param {string} baseURL - The base URL of the Uploader API.
   * @param {Signer} signer The signer object.
   */
  constructor(baseURL: string, address: string, signer?: Signer)
  private validateBaseURL
  private getFileSizes
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
   * @param {Buffer[]} files - An array of files to upload.
   * @returns {Promise<void>}
   */
  upload(
    quoteId: string,
    tokenAddress: string,
    quoteFee: string,
    filePaths: string[],
    type: string
  ): Promise<any>
  uploadBrowser(
    quoteId: string,
    tokenAddress: string,
    quoteFee: string,
    files: FileList,
    type: string
  ): Promise<any>
  /**
   * Fetches a quote for storing files on a specific storage and uploads files according to the quote request.
   * @param {GetQuoteArgs} args - The arguments needed for getting a quote.
   * @returns {Promise<GetQuoteResult>}
   */
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
  registerMicroservice(args: RegisterArgs): Promise<AxiosResponse>
  /**
   * Retrieves the quote history for the given user address, nonce, and signature.
   *
   * @returns {Promise<any>} A promise that resolves to the quote history data.
   */
  getHistory(page: number, pageSize: number, storageType: string): Promise<any>
}
