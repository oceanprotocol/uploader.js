import { Signer } from 'ethers'
export declare const minErc20Abi: string[]
/**
 * @param {string} quoteId - The quote ID.
 * @param {Signer} signer The signer object.
 * @param {number} nonce - A timestamp (must be higher than the previously stored nonce for the user).
 * @returns {Promise<string>} - A promise that resolves to the signed hash.
 */
export declare const getSignedHash: (
  signer: Signer,
  quoteId: string,
  nonce: number
) => Promise<string>
