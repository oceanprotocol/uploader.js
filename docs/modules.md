[@oceanprotocol/uploader](README.md) / Exports

# @oceanprotocol/uploader

## Table of contents

### Classes

- [UploaderClient](classes/UploaderClient.md)

### Interfaces

- [AcceptedPayment](interfaces/AcceptedPayment.md)
- [FileData](interfaces/FileData.md)
- [GetLinkResult](interfaces/GetLinkResult.md)
- [GetQuoteArgs](interfaces/GetQuoteArgs.md)
- [GetQuoteResult](interfaces/GetQuoteResult.md)
- [GetStatusResult](interfaces/GetStatusResult.md)
- [Payment](interfaces/Payment.md)
- [RegisterArgs](interfaces/RegisterArgs.md)
- [StorageInfo](interfaces/StorageInfo.md)
- [UploaderGetQuoteArgs](interfaces/UploaderGetQuoteArgs.md)

### Variables

- [minErc20Abi](modules.md#minerc20abi)

### Functions

- [getSignedHash](modules.md#getsignedhash)

## Variables

### minErc20Abi

• `Const` **minErc20Abi**: `string`[]

#### Defined in

[utils/index.ts:3](https://github.com/oceanprotocol/dbs.js/blob/94f6e7d/src/utils/index.ts#L3)

## Functions

### getSignedHash

▸ **getSignedHash**(`signer`, `quoteId`, `nonce`): `Promise`<`string`\>

#### Parameters

| Name      | Type     | Description                                                                 |
| :-------- | :------- | :-------------------------------------------------------------------------- |
| `signer`  | `Signer` | The signer object.                                                          |
| `quoteId` | `string` | The quote ID.                                                               |
| `nonce`   | `number` | A timestamp (must be higher than the previously stored nonce for the user). |

#### Returns

`Promise`<`string`\>

- A promise that resolves to the signed hash.

#### Defined in

[utils/index.ts:14](https://github.com/oceanprotocol/dbs.js/blob/94f6e7d/src/utils/index.ts#L14)
