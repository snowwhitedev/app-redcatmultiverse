import { useEffect, useState } from 'react';
import { useActiveWeb3React, useCurrentTheme } from '../src/hooks';
import FullHeightContainer from '../src/components/container/FullHeightContainer';
import GradientText from '../src/components/GradientText/GradientText';
import MintClock from '../src/components/Mint/MintClock';
import MintFooter from '../src/components/Mint/MintFooter';
import ComingSoon from '../src/components/ComingSoon/ComingSoon';

import styles from '../src/styles/mint.module.scss';
import {
  useAuctionMint,
  useFellowMint,
  useInsiderMint,
  usePublicMint,
  useInceptionTotalSupply,
  useReservedPrivateNfts
} from '../src/hooks/useMint';
// import { MAXIMUM_INCEPTION_LIMIT } from '../src/config/constants';
import {
  AUCTION_MINT_START_NUMBER,
  COUNT_DOWN,
  EARLY_BIRD_PHASE_1,
  EARLY_BIRD_PHASE_2,
  FELLOW_MINT_REACH_OUT,
  INSIDER_MINT_AMOUNT,
  INSIDER_MINT_START,
  RESERVED_PRIVATE_NFT
} from '../src/config/constants/config';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { getEarlyBirdPhase, getToastCloseTimeForComingSoon } from '../src/helpers/timestampHelper';

let SALE_STATE = 4;

const Mint = () => {
  const [isMinting, setIsMinting] = useState(false);
  const [amount, setAmount] = useState(0);
  const [mintPrice, setMintPrice] = useState(0);
  const [mintStarted, setMintStarted] = useState(false);
  const [soldOut, setSoldOut] = useState(false);
  const { account } = useActiveWeb3React();
  const { auctionMintPrice, handleAuctionMint } = useAuctionMint();
  const { publicMintPrice, handlePublicMint } = usePublicMint();
  const { insiderMintPrice, handleInsiderMint } = useInsiderMint();
  const { fellowMintPrice, handleFellowMint } = useFellowMint();

  // const { inceptionTotal } = useInceptionTotalSupply();
  const { reservedPrivateNfts } = useReservedPrivateNfts();
  const { currentTheme } = useCurrentTheme();

  useEffect(() => {
    let interval: any;

    const tictoc = () => {
      const now = new Date().getTime();
      const distance = COUNT_DOWN - now;
      if (distance < 0) {
        setMintStarted(true);
      }
    }

    tictoc();
    interval = setInterval(tictoc, 1000);

    return () => clearInterval(interval);
  }, []);

  // auction Mint
  // useEffect(() => {
  //   if (SALE_STATE === 3 && Number(inceptionTotal) + AUCTION_MINT_START_NUMBER === MAXIMUM_INCEPTION_LIMIT) {
  //     setSoldOut(true);
  //   }
  // }, [inceptionTotal]);

  // fellow mint
  // useEffect(() => {
  //   if (SALE_STATE === 2 && Number(reservedPrivateNfts) === RESERVED_PRIVATE_NFT - FELLOW_MINT_REACH_OUT) {
  //     setSoldOut(true);
  //   }
  // }, [reservedPrivateNfts]);

  // insider mint
  useEffect(() => {
    if (SALE_STATE === 1 && Number(reservedPrivateNfts) === INSIDER_MINT_START - INSIDER_MINT_AMOUNT) {
      setSoldOut(true);
    }
  }, [reservedPrivateNfts]);

  // Toast for auction mint
  // useEffect(() => {
  //   const now = new Date().getTime();
  //   const distance = COUNT_DOWN - now;
  //   if (SALE_STATE === 3 && distance > 0) {
  //     const toastCloseTime = getToastCloseTimeForComingSoon();
  //     const toastConfig: ToastOptions = {
  //       position: "top-center",
  //       autoClose: toastCloseTime,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     };
  //     toast('MINT between 11 AM UTC and 12 PM UTC on December 19th to be eligible for one of the 12 SUPERIOR EARLY BIRD PACKAGE!', toastConfig);
  //     setTimeout(() => {
  //       toast('MINT between 12 PM UTC and 5 PM UTC on December 19th to be eligible for one of the 50 EARLY BIRD PACKAGES', {
  //         ...toastConfig,
  //         autoClose: toastCloseTime - 8000
  //       });
  //     }, 8000);

  //   } else if (SALE_STATE === 3 && mintStarted === true) {
  //     const { phase, distance } = getEarlyBirdPhase();
  //     const autoCloseTime = distance > 0 ? distance : 0;

  //     const toastConfig: ToastOptions = {
  //       position: "top-center",
  //       autoClose: autoCloseTime,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     };

  //     if (phase === EARLY_BIRD_PHASE_1) {
  //       toast('MINT between 11 AM UTC and 12 PM UTC on December 19th to be eligible for one of the 12 SUPERIOR EARLY BIRD PACKAGE!', toastConfig);
  //     } else if (phase === EARLY_BIRD_PHASE_2) {
  //       toast('MINT between 12 PM UTC and 5 PM UTC on December 19th to be eligible for one of the 50 EARLY BIRD PACKAGES', toastConfig);
  //     }

  //     toast('RCM Labs have reserved RCM Fellowship and RCM Insider Inception Package NFTs and those NFTs are not available for the auction!', {
  //       ...toastConfig,
  //       hideProgressBar: true
  //     });
  //   }

  // }, [mintStarted]);

  useEffect(() => {
    // insider mint
    if (SALE_STATE === 1) {
      setMintPrice(insiderMintPrice);
    }

    // fellow mint
    if (SALE_STATE === 2) {
      setMintPrice(fellowMintPrice);
    }

    // Auction mint
    if (SALE_STATE === 3) {
      setMintPrice(auctionMintPrice)
    }

    // Fellowship mint
    if (SALE_STATE === 4) {
      setMintPrice(publicMintPrice);
    }
  }, [auctionMintPrice, fellowMintPrice, insiderMintPrice, publicMintPrice])

  const handleOnChangeMintAmount = (e: any) => {
    setAmount(e.target.value);
  }

  const handleMintClick = async () => {
    if (!account) {
      toast.error("Please connect your wallet first!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    }
    setIsMinting(true);

    try {
      // insider mint
      if (SALE_STATE === 1) {
        await handleInsiderMint();
      }

      if (SALE_STATE === 2) {
        await handleFellowMint();
      }

      // Auction mint
      if (SALE_STATE === 3) {
        await handleAuctionMint(amount);
      }

      // Public mint
      if (SALE_STATE === 4) {
        await handlePublicMint(amount);
      }
      toast.success("Your RCM Inception Package NFT has been minted successfully and delivered to your wallet.\n Check your wallet.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch {
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    setIsMinting(false);
  }

  const mintLabel = () => {
    if (SALE_STATE === 1) {
      return 'RCM INSIDER MINT';
    }

    if (SALE_STATE === 2) {
      return 'RCM FELLOWSHIP MINT';
    }

    if (SALE_STATE === 3) {
      return 'RCM AUCTION MINT';
    }

    if (SALE_STATE === 4) {
      return 'RCM PUBLIC MINT';
    }
  }

  return (
    <FullHeightContainer>
      {mintStarted === false
        ? <ComingSoon />
        : <>
          <div className={styles.pageContainer}>
            {/* <div className={styles.nftStats}>
              <span className={styles.statsMinted}>{Number(inceptionTotal)}</span>
              &nbsp;/&nbsp;
              <span className={styles.statsTotal}>{MAXIMUM_INCEPTION_LIMIT}</span>
              &nbsp;RCM NFTS REMAINING
            </div> */}
            <GradientText
              element='h2'
              text='INCEPTION PACKAGE'
              innerColor={currentTheme === 'dark' ? '#FFF' : '#1b1628'}
              gradient={['#f9c930', '#f2957c', '#7192f3']}
            />
            <GradientText
              element='h2'
              text='RCM INCEPTION CARNIVAL'
              innerColor={currentTheme === 'dark' ? '#FFF' : '#1b1628'}
              gradient={['#f9c930', '#f2957c', '#7192f3']}
            />
            <div className={styles.mintLabel}>{mintLabel()}</div>
            {(SALE_STATE === 3 || SALE_STATE === 4) && (
              <div className={styles.amountInputContainer}>
                <input className={styles.amountInput} placeholder='Enter #' type='number' onChange={handleOnChangeMintAmount} max={15} />
              </div>
            )}
            <div className={styles.clockContainer}>
              <MintClock isMinting={isMinting} />
            </div>
          </div>
          <MintFooter
            amount={SALE_STATE === 1 || SALE_STATE == 2 ? 1 : amount}
            mintPrice={mintPrice}
            handleMintClick={handleMintClick}
            isMinting={isMinting}
            mintStarted={mintStarted}
            soldOut={soldOut}
          />
        </>
      }
      <ToastContainer className={'mintToastContainer'} toastClassName={'mintToast'} progressClassName={'mintToastProgress'} />
    </FullHeightContainer>
  )
};

export default Mint;
