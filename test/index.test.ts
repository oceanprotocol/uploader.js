import { ethers, JsonRpcProvider, Contract } from 'ethers'
import { assert, expect } from 'chai'
import dotenv from 'dotenv'
import fs, { readFileSync } from 'fs'

import { DBSClient } from '../src/index'
import { StorageInfo, GetQuoteArgs } from '../src/@types'
import { minErc20Abi } from '../src/utils'

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

  describe('getStorageInfo', () => {
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
  describe('getQuote', () => {
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
      console.log('result', result)
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
  describe('upload', async function () {
    this.timeout(200000)
    it('should upload files successfully to filecoin', async () => {
      const tokenAddress = '0x742DfA5Aa70a8212857966D491D67B09Ce7D6ec7'
      const args: GetQuoteArgs = {
        type: 'filecoin',
        duration: 4353545453,
        payment: {
          chainId: '80001',
          tokenAddress
        },
        userAddress: process.env.USER_ADDRESS,
        filePath: [process.env.TEST_FILE_1, process.env.TEST_FILE_2]
      }
      const result = await client.getQuote(args)

      const resultFromUpload = await client.upload(result.quoteId, tokenAddress, [
        process.env.TEST_FILE_1,
        process.env.TEST_FILE_2
      ])
      console.log('resultFromUpload', resultFromUpload.data)
      // Add more assertions based on expected response
    })

    it('should upload files successfully to Arweave', async () => {
      const tokenAddress = '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889'
      const token = new Contract(tokenAddress, minErc20Abi, signer)
      const userBalanceBefore = await token.balanceOf(process.env.USER_ADDRESS)

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
      const quote = await client.getQuote(args)

      const result = await client.upload(quote.quoteId, tokenAddress, [
        process.env.TEST_FILE_1,
        process.env.TEST_FILE_2
      ])

      // Check that upload succeeded
      assert(result.status === 200, 'Upload failed')
      assert(result.statusText === 'OK', 'Upload failed')
      assert(result.data === 'File upload succeeded.', 'Upload failed')

      let status
      while (status !== 400) {
        status = await client.getStatus(quote.quoteId)
        console.log('status', status)
      }

      // check that user's balance was reduced by the right token amount

      const userBalanceAfter = await token.balanceOf(process.env.USER_ADDRESS)
      console.log('userBalanceBefore', userBalanceBefore.toString())
      console.log('userBalanceAfter', userBalanceAfter.toString())
      console.log('quote.tokenAmount', quote.tokenAmount.toString())
      // assert(
      //   Number(userBalanceBefore) - Number(userBalanceAfter) === quote.tokenAmount,
      //   'User balance reduced by wrong tokenAmount'
      // )
    })
  })

  // describe('getStatus', () => {
  //   it('should return a status', async () => {
  //     const quoteId = 'xxxx'
  //     const result = await client.getStatus(quoteId)
  //     expect(result).to.be.an('object')
  //     // Add more assertions based on expected response
  //   })
  // })

  // describe('getLink', () => {
  //   it('should return a link', async () => {
  //     const quoteId = 'xxxx'
  //     // const nonce = 1
  //     // const signature = '0xXXXXX'
  //     const result = await client.getLink(quoteId)
  //     expect(result).to.be.an('array')
  //     // Add more assertions based on expected response
  //   })
  // })

  // describe('registerMicroservice', () => {
  //   it('should register a microservice successfully', async () => {
  //     const args: RegisterArgs = {
  //       type: 'filecoin',
  //       description: 'File storage on FileCoin',
  //       url: 'http://microservice.url',
  //       paymentMethods: [
  //         {
  //           chainId: '1',
  //           acceptedTokens: [
  //             {
  //               OCEAN: '0xOCEAN_on_MAINNET'
  //             },
  //             {
  //               DAI: '0xDAI_ON_MAINNET'
  //             }
  //           ]
  //         },
  //         {
  //           chainId: 'polygon_chain_id',
  //           acceptedTokens: [
  //             {
  //               OCEAN: '0xOCEAN_on_POLYGON'
  //             },
  //             {
  //               DAI: '0xDAI_ON_POLYGON'
  //             }
  //           ]
  //         }
  //       ]
  //     }
  // await client.registerMicroservice(args)
  // Add more assertions based on expected response
})
