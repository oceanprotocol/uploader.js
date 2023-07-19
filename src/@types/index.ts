interface AcceptedToken {
  [tokenSymbol: string]: string
}
export interface PaymentMethod {
  chainId: number | string
  acceptedTokens?: AcceptedToken[]
}
export interface Payment {
  payment_method: PaymentMethod
  wallet_address: string
}

export interface StorageInfo {
  type: string
  description: string
  payment: Payment[]
}

export interface GetQuoteArgs {
  type: string
  files: any
  duration: number
  payment: {
    chainId: number
    tokenAddress: string
  }
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
  paymentMethods: PaymentMethod[]
}
