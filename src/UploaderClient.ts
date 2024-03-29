import { Signer, Contract } from 'ethers'
import axios, { AxiosResponse } from 'axios'
import {
  StorageInfo,
  GetQuoteArgs,
  GetQuoteResult,
  GetStatusResult,
  GetLinkResult,
  RegisterArgs,
  UploaderGetQuoteArgs,
  FileData
} from './@types'
import { getSignedHash } from './utils'
import wMaticAbi from './utils/wMaticAbi.json'
import validator from 'validator'
import fs from 'fs'
import FormData from 'form-data'

/**
 * Client is a TypeScript library for interacting with the Uploader API.
 */
export class UploaderClient {
  private baseURL: string
  private signer: Signer
  private uploaderAddress: string

  /**
   * Creates an instance of the Client.
   * @param {string} baseURL - The base URL of the Uploader API.
   * @param {Signer} signer The signer object.
   */
  constructor(baseURL: string, address: string, signer?: Signer) {
    this.validateBaseURL(baseURL)
    this.baseURL = baseURL
    this.signer = signer
    this.uploaderAddress = address
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
  async getQuote(args: GetQuoteArgs): Promise<GetQuoteResult> {
    if (!args.filePath && !args.fileInfo) {
      throw new Error('Either filePath or fileInfo must be provided.')
    }
    const fileSizes: FileData[] = args.fileInfo || this.getFileSizes(args.filePath)

    const payload: UploaderGetQuoteArgs = {
      type: args.type,
      files: fileSizes,
      duration: args.duration,
      payment: args.payment,
      userAddress: args.userAddress
    }

    const response = await axios.post<GetQuoteResult>(`${this.baseURL}/getQuote`, payload)

    return response.data
  }

  /**
   * Uploads files according to the quote request.
   *
   * @param {string} quoteId - The quote ID.
   * @param {Buffer[]} files - An array of files to upload.
   * @returns {Promise<void>}
   */
  async upload(
    quoteId: string,
    tokenAddress: string,
    quoteFee: string,
    filePaths: string[],
    type: string
  ): Promise<any> {
    try {
      const nonce = Math.round(Date.now() / 1000)

      if (type !== 'ipfs') {
        const token = new Contract(tokenAddress, wMaticAbi, this.signer)

        // This needs to be updated to include other addresses once we have the deposit contract deployed on other networks
        const approveAddress =
          type === 'filecoin'
            ? '0x0ff9092e55d9f6CCB0DD4C490754811bc0839866'
            : this.uploaderAddress

        await (await token.approve(approveAddress, quoteFee)).wait()
      }

      const signature = await getSignedHash(this.signer, quoteId, nonce)

      const formData = new FormData()
      // Add each file to the form data
      filePaths.forEach((path, index) => {
        formData.append(`file${index + 1}`, fs.createReadStream(path))
      })

      const uploadUrl = `${this.baseURL}/upload?quoteId=${quoteId}&nonce=${nonce}&signature=${signature}`
      console.log('uploadUrl', uploadUrl)

      const response = await axios.post(uploadUrl, formData, {
        headers: {
          ...formData.getHeaders()
        }
      })

      return response
    } catch (error) {
      console.error('Error:', error)
      return error.data
    }
  }

  async uploadBrowser(
    quoteId: string,
    tokenAddress: string,
    quoteFee: string,
    files: FileList,
    type: string
  ): Promise<any> {
    try {
      const nonce = Math.round(Date.now() / 1000)
      if (type !== 'ipfs') {
        const token = new Contract(tokenAddress, wMaticAbi, this.signer)
        console.log(`quote fee: ${quoteFee}`)

        // This needs to be updated to include other addresses once we have the deposit contract deployed on other networks
        const approveAddress =
          type === 'filecoin'
            ? '0x0ff9092e55d9f6CCB0DD4C490754811bc0839866'
            : this.uploaderAddress

        console.log(
          `Calling approval with address: ${approveAddress} and amount: ${quoteFee}`
        )
        const tx = await token.approve(approveAddress, quoteFee)
        const receipt = await tx.wait(1)
        console.log('transaction receipt', receipt)

        // check user has sufficient balance
        const balance = await token.balanceOf(this.signer.getAddress())
        console.log(`User balance of WMATIC: ${balance}`)

        if (balance < quoteFee) {
          console.log(
            `User balance of ${balance} WMATIC is less than quote fee of ${quoteFee}`
          )
          throw new Error('Insufficient WMATIC balance')
        }
      }

      const signature = await getSignedHash(this.signer, quoteId, nonce)

      const formData = new FormData()
      // Add each file to the form data
      Array.from(files).forEach((file, index) => {
        formData.append(`file${index + 1}`, file, file.name)
      })

      const uploadUrl = `${this.baseURL}/upload?quoteId=${quoteId}&nonce=${nonce}&signature=${signature}`

      const response = await axios.post(uploadUrl, formData)

      return response
    } catch (error) {
      console.error('Error:', error)
      return error.data
    }
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
    const response = await axios.get<GetStatusResult>(`${this.baseURL}/getStatus`, {
      params: {
        quoteId
      }
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
    const nonce = Math.round(Date.now() / 1000)
    const signature = await getSignedHash(this.signer, quoteId, nonce)
    const response = await axios.get<GetLinkResult[]>(`${this.baseURL}/getLink`, {
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
  async registerMicroservice(args: RegisterArgs): Promise<AxiosResponse> {
    const response = await axios.post(`${this.baseURL}/register`, args)
    return response
  }

  /**
   * Retrieves the quote history for the given user address, nonce, and signature.
   *
   * @returns {Promise<any>} A promise that resolves to the quote history data.
   */
  async getHistory(
    page: number = 1,
    pageSize: number = 25,
    storageType: string
  ): Promise<any> {
    try {
      const userAddress = await this.signer.getAddress()
      const nonce = Math.round(Date.now() / 1000)
      const signature = await getSignedHash(this.signer, '', nonce)

      // Construct the URL with the query parameters
      const url = `${this.baseURL}/getHistory?userAddress=${userAddress}&nonce=${nonce}&signature=${signature}&page=${page}&pageSize=${pageSize}&storage=${storageType}`

      // Send a GET request
      const response: AxiosResponse = await axios.get(url)

      // Validate the response status code
      if (response.status !== 200) {
        throw new Error('Failed to retrieve history.')
      }

      return response.data
    } catch (error) {
      console.error('An error occurred while fetching history:', error)
      throw error
    }
  }
}
