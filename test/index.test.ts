import { ethers, JsonRpcProvider, Contract } from 'ethers'
import { assert, expect } from 'chai'
import dotenv from 'dotenv'
import fs, { readFileSync } from 'fs'
import Arweave from 'arweave'

import { DBSClient } from '../src/index'
import { StorageInfo, GetQuoteArgs, RegisterArgs } from '../src/@types'
import { minErc20Abi } from '../src/utils'
import { getTransactionWithRetry, getDataWithRetry } from './helpers'

dotenv.config()

function readFileIntoBuffer(filePath: string): Buffer {
  return fs.readFileSync(filePath)
}

describe('DBSClient', () => {
  let info: StorageInfo[]
  // Set up a new instance of the DBS client
  const provider = new JsonRpcProvider(process.env.RPC_URL, 80001)
  // Private key account needs to have both MATIC and Wrapped Matic for testing
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
  const client = new DBSClient(process.env.DBS_API_URL, signer)

  const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
  })

  describe('Testing the registerMicroservice endpoint', () => {
    const args: RegisterArgs = {
      type: 'TEST-' + String(Math.random()),
      description: 'File storage on FileCoin',
      url: 'http://microservice.url',
      paymentMethods: [
        {
          chainId: '1',
          acceptedTokens: [
            {
              title: 'OCEAN',
              value: '0x967da4048cD07aB37855c090aAF366e4ce1b9F48'
            },
            {
              title: 'USDC',
              value: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
            }
          ]
        },
        {
          chainId: '80001',
          acceptedTokens: [
            {
              title: 'OCEAN',
              value: '0xd8992Ed72C445c35Cb4A2be468568Ed1079357c8'
            }
          ]
        },
        {
          chainId: '5',
          acceptedTokens: [
            {
              title: 'OCEAN',
              value: '0xCfDdA22C9837aE76E0faA845354f33C62E03653a'
            }
          ]
        }
      ]
    }
    it('should register a microservice successfully', async () => {
      const response = await client.registerMicroservice(args)

      assert(response.status === 201, 'registerMicroservice failed: Status is not 200')
      assert(
        response.statusText === 'Created',
        'registerMicroservice failed: StatusText is not OK'
      )
      assert(response.data === 'Desired storage created.', 'Wrong register response')
    })

    it('should recieve the correct response when trying to register the same microservice again', async () => {
      const response = await client.registerMicroservice(args)

      assert(response.status === 200, 'registerMicroservice failed: Status is not 200')
      assert(
        response.data === 'Chosen storage type is already active and registered.',
        'Wrong registerMicroservice response'
      )
    })
  })

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

      expect(result).to.be.an('object')
      expect(result.quoteId).to.be.a('string')
      expect(result.tokenAmount).to.be.a('number')
      expect(result.approveAddress).to.be.a('string')
      expect(result.chainId).to.be.a('string')
      expect(result.tokenAddress).to.be.a('string')
    })
    it('should return a quote for uploading a file to Arweave when using file paths', async () => {
      const args: GetQuoteArgs = {
        type: 'arweave',
        duration: 4353545453,
        payment: {
          chainId: '80001',
          tokenAddress: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889'
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
    it('should return a quote for uploading a file to Arweave when using file sizes', async () => {
      const args: GetQuoteArgs = {
        type: 'arweave',
        duration: 4353545453,
        payment: {
          chainId: '80001',
          tokenAddress: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889'
        },
        userAddress: process.env.USER_ADDRESS,
        filePath: undefined,
        fileInfo: [{ length: 1000 }, { length: 9999 }]
      }
      const result = await client.getQuote(args)
      expect(result).to.be.an('object')
      expect(result.quoteId).to.be.a('string')
      expect(result.tokenAmount).to.be.a('number')
      expect(result.approveAddress).to.be.a('string')
      expect(result.chainId).to.be.a('string')
      expect(result.tokenAddress).to.be.a('string')
    })
  })
  describe('Testing the upload, status and getLink endpoints', async function () {
    this.timeout(200000)
    let arweaveQuote: any

    // it('should upload files successfully to filecoin', async () => {
    //   const tokenAddress = '0x742DfA5Aa70a8212857966D491D67B09Ce7D6ec7'
    //   const args: GetQuoteArgs = {
    //     type: 'filecoin',
    //     duration: 4353545453,
    //     payment: {
    //       chainId: '80001',
    //       tokenAddress
    //     },
    //     userAddress: process.env.USER_ADDRESS,
    //     filePath: [process.env.TEST_FILE_1, process.env.TEST_FILE_2]
    //   }
    //   const result = await client.getQuote(args)

    //   const resultFromUpload = await client.upload(result.quoteId, tokenAddress, [
    //     process.env.TEST_FILE_1,
    //     process.env.TEST_FILE_2
    //   ])
    //   console.log('resultFromUpload', resultFromUpload.data)
    //   // Add more assertions based on expected response
    // })

    it('should upload files successfully to Arweave', async () => {
      const tokenAddress = '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889'
      // const token = new Contract(tokenAddress, minErc20Abi, signer)
      // const userBalanceBefore = await token.balanceOf(process.env.USER_ADDRESS)

      const args: GetQuoteArgs = {
        type: 'arweave',
        duration: 4353545453,
        payment: {
          chainId: '80001',
          tokenAddress
        },
        userAddress: process.env.USER_ADDRESS,
        filePath: [process.env.TEST_FILE_1, process.env.TEST_FILE_2]
      }
      arweaveQuote = await client.getQuote(args)

      const result = await client.upload(arweaveQuote.quoteId, tokenAddress, [
        process.env.TEST_FILE_1,
        process.env.TEST_FILE_2
      ])

      // Check that upload succeeded
      assert(result.status === 200, 'Upload failed')
      assert(result.statusText === 'OK', 'Upload failed')
      assert(result.data === 'File upload succeeded.', 'Upload failed')

      // check that user's balance was reduced by the right token amount

      // const userBalanceAfter = await token.balanceOf(process.env.USER_ADDRESS)
      // console.log('userBalanceBefore', userBalanceBefore.toString())
      // console.log('userBalanceAfter', userBalanceAfter.toString())
      // console.log('quote.tokenAmount', quote.tokenAmount.toString())
      // assert(
      //   Number(userBalanceBefore) - Number(userBalanceAfter) === quote.tokenAmount,
      //   'User balance reduced by wrong tokenAmount'
      // )
    })

    it('Arweave upload should return 400 status', async () => {
      let status
      while (status !== 400) {
        status = (await client.getStatus(arweaveQuote.quoteId)).status
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

    it('should return a link for arweave', async () => {
      let result
      try {
        result = await client.getLink(arweaveQuote.quoteId)
        console.log('result', result)
      } catch (error) {
        console.log('error', error)
      }

      assert(result, 'No response returned from getLink request')
      expect(result).to.be.an('array', 'Response is not an array')
      assert(result[0].type === 'arweave', 'Wrong type')
      assert(result[1].type === 'arweave', 'Wrong type')
      assert(result[0].transactionHash, 'Missing the first transaction hash')
      assert(result[1].transactionHash, 'Missing the second transaction hash')
      console.log('1 tests passed')

      const transactionHash1 = result[0].transactionHash
      const transactionHash2 = result[1].transactionHash

      assert(transactionHash1 !== transactionHash2, 'Transaction hashes are the same')
      const formatRegex = /^[a-zA-Z0-9_-]{43}$/
      assert(formatRegex.test(transactionHash1), 'Wrong format for transactionHash1')
      assert(formatRegex.test(transactionHash2), 'Wrong format for transactionHash2')

      console.log('2 tests passed')

      // const transaction1 = await getTransactionWithRetry(transactionHash1)
      // const transaction2 = await getTransactionWithRetry(transactionHash2)

      // console.log(transaction1)
      // console.log(transaction2)

      // assert(transaction1, 'No transaction returned for transactionHash1')
      // assert(transaction2, 'No transaction returned for transactionHash2')
      // assert(transaction1.id, 'No id for transactionHash1')
      // assert(transaction2.id, 'No id for transactionHash2')

      const data1 = await getDataWithRetry(transactionHash1)
      const data2 = await getDataWithRetry(transactionHash1)

      console.log('data1', data1)
      console.log('data2', data2)
    })
  })
})
