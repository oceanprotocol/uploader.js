import axios from 'axios'
import {
  StorageInfo,
  GetQuoteArgs,
  GetQuoteResult,
  GetStatusResult,
  GetLinkResult,
  RegisterArgs
} from './types'

class DBSClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  async getStorageInfo(): Promise<StorageInfo[]> {
    const response = await axios.get<StorageInfo[]>(`${this.baseURL}/`)
    return response.data
  }

  async getQuote(args: GetQuoteArgs): Promise<GetQuoteResult> {
    const response = await axios.post<GetQuoteResult>(`${this.baseURL}/getQuote`, args)
    return response.data
  }

  async upload(
    quoteId: string,
    nonce: number,
    signature: string,
    files: File[]
  ): Promise<void> {
    const formData = new FormData()
    files.forEach((file, index) => {
      formData.append(`file${index}`, new Blob([new ArrayBuffer(file.length)]))
    })

    await axios.post(`${this.baseURL}/upload`, formData, {
      params: { quoteId, nonce, signature },
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }

  async getStatus(quoteId: string): Promise<GetStatusResult> {
    const response = await axios.post<GetStatusResult>(`${this.baseURL}/getStatus`, {
      quoteId
    })
    return response.data
  }

  async getLink(
    quoteId: string,
    nonce: number,
    signature: string
  ): Promise<GetLinkResult[]> {
    const response = await axios.post<GetLinkResult[]>(`${this.baseURL}/getLink`, null, {
      params: { quoteId, nonce, signature }
    })
    return response.data
  }

  async registerMicroservice(args: RegisterArgs): Promise<void> {
    await axios.post(`${this.baseURL}/register`, args)
  }
}

export default DBSClient
