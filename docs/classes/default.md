[dbs](../README.md) / [Exports](../modules.md) / default

# Class: default

## Table of contents

### Constructors

- [constructor](default.md#constructor)

### Properties

- [baseURL](default.md#baseurl)

### Methods

- [getLink](default.md#getlink)
- [getQuote](default.md#getquote)
- [getStatus](default.md#getstatus)
- [getStorageInfo](default.md#getstorageinfo)
- [registerMicroservice](default.md#registermicroservice)
- [upload](default.md#upload)

## Constructors

### constructor

• **new default**(`baseURL`)

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `baseURL` | `string` |

#### Defined in

[index.ts:14](https://github.com/oceanprotocol/dbs.js/blob/daddc58/src/index.ts#L14)

## Properties

### baseURL

• `Private` **baseURL**: `string`

#### Defined in

[index.ts:12](https://github.com/oceanprotocol/dbs.js/blob/daddc58/src/index.ts#L12)

## Methods

### getLink

▸ **getLink**(`quoteId`, `nonce`, `signature`): `Promise`<`GetLinkResult`[]\>

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `quoteId`   | `string` |
| `nonce`     | `number` |
| `signature` | `string` |

#### Returns

`Promise`<`GetLinkResult`[]\>

#### Defined in

[index.ts:52](https://github.com/oceanprotocol/dbs.js/blob/daddc58/src/index.ts#L52)

---

### getQuote

▸ **getQuote**(`args`): `Promise`<`GetQuoteResult`\>

#### Parameters

| Name   | Type           |
| :----- | :------------- |
| `args` | `GetQuoteArgs` |

#### Returns

`Promise`<`GetQuoteResult`\>

#### Defined in

[index.ts:23](https://github.com/oceanprotocol/dbs.js/blob/daddc58/src/index.ts#L23)

---

### getStatus

▸ **getStatus**(`quoteId`): `Promise`<`GetStatusResult`\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `quoteId` | `string` |

#### Returns

`Promise`<`GetStatusResult`\>

#### Defined in

[index.ts:45](https://github.com/oceanprotocol/dbs.js/blob/daddc58/src/index.ts#L45)

---

### getStorageInfo

▸ **getStorageInfo**(): `Promise`<`StorageInfo`[]\>

#### Returns

`Promise`<`StorageInfo`[]\>

#### Defined in

[index.ts:18](https://github.com/oceanprotocol/dbs.js/blob/daddc58/src/index.ts#L18)

---

### registerMicroservice

▸ **registerMicroservice**(`args`): `Promise`<`void`\>

#### Parameters

| Name   | Type           |
| :----- | :------------- |
| `args` | `RegisterArgs` |

#### Returns

`Promise`<`void`\>

#### Defined in

[index.ts:63](https://github.com/oceanprotocol/dbs.js/blob/daddc58/src/index.ts#L63)

---

### upload

▸ **upload**(`quoteId`, `nonce`, `signature`, `files`): `Promise`<`void`\>

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `quoteId`   | `string` |
| `nonce`     | `number` |
| `signature` | `string` |
| `files`     | `File`[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[index.ts:28](https://github.com/oceanprotocol/dbs.js/blob/daddc58/src/index.ts#L28)
