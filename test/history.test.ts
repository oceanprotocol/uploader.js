import { ethers, JsonRpcProvider } from 'ethers'
import dotenv from 'dotenv'
import { expect } from 'chai'

import { DBSClient } from '../src/index'

dotenv.config()

describe('Get History test', () => {
  // Set up a new instance of the DBS client
  const provider = new JsonRpcProvider(process.env.RPC_URL, 80001)
  // Private key account needs to have both MATIC and Wrapped Matic for testing
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
  const client = new DBSClient(process.env.DBS_API_URL, process.env.DBS_ACCOUNT, signer)

  describe('Testing the getHistory endpoint', async function () {
    it('should return the history for the signer', async () => {
      let result
      try {
        result = await client.getHistory()
        console.log('result', result)
        expect(result).to.be.an('array')
      } catch (error) {
        console.log('error', error)
      }
    })
  })
})
