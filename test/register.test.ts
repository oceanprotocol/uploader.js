import { ethers, JsonRpcProvider } from 'ethers'
import { assert } from 'chai'
import dotenv from 'dotenv'

import { UploaderClient } from '../src/index'
import { RegisterArgs } from '../src/@types'

dotenv.config()

describe('Register a new Microservice Tests', () => {
  // Set up a new instance of the Uploader client
  const provider = new JsonRpcProvider(process.env.RPC_URL, 80001)
  // Private key account needs to have both MATIC and Wrapped Matic for testing
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
  const client = new UploaderClient(
    process.env.UPLOADER_API_URL,
    process.env.UPLOADER_ACCOUNT,
    signer
  )

  describe('Testing the registerMicroservice endpoint', () => {
    const args: RegisterArgs = {
      type: 'TEST-' + String(Math.floor(Math.random() * 1000)),
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
})
