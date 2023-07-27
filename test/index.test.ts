import { ethers } from 'ethers'
import { assert, expect } from 'chai'
import dotenv from 'dotenv'
import fs, { readFileSync } from 'fs'

import { DBSClient } from '../src/index'
import { StorageInfo, GetQuoteArgs } from '../src/@types'

dotenv.config()

function readFileIntoBuffer(filePath: string): Buffer {
  return fs.readFileSync(filePath)
}

describe('DBSClient', () => {
  let info: StorageInfo[]
  // Set up a new instance of the DBS client
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY) // Use your actual private key
  const client = new DBSClient(process.env.DBS_API_URL, signer) // Use your actual DBS API url

  describe('getStorageInfo', () => {
    it('should return an array of storage info', async () => {
      info = await client.getStorageInfo()

      expect(info).to.be.an('array')
      expect(info[0].payment).to.be.an('array')
      expect(info[0].payment).to.be.an('array')
      assert(info[0].type === 'filecoin')
      assert(info[0].description === 'File storage on FileCoin')
      assert(info[1].type === 'arweave')
      assert(info[1].description === 'File storage on Arweave')
    })
  })

  describe('getQuote', () => {
    it('should return a quote for uploading a file to Filecoin when using file paths', async () => {
      const args: GetQuoteArgs = {
        type: info[0].type,
        duration: 4353545453,
        payment: {
          chainId: info[0].payment[0].chainId,
          tokenAddress: info[0].payment[0].acceptedTokens[0].value
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
        type: info[0].type,
        duration: 4353545453,
        payment: {
          chainId: info[0].payment[0].chainId,
          tokenAddress: info[0].payment[0].acceptedTokens[0].value
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
        type: info[1].type,
        duration: 4353545453,
        payment: {
          chainId: info[1].payment[0].chainId,
          tokenAddress: info[1].payment[0].acceptedTokens[0].value
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
        type: info[1].type,
        duration: 4353545453,
        payment: {
          chainId: info[1].payment[0].chainId,
          tokenAddress: info[1].payment[0].acceptedTokens[0].value
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
  describe('upload', () => {
    it('should upload files successfully', async () => {
      const address = signer.getAddress()
      console.log(address)

      const args: GetQuoteArgs = {
        type: info[0].type,
        duration: 4353545453,
        payment: {
          chainId: info[0].payment[0].chainId,
          tokenAddress: info[0].payment[0].acceptedTokens[0].value
        },
        userAddress: process.env.USER_ADDRESS,
        filePath: undefined,
        fileInfo: [{ length: 1000 }, { length: 9999 }]
      }
      const result = await client.getQuote(args)
      await client.upload(result.quoteId, [
        process.env.TEST_FILE_1,
        process.env.TEST_FILE_2
      ])
      // Add more assertions based on expected response
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
