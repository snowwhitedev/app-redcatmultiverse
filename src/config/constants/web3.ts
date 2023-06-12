const ETHEREUM_ICON = '/assets/images/ethereum.svg'
import INCEPTION_ABI from '../abis/inception.json';
import MULTI_CALL_ABI from '../abis/multicall.json';

export enum SupportedChainId {
  MAIN = 1,
  GOERLI_TESTNET = 5,
}

export const NETWORK_INDICATOR: { [chainId: number]: { name: 'Ethereum' | 'Rinkeby'; icon: string } } = {
  [SupportedChainId.MAIN]: { name: 'Ethereum', icon: ETHEREUM_ICON },
  [SupportedChainId.GOERLI_TESTNET]: { name: 'Rinkeby', icon: ETHEREUM_ICON },
}

export enum ConnectorNames {
  Injected = 'injected',
  WalletConnect = 'walletconnect',
}

export const SUPPORTED_CHAIN_IDS: SupportedChainId[] = [SupportedChainId.MAIN, SupportedChainId.GOERLI_TESTNET]

/** SMART CONTRACT ADDRESSES  */
type AddressMap = { [chainId: number]: string }

export const INCEPTION_CONTRACT_ADDRESS: AddressMap = {
  [SupportedChainId.MAIN]: '0x2BA3aCeF58bBB51916EF49ecbC64074C083B2440',
  [SupportedChainId.GOERLI_TESTNET]: '0x88e1d151D61E082ba8654fB1a70b3cf584a09FFf'
}

export const MULTI_CALL_ADDRESS: AddressMap = {
  [SupportedChainId.MAIN]: '0x241B20F857899cac5a999769ba0b7Fd063628368', // NOTE: this is goerli address
  [SupportedChainId.GOERLI_TESTNET]: '0x241B20F857899cac5a999769ba0b7Fd063628368'
}

export const CONTRACT_ABIS = {
  INCEPTION: INCEPTION_ABI,
  MULTI_CALL: MULTI_CALL_ABI
}

const ALCHEMY_KEY = 'wyqG5WLpBED8Vje26rQ2y7720QAVc6Bh'
const ALCHEMY_KEY_GOERLI = 'Ya0tREALEPtP_lmtQA2ZFugKsL9zlmHx'

export const NETWORK_URLS: {
  [chainId in number]: string
} = {
  [SupportedChainId.MAIN]: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`,
  [SupportedChainId.GOERLI_TESTNET]: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_KEY_GOERLI}`
}

export const MAXIMUM_INCEPTION_LIMIT = 1111;
export const MINT_AUCTION_PRICE_POLLING_INTERVAL = 60000;
export const POLLING_INTERVAL = 30000
export const GAS_PRICE_POLLING_INTERVAL = 60000
export const connectorLocalStorageKey = 'connectorId'
export const walletLocalStorageKey = 'wallet'
