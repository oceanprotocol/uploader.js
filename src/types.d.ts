export interface File {
  length: number
}

export interface Payment {
  chainId: number | string
  acceptedTokens: Record<string, string>
}

export interface StorageInfo {
  type: string
  description: string
  payment: Payment[]
}

export interface GetQuoteArgs {
  type: string
  files: File[]
  duration: number
  payment: Payment
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
  CID: string
  dealIDs: string[]
}

export interface RegisterArgs {
  type: string
  description: string
  url: string
  payment: Payment[]
}
