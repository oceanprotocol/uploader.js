import { ethers, Signer, sha256, toUtf8Bytes } from 'ethers'

export const minErc20Abi = [
  'function approve(address, uint256) external returns (bool)',
  'function balanceOf(address owner) external view returns (uint256)'
]

/**
 * @param {string} quoteId - The quote ID.
 * @param {Signer} signer The signer object.
 * @param {number} nonce - A timestamp (must be higher than the previously stored nonce for the user).
 * @returns {Promise<string>} - A promise that resolves to the signed hash.
 */
export const getSignedHash = async (signer: Signer, quoteId: string, nonce: number) => {
  // Concatenate the message
  const message = sha256(toUtf8Bytes(quoteId + nonce.toString()))
  // const message = quoteId + nonce.toString()

  // Sign the original message directly
  const signature = await signer.signMessage(message)

  return signature
}
