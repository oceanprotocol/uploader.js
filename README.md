# Decentralised Backend Storage Javascript Library

This is a TypeScript library for interacting with the DBS API. It provides a simple interface to call the API endpoints in Ocean Decentralised backend storage for managing file storage uploads, quotes, and more.

## Installation

Install the library using npm or yarn:

```bash
npm install @oceanprotocol/dbs
```

or

```bash
yarn add @oceanprotocol/dbs
```

## Develop and test this project

To get started and run the project, follow these steps:

1. **Clone the Repository**: Clone the project repository to your local machine using the following command:
   ```bash
   git clone https://github.com/oceanprotocol/dbs.js.git
   ```
2. **Install Dependencies**: Navigate to the project directory and install the necessary dependencies using npm:
   ```bash
   cd dbs.js
   npm install
   ```
3. **Set Environment Variables**: Configure the required environment variables by creating a `.env` file in the root directory. Refer to the `.example.env` file provided in the project for details on the required variables.
4. **Run Tests**
   ```bash
   npm test
   ```

## Node.js Usage Example

```typescript
import { ethers } from 'ethers'
import {
  DBSClient,
  GetQuoteArgs,
  File,
  RegisterArgs,
  Payment,
  StorageInfo,
  GetQuoteResult,
  GetStatusResult,
  GetLinkResult
} from '@oceanprotocol/dbs'
import dotenv from 'dotenv'

dotenv.config()

// Set up a new instance of the DBS client
const signer = new ethers.Wallet(process.env.PRIVATE_KEY) // Use your actual private key
const client = new DBSClient(process.env.DBS_API_URL, process.env.DBS_ACCOUNT, signer)

async function runExample() {
  // Get storage info
  const info: StorageInfo[] = await client.getStorageInfo()
  console.log('Storage info:', info)

  // Fetch a quote using the local file path
  const args1: GetQuoteArgs = {
    type: info[0].type,
    duration: 4353545453,
    payment: {
      chainId: info[0].payment[0].chainId,
      tokenAddress: info[0].payment[0].acceptedTokens[0].value
    },
    userAddress: process.env.USER_ADDRESS,
    filePath: ['/home/username/ocean/test1.txt', '/home/username/ocean/test2.txt']
  }
  const quote1 = await client.getQuote(args1)

  console.log('Quote 1:' quote1)

  // Fetch a quote using the file length
  const args2: GetQuoteArgs = {
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
  const quote2 = await client.getQuote(args2)
  console.log('Quote 2: ', quote2)

  // Upload files
  await client.upload(quoteResult.quoteId, quoteArgs.files)
  console.log('Files uploaded successfully.')

  // Get and upload quote
  const quoteAndUploadResult: GetQuoteResult = await client.getQuoteAndUpload(quoteArgs)
  console.log('Quote and upload result:', quoteAndUploadResult)

  // Fetch the status of a job
  const statusResult: GetStatusResult = await client.getStatus(quoteResult.quoteId)
  console.log('Status result:', statusResult)

  // Fetch the DDO files object for a job
  const linkResult: GetLinkResult[] = await client.getLink(quoteResult.quoteId)
  console.log('Link result:', linkResult)

  // Register a new microservice
  const registerArgs: RegisterArgs = {
    type: 'exampleType', // Replace with an actual type
    description: 'Example microservice', // Replace with an actual description
    url: 'http://example.com', // Replace with an actual url
    paymentMethods: [{ chainId: 1, acceptedTokens: {} }]
  }

  await client.registerMicroservice(registerArgs)
  console.log('Microservice registered successfully.')
}

runExample().catch(console.error)
```

## Browser Usage

Ensure that the Signer object (signer in this case) you're passing to the function when you call it from the browser is properly initialized and is compatible with the browser. For instance, if you're using something like MetaMask as your Ethereum provider in the browser, you'd typically use the ethers.Web3Provider to generate a signer.

1. Setting up a Signer: with MetaMask or similar browser wallets, you can set up an ethers signer as follows:

```javascript
const provider = new Web3Provider(window.ethereum)
const signer = provider.getSigner()
```

2. Initialize DBSClient:
1. HTML Setup: Provide a file input for users to select multiple files.

```html
<input type="file" multiple id="fileInput" />
```

2. JavaScript: Get the files from the input and call the upload function.

```javascript
document.getElementById('fileInput').addEventListener('change', async function () {
  const files = this.files
  await uploadBrowser(quoteId, tokenAddress, files)
})
```

## API

The library provides the following methods:

`constructor(baseURL: string)`
Create a new instance of the DBSClient.

`getStorageInfo(): Promise<StorageInfo[]>`
Fetch information about supported storage types and payments.

`getQuote(args: GetQuoteArgs): Promise<GetQuoteResult>`
Fetch a quote for storing files on a specific storage.

`upload(quoteId: string, nonce: number, signature: string, files: File[]): Promise<void>`
Upload files according to the quote request.

`getStatus(quoteId: string): Promise<GetStatusResult>`
Fetch the status of a job.

`getLink(quoteId: string, nonce: number, signature: string): Promise<GetLinkResult[]>`
Fetch the DDO files object for a job.

`registerMicroservice(args: RegisterArgs): Promise<void>`
Register a new microservice that handles a storage type.

## Contributing

If you'd like to contribute to this library, please submit pull requests with new features or bug fixes. Make sure to follow the TypeScript and project guidelines.

## License

This library is licensed under the Apache 2 license.
