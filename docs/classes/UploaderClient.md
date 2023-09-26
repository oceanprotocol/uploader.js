[@oceanprotocol/uploader](../README.md) / [Exports](../modules.md) / UploaderClient

# Class: UploaderClient

Client is a TypeScript library for interacting with the Uploader API.

## Table of contents

### Constructors

- [constructor](UploaderClient.md#constructor)

### Properties

- [baseURL](UploaderClient.md#baseurl)
- [signer](UploaderClient.md#signer)
- [uploaderAddress](UploaderClient.md#uploaderaddress)

### Methods

- [getFileSizes](UploaderClient.md#getfilesizes)
- [getHistory](UploaderClient.md#gethistory)
- [getLink](UploaderClient.md#getlink)
- [getQuote](UploaderClient.md#getquote)
- [getStatus](UploaderClient.md#getstatus)
- [getStorageInfo](UploaderClient.md#getstorageinfo)
- [registerMicroservice](UploaderClient.md#registermicroservice)
- [upload](UploaderClient.md#upload)
- [uploadBrowser](UploaderClient.md#uploadbrowser)
- [validateBaseURL](UploaderClient.md#validatebaseurl)

## Constructors

### constructor

• **new UploaderClient**(`baseURL`, `address`, `signer?`)

Creates an instance of the Client.

#### Parameters

| Name      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `baseURL` | `string` | The base URL of the Uploader API. |
| `address` | `string` | -                                 |
| `signer?` | `Signer` | The signer object.                |

#### Defined in

[UploaderClient.ts:31](https://github.com/oceanprotocol/dbs.js/blob/94f6e7d/src/UploaderClient.ts#L31)

## Properties

### baseURL

• `Private` **baseURL**: `string`

#### Defined in

[UploaderClient.ts:22](https://github.com/oceanprotocol/dbs.js/blob/94f6e7d/src/UploaderClient.ts#L22)

---

### signer

• `Private` **signer**: `Signer`

#### Defined in

[UploaderClient.ts:23](https://github.com/oceanprotocol/dbs.js/blob/94f6e7d/src/UploaderClient.ts#L23)

---

### uploaderAddress

• `Private` **uploaderAddress**: `string`

#### Defined in

[UploaderClient.ts:24](https://github.com/oceanprotocol/dbs.js/blob/94f6e7d/src/UploaderClient.ts#L24)

## Methods

### getFileSizes

▸ `Private` **getFileSizes**(`files`): [`FileData`](../interfaces/FileData.md)[]

#### Parameters

| Name    | Type       |
| :------ | :--------- |
| `files` | `string`[] |

#### Returns

[`FileData`](../interfaces/FileData.md)[]

#### Defined in

[UploaderClient.ts:50](https://github.com/oceanprotocol/dbs.js/blob/94f6e7d/src/UploaderClient.ts#L50)

---

### getHistory

▸ **getHistory**(`page?`, `pageSize?`, `storageType`): `Promise`<`any`\>

Retrieves the quote history for the given user address, nonce, and signature.

#### Parameters

| Name          | Type     | Default value |
| :------------ | :------- | :------------ |
| `page`        | `number` | `1`           |
| `pageSize`    | `number` | `25`          |
| `storageType` | `string` | `undefined`   |

#### Returns

`Promise`<`any`\>

A promise that resolves to the quote history data.

#### Defined in

[UploaderClient.ts:241](https://github.com/oceanprotocol/dbs.js/blob/94f6e7d/src/UploaderClient.ts#L241)

---

### getLink

▸ **getLink**(`quoteId`): `Promise`<[`GetLinkResult`](../interfaces/GetLinkResult.md)[]\>

Fetches the DDO files object for a job.

#### Parameters

| Name      | Type     | Description   |
| :-------- | :------- | :------------ |
| `quoteId` | `string` | The quote ID. |

#### Returns

`Promise`<[`GetLinkResult`](../interfaces/GetLinkResult.md)[]\>

- A promise that resolves to an array of link results.

#### Defined in

[UploaderClient.ts:216](https://github.com/oceanprotocol/dbs.js/blob/94f6e7d/src/UploaderClient.ts#L216)

---

### getQuote

▸ **getQuote**(`args`): `Promise`<[`GetQuoteResult`](../interfaces/GetQuoteResult.md)\>

Fetches a quote for storing files on a specific storage.

#### Parameters

| Name   | Type                                            | Description                               |
| :----- | :---------------------------------------------- | :---------------------------------------- |
| `args` | [`GetQuoteArgs`](../interfaces/GetQuoteArgs.md) | The arguments needed for getting a quote. |

#### Returns

`Promise`<[`GetQuoteResult`](../interfaces/GetQuoteResult.md)\>

- A promise that resolves to the quote result.

#### Defined in

[UploaderClient.ts:75](https://github.com/oceanprotocol/dbs.js/blob/94f6e7d/src/UploaderClient.ts#L75)

---

### getStatus

▸ **getStatus**(`quoteId`): `Promise`<[`GetStatusResult`](../interfaces/GetStatusResult.md)\>

Fetches the status of a job.

#### Parameters

| Name      | Type     | Description   |
| :-------- | :------- | :------------ |
| `quoteId` | `string` | The quote ID. |

#### Returns

`Promise`<[`GetStatusResult`](../interfaces/GetStatusResult.md)\>

- A promise that resolves to the status result.

#### Defined in

[UploaderClient.ts:200](https://github.com/oceanprotocol/dbs.js/blob/94f6e7d/src/UploaderClient.ts#L200)

---

### getStorageInfo

▸ **getStorageInfo**(): `Promise`<[`StorageInfo`](../interfaces/StorageInfo.md)[]\>

Fetches information about supported storage types and payments.

#### Returns

`Promise`<[`StorageInfo`](../interfaces/StorageInfo.md)[]\>

- A promise that resolves to an array of storage information.

#### Defined in

[UploaderClient.ts:64](https://github.com/oceanprotocol/dbs.js/blob/94f6e7d/src/UploaderClient.ts#L64)

---

### registerMicroservice

▸ **registerMicroservice**(`args`): `Promise`<`AxiosResponse`<`any`, `any`\>\>

Registers a new microservice that handles a storage type.

#### Parameters

| Name   | Type                                            | Description                                          |
| :----- | :---------------------------------------------- | :--------------------------------------------------- |
| `args` | [`RegisterArgs`](../interfaces/RegisterArgs.md) | The arguments needed for registering a microservice. |

#### Returns

`Promise`<`AxiosResponse`<`any`, `any`\>\>

#### Defined in

[UploaderClient.ts:231](https://github.com/oceanprotocol/dbs.js/blob/94f6e7d/src/UploaderClient.ts#L231)

---

### upload

▸ **upload**(`quoteId`, `tokenAddress`, `quoteFee`, `filePaths`, `type`): `Promise`<`any`\>

Uploads files according to the quote request.

#### Parameters

| Name           | Type       | Description   |
| :------------- | :--------- | :------------ |
| `quoteId`      | `string`   | The quote ID. |
| `tokenAddress` | `string`   | -             |
| `quoteFee`     | `number`   | -             |
| `filePaths`    | `string`[] | -             |
| `type`         | `string`   | -             |

#### Returns

`Promise`<`any`\>

#### Defined in

[UploaderClient.ts:101](https://github.com/oceanprotocol/dbs.js/blob/94f6e7d/src/UploaderClient.ts#L101)

---

### uploadBrowser

▸ **uploadBrowser**(`quoteId`, `tokenAddress`, `quoteFee`, `files`, `type`): `Promise`<`any`\>

#### Parameters

| Name           | Type       |
| :------------- | :--------- |
| `quoteId`      | `string`   |
| `tokenAddress` | `string`   |
| `quoteFee`     | `number`   |
| `files`        | `FileList` |
| `type`         | `string`   |

#### Returns

`Promise`<`any`\>

#### Defined in

[UploaderClient.ts:145](https://github.com/oceanprotocol/dbs.js/blob/94f6e7d/src/UploaderClient.ts#L145)

---

### validateBaseURL

▸ `Private` **validateBaseURL**(`baseURL`): `void`

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `baseURL` | `string` |

#### Returns

`void`

#### Defined in

[UploaderClient.ts:38](https://github.com/oceanprotocol/dbs.js/blob/94f6e7d/src/UploaderClient.ts#L38)
