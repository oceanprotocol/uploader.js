# Decentralised Backend Storage Javascript Library

This is a TypeScript library for interacting with the DBS API. It provides a simple interface to call various API endpoints for managing file storage, quotes, uploads, and more.

## Installation

Install the library using npm or yarn:

```bash
Copy code
npm install @oceanprotocol/dbs
```

or

```bash
yarn add @oceanprotocol/dbs
```

## Usage

```typescript

import DBSClient from 'dbs-client';
import { GetQuoteArgs } from 'dbs-client/types';

// Initialize the DBSClient with the API base URL
const client = new DBSClient('https://api.example.com');

(async () => {
// Fetch storage info
const storageInfo = await client.getStorageInfo();
console.log(storageInfo);

// Get a quote
const quoteArgs: GetQuoteArgs = {
// ...
};
const quote = await client.getQuote(quoteArgs);
console.log(quote);

// Upload files
const files: File[] = [
// ...
];
await client.upload(quote.quoteId, /_ nonce _/ 123, /_ signature _/ '0xABC...', files);

// Get the status of a job
const status = await client.getStatus(quote.quoteId);
console.log(status);

// Get the DDO files object for a job
const link = await client.getLink(quote.quoteId, /_ nonce _/ 123, /_ signature _/ '0xABC...');
console.log(link);
})();
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
