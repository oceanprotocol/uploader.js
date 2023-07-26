import { ethers } from 'ethers'
import { assert, expect } from 'chai'
import dotenv from 'dotenv'
import fs, { readFileSync } from 'fs'
import FormData from 'form-data'

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
      console.log(info[0].payment[0])
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
    it('should return a quote', async () => {
      const result = await client.getQuote(
        info[0].type,
        ['/home/jamie/Desktop/ocean/dbs.js/test/test.txt'],
        4353545453,
        {
          chainId: info[0].payment[0].chainId,
          tokenAddress: info[0].payment[0].acceptedTokens[0].value
        },
        process.env.USER_ADDRESS
      )
      console.log(result)
      expect(result).to.be.an('object')
    })
  })

  // describe('upload', () => {
  //   it('should upload files successfully', async () => {
  //     const quoteId = 'xxxx'
  //     // const nonce = 1
  //     // const signature = '0xXXXXX'
  //     const files = [
  //       // Add proper test files here
  //     ]
  //     await client.upload(quoteId, files)
  //     // Add more assertions based on expected response
  //   })
  // })

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
