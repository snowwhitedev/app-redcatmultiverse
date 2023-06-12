import React from 'react'

import styled from 'styled-components'

import { CloseIconWrapper, FlexColumn, OverlayContainer } from '../../styles/components'
import { themeBorderRadius, themeColor } from '../../styles/theme'

import styles from './ModalWrapper.module.scss';

const ModalWrapper = styled(FlexColumn)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 90vh;
  overflow-y: auto;
  padding: 24px;
  border: ${themeColor.border4};
  z-index: 999;
`

interface IModalProps {
  isOpen: boolean
  handleOpenModal: () => void
  width?: string
  backgroundColor?: string
}

const Modal: React.FC<IModalProps> = ({ children, isOpen, handleOpenModal, width, backgroundColor }) => {
  if (!isOpen) return null

  // return (
  //   <ModalWrapper
  //     backgroundColor={backgroundColor ? backgroundColor : themeColor.background4}
  //     borderRadius={themeBorderRadius.regular}
  //     colWidth={width ?? '30%'}
  //   >
  //     {children}
  //     <CloseIconWrapper onClick={handleOpenModal} />
  //   </ModalWrapper>
  // )
  return (
    <div
      className={styles.modalWrapper}
    >
      {children}
      <CloseIconWrapper onClick={handleOpenModal} />
    </div>
  )
}

export default Modal
