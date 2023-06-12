import Image from 'next/image';
import { BigNumber } from 'ethers';
import { useActiveWeb3React } from '../../hooks';
import { getBalanceNumber } from '../../utils/bigNumberHelper';
import GradientLineSep from '../GradientLineSep/GradientLineSep';
import LoadingIcon from '../Icons/LoadingIcon';
import styles from './MintFooter.module.scss';

const MintFooter = ({ amount, mintPrice, isMinting, handleMintClick, mintStarted, soldOut }: any) => {
  const { account } = useActiveWeb3React();

  const getTotalPrice = () => {
    if (amount) {
      return getBalanceNumber(BigNumber.from(mintPrice).mul(amount));
    }
    return 0;
  }

  return (
    <div className={styles.mintFooterContainer}>
      <div className={styles.footerContent}>
        {/* <div className={styles.sanuraImg}>
          <Image
            src='/images/sanura-red-to-right.png'
            alt='sanura'
            layout='fill'
          />
        </div> */}
        {mintStarted === true && (
          <div className={styles.mintDetail}>
            <div className={styles.walletAddressContainer}>
              <div className={styles.addressLabel}>CONNECTED TO</div>
              <div className={styles.walletAddress}>{account}</div>
            </div>
            <div className={styles.checkout}>
              <div className={styles.itemPrice}>PRICE: {getBalanceNumber(mintPrice)} ETH</div>
              {/* <div className={styles.itemPrice}>PRICE: {mintPrice} ETH</div> */}
              <div className={styles.mintCount}>icNFTs: <span>{amount}</span></div>
              <GradientLineSep className={styles.sepLine} />
              <div className={styles.totalPrice}><span className={styles.priceLabel}>TOTAL</span>: {getTotalPrice()} ETH</div>
            </div>
            <button className={`${styles.mintBtn} ${styles.soldOut}`} onClick={handleMintClick} disabled={isMinting || !amount || amount === 0 || soldOut}>
              {isMinting
                ? <div className={styles.loadingIconContainer}><LoadingIcon /></div>
                : soldOut === true ? 'SOLD OUT' : 'MINT'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
};

export default MintFooter;
