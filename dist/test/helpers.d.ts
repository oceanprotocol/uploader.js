/// <reference types="node" />
import { FileData } from '../src/@types'
export declare function getTransactionWithRetry(
  transactionHash: string,
  maxRetries?: number,
  interval?: number
): Promise<any>
export declare function getDataWithRetry(
  transactionHash: string,
  maxRetries?: number,
  interval?: number
): Promise<any>
export declare function createFileList(files: Buffer[]): FileList
export declare function calculateFilesLength(files: FileList): FileData[]
