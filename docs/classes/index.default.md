[dbs](../README.md) / [Modules](../modules.md) / [index](../modules/index.md) / default

# Class: default

[index](../modules/index.md).default

DBSClient is a TypeScript library for interacting with the DBS API.

## Table of contents

### Constructors

- [constructor](index.default.md#constructor)

### Properties

- [baseURL](index.default.md#baseurl)

### Methods

- [getLink](index.default.md#getlink)
- [getQuote](index.default.md#getquote)
- [getStatus](index.default.md#getstatus)
- [getStorageInfo](index.default.md#getstorageinfo)
- [registerMicroservice](index.default.md#registermicroservice)
- [upload](index.default.md#upload)

## Constructors

### constructor

• **new default**(`baseURL`)

Creates an instance of the DBSClient.

#### Parameters

| Name      | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `baseURL` | `string` | The base URL of the DBS API. |

#### Defined in

[index.ts:22](https://github.com/oceanprotocol/dbs.js/blob/5c4c168/src/index.ts#L22)

## Properties

### baseURL

• `Private` **baseURL**: `string`

#### Defined in

[index.ts:15](https://github.com/oceanprotocol/dbs.js/blob/5c4c168/src/index.ts#L15)

## Methods

### getLink

▸ **getLink**(`quoteId`, `nonce`, `signature`): `Promise`<[`GetLinkResult`](../interfaces/types.GetLinkResult.md)[]\>

Fetches the DDO files object for a job.

#### Parameters

| Name        | Type     | Description                                                                 |
| :---------- | :------- | :-------------------------------------------------------------------------- |
| `quoteId`   | `string` | The quote ID.                                                               |
| `nonce`     | `number` | A timestamp (must be higher than the previously stored nonce for the user). |
| `signature` | `string` | A user-signed hash of SHA256(quoteId + nonce).                              |

#### Returns

`Promise`<[`GetLinkResult`](../interfaces/types.GetLinkResult.md)[]\>

- A promise that resolves to an array of link results.

#### Defined in

[index.ts:95](https://github.com/oceanprotocol/dbs.js/blob/5c4c168/src/index.ts#L95)

---

### getQuote

▸ **getQuote**(`args`): `Promise`<[`GetQuoteResult`](../interfaces/types.GetQuoteResult.md)\>

Fetches a quote for storing files on a specific storage.

#### Parameters

| Name   | Type                                                  | Description                               |
| :----- | :---------------------------------------------------- | :---------------------------------------- |
| `args` | [`GetQuoteArgs`](../interfaces/types.GetQuoteArgs.md) | The arguments needed for getting a quote. |

#### Returns

`Promise`<[`GetQuoteResult`](../interfaces/types.GetQuoteResult.md)\>

- A promise that resolves to the quote result.

#### Defined in

[index.ts:42](https://github.com/oceanprotocol/dbs.js/blob/5c4c168/src/index.ts#L42)

---

### getStatus

▸ **getStatus**(`quoteId`): `Promise`<[`GetStatusResult`](../interfaces/types.GetStatusResult.md)\>

Fetches the status of a job.

#### Parameters

| Name      | Type     | Description   |
| :-------- | :------- | :------------ |
| `quoteId` | `string` | The quote ID. |

#### Returns

`Promise`<[`GetStatusResult`](../interfaces/types.GetStatusResult.md)\>

- A promise that resolves to the status result.

#### Defined in

[index.ts:79](https://github.com/oceanprotocol/dbs.js/blob/5c4c168/src/index.ts#L79)

---

### getStorageInfo

▸ **getStorageInfo**(): `Promise`<[`StorageInfo`](../interfaces/types.StorageInfo.md)[]\>

Fetches information about supported storage types and payments.

#### Returns

`Promise`<[`StorageInfo`](../interfaces/types.StorageInfo.md)[]\>

- A promise that resolves to an array of storage information.

#### Defined in

[index.ts:31](https://github.com/oceanprotocol/dbs.js/blob/5c4c168/src/index.ts#L31)

---

### registerMicroservice

▸ **registerMicroservice**(`args`): `Promise`<`void`\>

Registers a new microservice that handles a storage type.

#### Parameters

| Name   | Type                                                  | Description                                          |
| :----- | :---------------------------------------------------- | :--------------------------------------------------- |
| `args` | [`RegisterArgs`](../interfaces/types.RegisterArgs.md) | The arguments needed for registering a microservice. |

#### Returns

`Promise`<`void`\>

#### Defined in

[index.ts:112](https://github.com/oceanprotocol/dbs.js/blob/5c4c168/src/index.ts#L112)

---

### upload

▸ **upload**(`quoteId`, `nonce`, `signature`, `files`): `Promise`<`void`\>

Uploads files according to the quote request.

#### Parameters

| Name        | Type     | Description                                                                 |
| :---------- | :------- | :-------------------------------------------------------------------------- |
| `quoteId`   | `string` | The quote ID.                                                               |
| `nonce`     | `number` | A timestamp (must be higher than the previously stored nonce for the user). |
| `signature` | `string` | A user-signed hash of SHA256(quoteId + nonce).                              |
| `files`     | `File`[] | An array of files to upload.                                                |

#### Returns

`Promise`<`void`\>

#### Defined in

[index.ts:56](https://github.com/oceanprotocol/dbs.js/blob/5c4c168/src/index.ts#L56)
