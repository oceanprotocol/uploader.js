import { ethers, Signer, sha256, toUtf8Bytes } from 'ethers'

/**
 * @param {string} quoteId - The quote ID.
 * @param {Signer} signer The signer object.
 * @param {number} nonce - A timestamp (must be higher than the previously stored nonce for the user).
 * @returns {Promise<string>} - A promise that resolves to the signed hash.
 */
export const getSignedHash = async (signer: Signer, quoteId: string, nonce: number) => {
  // Create a hash
  const hash = sha256(toUtf8Bytes(quoteId + nonce.toString()))

  // Sign the hash
  const signedHash = await signer.signMessage(ethers.getBytes(hash))

  return signedHash
}
