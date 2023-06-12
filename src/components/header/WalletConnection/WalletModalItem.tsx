import React, { useCallback } from 'react'

import styled from 'styled-components'

import { FlexRow, ImageContainer, TextWrapper } from '../../../styles/components'
import { themeBorderRadius, themeColor } from '../../../styles/theme'

import styles from './WalletModalItem.module.scss';

const GreenCircle = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${themeColor.background1};
  border-radius: ${themeBorderRadius.circle};
`

const WalletModalItem = ({ className, name, iconUrl, isClickable = true, handleClick, isActive = false, href }: any) => {
  return (
    <div className={`${styles.walletItem} ${className}`} onClick={handleClick}>
      <ImageContainer src={iconUrl} width={'36px'} borderRadius={themeBorderRadius.none} />
      <div className={styles.walletName}>
        {name}
      </div>
    </div>
  )
}

export default WalletModalItem
