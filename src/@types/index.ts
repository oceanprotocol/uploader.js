interface AcceptedToken {
  title: string
  value: string
}
export interface Payment {
  chainId: string
  acceptedTokens?: AcceptedToken[]
}
export interface StorageInfo {
  type: string
  description: string
  payment: Payment[]
}

export interface AcceptedPayment {
  chainId: string
  tokenAddress: string
}

export interface FileData {
  length: number
}

export interface GetQuoteArgs {
  type: string
  duration: number
  payment: AcceptedPayment
  userAddress: string
  filePath?: string[]
  fileInfo?: FileData[]
}

export interface UploaderGetQuoteArgs {
  type: string
  files: FileData[]
  duration: number
  payment: AcceptedPayment
  userAddress: string
}

export interface GetQuoteResult {
  tokenAmount: number
  approveAddress: string
  chainId: number
  tokenAddress: string
  quoteId: string
}

export interface GetStatusResult {
  status: number
}

export interface GetLinkResult {
  type: string
  CID?: string
  dealIDs?: string[]
  transactionHash?: string
}

export interface RegisterArgs {
  type: string
  description: string
  url: string
  paymentMethods: Payment[]
}
