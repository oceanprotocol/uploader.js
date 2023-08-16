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
