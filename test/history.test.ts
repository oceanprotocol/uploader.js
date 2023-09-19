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
    it('should return paginated history for the signer', async () => {
      let result
      const page = 1
      const pageSize = 5

      try {
        result = await client.getHistory(page, pageSize, 'arweave')
        console.log('Result', result)

        expect(result.data).to.be.an('array')
        expect(result.data.length).to.lessThanOrEqual(pageSize)
      } catch (error) {
        console.log('error', error)
      }
    })

    it('should return paginated history for the signer', async () => {
      let result
      const page = 2
      const pageSize = 5

      try {
        result = await client.getHistory(page, pageSize, 'arweave')
        console.log('Result', result)

        expect(result.data).to.be.an('array')
        expect(result.data.length).to.lessThanOrEqual(pageSize)
      } catch (error) {
        console.log('error', error)
      }
    })

    it('should return paginated history for the signer', async () => {
      let result
      const page = 1
      const pageSize = 10

      try {
        result = await client.getHistory(page, pageSize, 'filecoin')
        console.log('Result', result)

        expect(result.data).to.be.an('array')
        expect(result.data.length).to.lessThanOrEqual(pageSize)
      } catch (error) {
        console.log('error', error)
      }
    })

    it('should return paginated history for the signer', async () => {
      let result
      const page = 20
      const pageSize = 12

      try {
        result = await client.getHistory(page, pageSize, 'filecoin')
        console.log('Result', result)

        expect(result.data).to.be.an('array')
        expect(result.data.length).to.lessThanOrEqual(pageSize)
      } catch (error) {
        console.log('error', error)
      }
    })
  })
})
