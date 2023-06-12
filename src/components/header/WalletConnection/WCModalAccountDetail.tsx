import React, { useMemo } from 'react'
import { FaRegCopy } from 'react-icons/fa'

import { SUPPORTED_WALLETS } from '../../../config/constants'
import { useActiveWeb3React } from '../../../hooks'
import { HoverTextWrapper, TextWrapper } from '../../../styles/components'
import { shortenAddress } from '../../../utils/web3Helpers'
import styles from './WCModalAccountDetail.module.scss';

const WalletConnectionAccountDetail: React.FC<{ handleWalletView: () => void }> = ({ handleWalletView }) => {
  const { account, connector } = useActiveWeb3React()

  const connectedWallet = useMemo(() => {
    const name = Object.keys(SUPPORTED_WALLETS)
      .filter((wallet) => SUPPORTED_WALLETS[wallet].connector === connector)
      .map((k) => SUPPORTED_WALLETS[k].name)[0]

    return `Connected with ${name}`
  }, [connector])

  return (
    <div className={styles.accountDetail}>
      <div>
        <TextWrapper fontSize={'xxl'} fontFamily={'title'} lineHeight={40}>
          {'Account Detail'}
        </TextWrapper>
      </div>
      <div className={styles.accountInfoItem}>
        <TextWrapper color={'text3'}>{connectedWallet}</TextWrapper>
      </div>
      <div>
        <HoverTextWrapper onClick={handleWalletView}>{'Switch Wallet'}</HoverTextWrapper>
      </div>
      <div className={styles.accountInfoItem}>
        {account && (
          <>
            <TextWrapper>{shortenAddress(account)}</TextWrapper>
            <HoverTextWrapper>
              <FaRegCopy size={20} onClick={() => navigator.clipboard.writeText(account)} />
            </HoverTextWrapper>
          </>
        )}
      </div>
    </div>
  )
}

export default WalletConnectionAccountDetail
