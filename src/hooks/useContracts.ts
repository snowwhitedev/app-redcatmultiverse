import { useMemo } from 'react'

import { Contract } from 'ethers'

import { CONTRACT_ABIS, INCEPTION_CONTRACT_ADDRESS, MULTI_CALL_ADDRESS, SupportedChainId, SUPPORTED_CHAIN_IDS } from '../config/constants';
import { getContract, getContractWithSimpleProvider, isSupportedNetwork } from '../utils/web3Helpers';

import { useActiveWeb3React } from './useActiveWeb3React'

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true,
  withSimpleProvider = true
): T | null {
  const { library, account, chainId: activeChainId } = useActiveWeb3React();

  const chainId = account ? activeChainId : SupportedChainId.MAIN;

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || isSupportedNetwork(chainId) === false) {
      return null
    }
    let address: string | undefined
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    else address = addressOrAddressMap[chainId!]

    if (!address) return null
    try {
      if (withSimpleProvider) {
        if (!chainId) return null
        return getContractWithSimpleProvider(address, ABI, chainId)
      }

      if (!library) return null;
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error: any) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, ABI, library, chainId, withSimpleProvider, withSignerIfPossible, account]) as T
}

export const useInceptionContract = (withSigner = false, withSimpleProvider = true) => {
  return useContract(INCEPTION_CONTRACT_ADDRESS, CONTRACT_ABIS.INCEPTION, withSigner, withSimpleProvider);
}

export const useMultiCallContract = () => {
  return useContract(MULTI_CALL_ADDRESS, CONTRACT_ABIS.MULTI_CALL, false, true);
}
