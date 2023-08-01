import Arweave from 'arweave'

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
