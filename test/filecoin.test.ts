import { ethers, JsonRpcProvider } from 'ethers'
import { assert, expect } from 'chai'
import dotenv from 'dotenv'

import { DBSClient } from '../src/index'
import { StorageInfo, GetQuoteArgs } from '../src/@types'

dotenv.config()

describe('Filecoin Tests', () => {
  let info: StorageInfo[]
  // Set up a new instance of the DBS client
  const provider = new JsonRpcProvider(process.env.RPC_URL, 80001)
  // Private key account needs to have both MATIC and Wrapped Matic for testing
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
  const client = new DBSClient(process.env.DBS_API_URL, process.env.DBS_ACCOUNT, signer)

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
  })
  //   describe('Testing the upload, status and getLink endpoints', async function () {
  //     this.timeout(2000000)
  //     let arweaveQuote1: any
  //     let arweaveQuote2: any

  //     it('should upload files successfully to filecoin', async () => {
  //       const tokenAddress = '0x742DfA5Aa70a8212857966D491D67B09Ce7D6ec7'
  //       const args: GetQuoteArgs = {
  //         type: 'filecoin',
  //         duration: 4353545453,
  //         payment: {
  //           chainId: '80001',
  //           tokenAddress
  //         },
  //         userAddress: process.env.USER_ADDRESS,
  //         filePath: [process.env.TEST_FILE_1, process.env.TEST_FILE_2]
  //       }
  //       const result = await client.getQuote(args)

  //       const resultFromUpload = await client.upload(result.quoteId, tokenAddress, [
  //         process.env.TEST_FILE_1,
  //         process.env.TEST_FILE_2
  //       ])
  //       console.log('resultFromUpload', resultFromUpload.data)
  //       // Add more assertions based on expected response
  //     })
  //   })
})
