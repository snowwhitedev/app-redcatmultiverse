import React from 'react'

import { useActiveWeb3React } from '../../../hooks'

import { useWalletConnectionModal } from '../hook'

import { AccountDetailContainer, ErrorContentContainer, OptionListContainer } from '.'

const WalletConnectionModal: React.FC = () => {
  const { account, error } = useActiveWeb3React()
  const { walletView, handleChangeWalletView } = useWalletConnectionModal()

  return (
    <div className='styles.walletDropdownContent'>
      {error ? (
        <ErrorContentContainer />
      ) : account && walletView === 'account' ? (
        <AccountDetailContainer handleWalletView={() => handleChangeWalletView('list')} />
      ) : (
        <OptionListContainer />
      )}
    </div>
  )
}

export default WalletConnectionModal
