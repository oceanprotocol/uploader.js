/// <reference types="node" />
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
export interface GetQuoteArgs {
  type: string
  files: Buffer[]
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
  CID: string
  dealIDs: string[]
}
export interface RegisterArgs {
  type: string
  description: string
  url: string
  paymentMethods: Payment[]
}
export {}
