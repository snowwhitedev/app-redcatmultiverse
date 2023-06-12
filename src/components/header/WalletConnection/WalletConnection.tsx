import React, { useEffect, useMemo, useState } from 'react'

import { UnsupportedChainIdError } from '@web3-react/core'
import { isMobile, isTablet } from 'react-device-detect'

import { SUPPORTED_WALLETS } from '../../../config/constants/wallet'
import { useActiveWeb3React, useModal } from '../../../hooks'
import { ImageContainer, TextWrapper } from '../../../styles/components'
import { themeBorderRadius } from '../../../styles/theme'
import { shortenAddress } from '../../../utils/web3Helpers'
import { useReverseENSLookUp, useWalletConnectionModal } from '../hook'
import { WalletConnectionModal } from '.'
import styles from './WalletConnection.module.scss';
import WalletIcon from '../../Icons/WalletIcon'

const WalletConnection = () => {
  const { account, connector, error } = useActiveWeb3React()
  const { connect } = useWalletConnectionModal();
  const { isOpen, handleOpenModal } = useModal()
  const [connectBtnText, setConnectBtnText] = useState('');

  const ens = useReverseENSLookUp()

  useEffect(() => {
    if (isMobile) {
      setConnectBtnText('Connect');
    }
    if (!isMobile) {
      setConnectBtnText('Connect Wallet');
    }
  }, []);

  const iconUrl = useMemo(
    () =>
      Object.keys(SUPPORTED_WALLETS)
        .filter((wallet) => SUPPORTED_WALLETS[wallet].connector === connector)
        .map((k) => SUPPORTED_WALLETS[k].iconURL)[0],
    [connector]
  )

  const handleClickConnectWallet = () => {
    if (account || !isMobile) {
      handleOpenModal();
      return;
    }

    connect(SUPPORTED_WALLETS.METAMASK.connector, SUPPORTED_WALLETS.METAMASK.connectorId,)
  }

  return (
    <div className={styles.dropdown}>
      <button className={styles.walletConnectBtn} onClick={handleClickConnectWallet}>
        <WalletIcon />
        {account ? (
          <>
            {/* <NetworkIndicator /> */}
            <span className={styles.btnTxt}>&nbsp;{ens ?? shortenAddress(account, 4, isMobile)}</span>
            {!isMobile && !isTablet && (
              <ImageContainer src={iconUrl} width={'24px'} borderRadius={themeBorderRadius.none} margin={'0 0 0 12px'} />
            )}
          </>
        ) : error ? (
          <TextWrapper>{error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error'}</TextWrapper>
        ) : (
          <span className={styles.btnTxt}>
            {connectBtnText}
          </span>
        )}
      </button>
      {isOpen && !isMobile && (
        <div className={styles.dropdownMenu}>
          <WalletConnectionModal />
        </div>
      )}
    </div>
  )
}

export default WalletConnection
