import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'

import { ConnectorNames, NETWORK_URLS, POLLING_INTERVAL, SupportedChainId, SUPPORTED_CHAIN_IDS } from '../../config/constants'

const MAIN_LOGO = '/assets/images/logox.png'

const injected = new InjectedConnector({ supportedChainIds: SUPPORTED_CHAIN_IDS })

const walletconnect = new WalletConnectConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
  rpc: NETWORK_URLS,
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

export const walletlink = new WalletLinkConnector({
  url: NETWORK_URLS[SupportedChainId.MAIN],
  appName: 'RCM Punks',
  appLogoUrl: MAIN_LOGO,
  supportedChainIds: SUPPORTED_CHAIN_IDS,
})

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  // [ConnectorNames.WalletLink]: walletlink,
}
