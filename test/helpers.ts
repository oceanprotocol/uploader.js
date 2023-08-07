import Arweave from 'arweave'
import { FileData } from '../src/@types'
import { Readable } from 'stream'

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https'
})

export async function getTransactionWithRetry(
  transactionHash: string,
  maxRetries: number = 10,
  interval: number = 5000
): Promise<any> {
  let retries = 0
  while (retries < maxRetries) {
    try {
      const transaction = await arweave.transactions.get(transactionHash)
      return transaction // Return the transaction if successful
    } catch (error) {
      if (error.type === 'TX_NOT_FOUND') {
        console.log(`Transaction not found. Retry attempt: ${retries + 1}`)
        retries++
        await new Promise((resolve) => setTimeout(resolve, interval))
      } else {
        throw error // If the error is not related to TX_NOT_FOUND, throw it
      }
    }
  }
  throw new Error(
    `Transaction ${transactionHash} not found after ${maxRetries} attempts.`
  )
}

export async function getDataWithRetry(
  transactionHash: string,
  maxRetries: number = 10,
  interval: number = 5000
): Promise<any> {
  let retries = 0
  while (retries < maxRetries) {
    try {
      const data = await arweave.transactions.getData(transactionHash, {
        decode: true,
        string: true
      })
      return data // Return the data if successful
    } catch (error) {
      console.log(`Attempt to retrieve data failed. Retry attempt: ${retries + 1}`)
      retries++
      await new Promise((resolve) => setTimeout(resolve, interval))
    }
  }
  throw new Error(
    `Unable to retrieve data for transaction ${transactionHash} after ${maxRetries} attempts.`
  )
}

export function createFileList(files: Buffer[]): FileList {
  const fileList: any = []

  files.forEach((file, index) => {
    fileList[index] = {
      stream: new Readable({
        read() {
          this.push(file)
          this.push(null)
        }
      }),
      name: `file${index + 1}.txt`,
      size: file.length,
      type: 'text/plain',
      lastModified: Date.now()
    }
  })

  fileList.item = (index: number) => fileList[index]
  fileList.length = files.length

  return fileList as FileList
}

export function calculateFilesLength(files: FileList): FileData[] {
  const fileInfo: FileData[] = []

  for (let i = 0; i < files.length; i++) {
    fileInfo.push({ length: files[i].size })
  }

  return fileInfo
}
