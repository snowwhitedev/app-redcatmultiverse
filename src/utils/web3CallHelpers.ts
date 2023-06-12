import { JsonRpcProvider, StaticJsonRpcProvider } from '@ethersproject/providers'
import { BigNumber, Contract, ethers, utils } from 'ethers'

import { getBalanceNumber } from './bigNumberHelper'

export const getGasPrice = async (provider: StaticJsonRpcProvider) => {
  const gasPrice = await provider.getGasPrice()
  return ethers.utils.formatUnits(gasPrice, 'gwei')
}

export const getEthBalanace = async (provider: JsonRpcProvider, account: string) => {
  const balance = await provider.getBalance(account)
  return getBalanceNumber(balance)
}

export const getNFTBalance = async (contract: Contract, account: string) => {
  const balance = await contract.balanceOf(account)
  return balance.toString()
}

export const getTotalSupply = async (contract: Contract) => {
  const totalSupply = await contract.totalSupply()
  return totalSupply
}

export const getWalletOfOwner = async (contract: Contract, account: string) => {
  const res = await contract.walletOfOwner(account)
  const walletOfOwner = res.map((item: BigNumber) => {
    return item.toNumber()
  })

  return walletOfOwner as number[]
}

export const checkIsApprovedForAll = async (account: string, contract: Contract, operator: string) => {
  return await contract.isApprovedForAll(account, operator)
}

export const setApprovalForAll = async (contract: Contract, operator: string, approved = true) => {
  const txHash = await contract.setApprovalForAll(operator, approved)
  const receipt = await txHash.wait()
  return receipt.status
}

export const whiteListMint = async (rcmPunksContract: Contract, amount: number, deadline: number, sig: string) => {
  const txHash = await rcmPunksContract.whiteListMint(amount, deadline, sig, {
    value: BigNumber.from(amount).mul(BigNumber.from(10).pow(15)),
  })
  const receipt = await txHash.wait()

  return { status: receipt.status, txHash: receipt.transactionHash }
}

export const getWhiteListMintPrice = async (rcmPunksContract: Contract) => {
  return await rcmPunksContract.whiteListPrice()
}

/** Total supply */
export const getInceptionTotalSupply = async (inceptionContract: Contract) => {
  try {
    return await inceptionContract.totalSupply();
  } catch (error) {
    console.error('Error in getting total supply =>', error);
    return 0
  }
}

/** Reserved private NFTs */
export const getReservedPrivateNfts = async (inceptionContract: Contract) => {
  try {
    return await inceptionContract.reservedPrivateNfts();
  } catch (error) {
    console.error('Error in getting total supply =>', error);
    return 0;
  }
}

/** Public Mint functions */
export const getPublicMintPrice = async (inceptionContract: Contract) => {
  return await inceptionContract.publicPrice()
}

export const publicMint = async (inceptionContract: Contract, amount: number, price: BigNumber) => {
  const cost = BigNumber.from(amount).mul(price);
  const txHash = await inceptionContract.publicMint(amount, { value: cost });

  const receipt = await txHash.wait();

  return { status: receipt.status, txHash: receipt.txHash };
}

/** MINT AUCTION functions */
export const getInceptionMintAuctionPrice = async (inceptionContract: Contract) => {
  return await inceptionContract.auctionPrice();
}

export const auctionMint = async (inceptionContract: Contract, amount: number, price: BigNumber) => {
  const cost = BigNumber.from(amount).mul(price);

  const txHash = await inceptionContract.auctionMint(amount, { value: cost });

  const receipt = await txHash.wait();

  return { status: receipt.status, txHash: receipt.txHash };
}

/** Insider mint functions */
export const getInsiderPrice = async (inceptionContract: Contract) => {
  return await inceptionContract.insiderPrice();
}

export const insiderMint = async (inceptionContract: Contract, price: BigNumber, index: number, signature: string) => {
  const txHash = await inceptionContract.insiderMint(index, signature, { value: price });
  const receipt = await txHash.wait();

  return { status: receipt.status, txHash: receipt.txHash };
}

/** Fellow mint functions */
export const getFellowPrice = async (inceptionContract: Contract) => {
  return await inceptionContract.fellowPrice();
}

export const fellowMint = async (inceptionContract: Contract, price: BigNumber, index: number, signature: string) => {
  const txHash = await inceptionContract.fellowMint(index, signature, { value: price });
  const receipt = await txHash.wait();

  return { status: receipt.status, txHash: receipt.txHash };
}
