import { INCEPTION_CONTRACT_ADDRESS } from '../config/constants';

export const getInceptionAddress = (chainId: number) => {
  return INCEPTION_CONTRACT_ADDRESS[chainId]
}
