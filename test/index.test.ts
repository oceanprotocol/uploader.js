import { expect } from 'chai'
import { DBSClient } from '../src/index'
import { GetQuoteArgs, RegisterArgs } from '../src/@types'

describe('DBSClient', () => {
  const baseURL = 'http://127.0.0.1:5001'
  const client = new DBSClient(baseURL)

  describe('getStorageInfo', () => {
    it('should return an array of storage info', async () => {
      const result = await client.getStorageInfo()
      expect(result).to.be.an('array')
      // Add more assertions based on expected response
    })
  })

  describe('getQuote', () => {
    it('should return a quote', async () => {
      const args: GetQuoteArgs = {
        type: 'filecoin',
        files: [{ length: 2343545 }, { length: 2343545 }],
        duration: 4353545453,
        payment: {
          payment_method: {
            chainId: 1
          },
          wallet_address: '0xOCEAN_on_MAINNET'
        },
        userAddress: '0x456'
      }
      const result = await client.getQuote(args)
      expect(result).to.be.an('object')
    })
  })

  describe('upload', () => {
    it('should upload files successfully', async () => {
      const quoteId = 'xxxx'
      const nonce = 1
      const signature = '0xXXXXX'
      const files = [
        // Add proper test files here
      ]
      await client.upload(quoteId, nonce, signature, files)
      // Add more assertions based on expected response
    })
  })

  describe('getStatus', () => {
    it('should return a status', async () => {
      const quoteId = 'xxxx'
      const result = await client.getStatus(quoteId)
      expect(result).to.be.an('object')
      // Add more assertions based on expected response
    })
  })

  describe('getLink', () => {
    it('should return a link', async () => {
      const quoteId = 'xxxx'
      const nonce = 1
      const signature = '0xXXXXX'
      const result = await client.getLink(quoteId, nonce, signature)
      expect(result).to.be.an('array')
      // Add more assertions based on expected response
    })
  })

  describe('registerMicroservice', () => {
    it('should register a microservice successfully', async () => {
      const args: RegisterArgs = {
        type: 'filecoin',
        description: 'File storage on FileCoin',
        url: 'http://microservice.url',
        paymentMethods: [
          {
            chainId: '1',
            acceptedTokens: [
              {
                OCEAN: '0xOCEAN_on_MAINNET'
              },
              {
                DAI: '0xDAI_ON_MAINNET'
              }
            ]
          },
          {
            chainId: 'polygon_chain_id',
            acceptedTokens: [
              {
                OCEAN: '0xOCEAN_on_POLYGON'
              },
              {
                DAI: '0xDAI_ON_POLYGON'
              }
            ]
          }
        ]
      }
      await client.registerMicroservice(args)
      // Add more assertions based on expected response
    })
  })
})
