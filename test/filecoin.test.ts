import { ethers, JsonRpcProvider } from 'ethers'
import { assert, expect } from 'chai'
import dotenv from 'dotenv'

import { UploaderClient } from '../src/index'
import { StorageInfo, GetQuoteArgs } from '../src/@types'

dotenv.config()

describe('Filecoin Tests', () => {
  let info: StorageInfo[]
  // Set up a new instance of the Uploader client
  const provider = new JsonRpcProvider(process.env.RPC_URL, 80001)
  // Private key account needs to have both MATIC and Wrapped Matic for testing
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
  const client = new UploaderClient(
    process.env.UPLOADER_API_URL,
    process.env.UPLOADER_ACCOUNT,
    signer
  )

  describe('Testing getStorageInfo endpoint', () => {
    it('should return an array of storage info', async () => {
      info = await client.getStorageInfo()
      expect(info).to.be.an('array')
      expect(info[0].payment).to.be.an('array')
      expect(info[0].payment).to.be.an('array')
      assert(info[0].type === 'filecoin' || info[1].type === 'filecoin')
      assert(
        info[0].description === 'File storage on FileCoin' ||
          info[1].description === 'File storage on FileCoin'
      )
      assert(info[0].type === 'arweave' || info[1].type === 'arweave')
      assert(
        info[0].description === 'File storage on Arweave' ||
          info[1].description === 'File storage on Arweave'
      )
    })
  })
  describe('Testing getQuote endpoint', () => {
    it('should return a quote for uploading a file to Filecoin when using file paths', async () => {
      const args: GetQuoteArgs = {
        type: 'filecoin',
        duration: 4353545453,
        payment: {
          chainId: '80001',
          tokenAddress: '0x742DfA5Aa70a8212857966D491D67B09Ce7D6ec7'
        },
        userAddress: process.env.USER_ADDRESS,
        filePath: [process.env.TEST_FILE_1, process.env.TEST_FILE_2]
      }
      const result = await client.getQuote(args)
      expect(result).to.be.an('object')
      expect(result.quoteId).to.be.a('string')
      expect(result.tokenAmount).to.be.a('number')
      expect(result.approveAddress).to.be.a('string')
      expect(result.chainId).to.be.a('string')
      expect(result.tokenAddress).to.be.a('string')
    })
    it('should return a quote for uploading a file to Filecoin when using file sizes', async () => {
      const args: GetQuoteArgs = {
        type: 'filecoin',
        duration: 4353545453,
        payment: {
          chainId: '80001',
          tokenAddress: '0x742DfA5Aa70a8212857966D491D67B09Ce7D6ec7'
        },
        userAddress: process.env.USER_ADDRESS,
        filePath: undefined,
        fileInfo: [{ length: 1000 }, { length: 9999 }]
      }
      const result = await client.getQuote(args)
      console.log('quote result', result)

      expect(result).to.be.an('object')
      expect(result.quoteId).to.be.a('string')
      expect(result.tokenAmount).to.be.a('number')
      expect(result.approveAddress).to.be.a('string')
      expect(result.chainId).to.be.a('string')
      expect(result.tokenAddress).to.be.a('string')
    })
  })
  describe('Testing the upload, status and getLink endpoints', async function () {
    this.timeout(2000000)
    let quoteResult

    it('should upload files successfully to filecoin', async () => {
      const tokenAddress = '0x21C561e551638401b937b03fE5a0a0652B99B7DD'
      const args: GetQuoteArgs = {
        type: 'filecoin',
        duration: 4353545453,
        payment: {
          chainId: '80001',
          tokenAddress
        },
        userAddress: process.env.USER_ADDRESS,
        filePath: [process.env.TEST_FILE_1]
      }
      quoteResult = await client.getQuote(args)
      console.log('quote result', quoteResult)

      const uploadResult = await client.upload(
        quoteResult.quoteId,
        tokenAddress,
        String(quoteResult.tokenAmount),
        [process.env.TEST_FILE_1, process.env.TEST_FILE_2],
        'filecoin'
      )
      console.log('resultFromUpload', uploadResult.data)

      assert(uploadResult.status === 200, 'Upload failed')
      assert(uploadResult.statusText === 'OK', 'Upload failed')
      assert(uploadResult.data === 'File upload succeeded.', 'Upload failed')
    })

    it('Filecoin local file upload should return 400 status', async () => {
      let status
      while (status !== 400) {
        const response = await client.getStatus(quoteResult.quoteId)
        console.log('response', response)
        status = response.status

        console.log('status', status)
        assert(
          status !== 200,
          'Upload failed with status: QUOTE_STATUS_PAYMENT_PULL_FAILED'
        )
        assert(
          status !== 201,
          'Upload failed with status: QUOTE_STATUS_PAYMENT_UNWRAP_FAILED'
        )
        assert(
          status !== 202,
          'Upload failed with status: QUOTE_STATUS_PAYMENT_PUSH_FAILED'
        )
        assert(
          status !== 401,
          'Upload failed with status: QUOTE_STATUS_UPLOAD_INTERNAL_ERROR'
        )
        assert(
          status !== 402,
          'Upload failed with status: QUOTE_STATUS_UPLOAD_ACTUAL_FILE_LEN_EXCEEDS_QUOTE'
        )
        assert(
          status !== 403,
          'Upload failed with status: QUOTE_STATUS_UPLOAD_DOWNLOAD_FAILED'
        )
        assert(
          status !== 404,
          'Upload failed with status: QUOTE_STATUS_UPLOAD_UPLOAD_FAILED'
        )
        await new Promise((resolve) => setTimeout(resolve, 5000))
      }
      assert(status === 400, 'Upload succeeded with status: QUOTE_STATUS_UPLOAD_END')
    })

    it('should return a link for filecoin local file upload', async () => {
      let result
      try {
        result = await client.getLink(quoteResult.quoteId)
        console.log('result', result)
      } catch (error) {
        console.log('error', error)
      }

      // assert(result, 'No response returned from getLink request')
      // expect(result).to.be.an('array', 'Response is not an array')
      // assert(result[0].type === 'filecoin', 'Wrong type')
      // assert(result[1].type === 'arweave', 'Wrong type')
      // assert(result[0].transactionHash, 'Missing the first transaction hash')
      // assert(result[1].transactionHash, 'Missing the second transaction hash')
      // console.log('1 tests passed')

      // const transactionHash1 = result[0].transactionHash
      // const transactionHash2 = result[1].transactionHash

      // assert(transactionHash1 !== transactionHash2, 'Transaction hashes are the same')
      // const formatRegex = /^[a-zA-Z0-9_-]{43}$/
      // assert(formatRegex.test(transactionHash1), 'Wrong format for transactionHash1')
      // assert(formatRegex.test(transactionHash2), 'Wrong format for transactionHash2')

      // console.log('2 tests passed')

      // const transaction1 = await getTransactionWithRetry(transactionHash1)
      // const transaction2 = await getTransactionWithRetry(transactionHash2)

      // console.log(transaction1)
      // console.log(transaction2)

      // assert(transaction1, 'No transaction returned for transactionHash1')
      // assert(transaction2, 'No transaction returned for transactionHash2')
      // assert(transaction1.id, 'No id for transactionHash1')
      // assert(transaction2.id, 'No id for transactionHash2')

      // const data1 = await getDataWithRetry(transactionHash1)
      // const data2 = await getDataWithRetry(transactionHash1)

      // console.log('data1', data1)
      // console.log('data2', data2)
    })
  })
})
