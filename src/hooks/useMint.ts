import { useCallback, useEffect, useState } from "react";
import { BigNumber } from 'ethers';
import { MINT_AUCTION_PRICE_POLLING_INTERVAL } from "../config/constants";
import {
  auctionMint,
  getInceptionMintAuctionPrice,
  getPublicMintPrice,
  getInceptionTotalSupply,
  publicMint,
  getInsiderPrice,
  insiderMint,
  getFellowPrice,
  fellowMint,
  getReservedPrivateNfts
} from "../utils/web3CallHelpers";
import { useInceptionContract } from "./useContracts";
import { signatures } from '../config/constants/signatures';
import { useActiveWeb3React } from "./useActiveWeb3React";

export const useAuctionMint = () => {
  const [auctionMintPrice, setAuctionMintPrice] = useState(0);
  const inceptionContract = useInceptionContract(true, false);
  const inceptionContractWithNoSigner = useInceptionContract(false, true);

  useEffect(() => {
    let interval: any;

    const fetchPrice = async () => {
      if (inceptionContractWithNoSigner) {
        const price = await getInceptionMintAuctionPrice(inceptionContractWithNoSigner);
        setAuctionMintPrice(price.toString());
      }
    }

    fetchPrice();

    interval = setInterval(fetchPrice, MINT_AUCTION_PRICE_POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, [inceptionContract, inceptionContractWithNoSigner]);

  const handleAuctionMint = useCallback(async (amount: any) => {
    if (!inceptionContract) {
      return;
    }

    try {
      const res = await auctionMint(inceptionContract, amount, BigNumber.from(auctionMintPrice));
    } catch (error) {
      console.error('Auction Minting error =>', error);
      throw Error('Auction Minting error');
    }
  }, [inceptionContract, auctionMintPrice]);

  return { auctionMintPrice, handleAuctionMint };
}

export const usePublicMint = () => {
  const [publicMintPrice, setPublicMintPrice] = useState(0);
  const inceptionContract = useInceptionContract(true, false);
  const inceptionContractWithNoSigner = useInceptionContract(false, true);

  useEffect(() => {
    if (inceptionContractWithNoSigner) {
      const fetchPrice = async () => {
        const price = await getPublicMintPrice(inceptionContractWithNoSigner);
        setPublicMintPrice(price.toString());
      }

      fetchPrice();
    }
  }, [inceptionContract, inceptionContractWithNoSigner]);

  const handlePublicMint = useCallback(async (amount: any) => {
    if (!inceptionContract) {
      return;
    }

    try {
      await publicMint(inceptionContract, amount, BigNumber.from(publicMintPrice))
    } catch (error) {
      console.error('Public mint error =>', error);

      throw Error('Public mint error');
    }
  }, [inceptionContract, publicMintPrice]);

  return { publicMintPrice, handlePublicMint }
}

export const useInsiderMint = () => {
  const { account } = useActiveWeb3React();
  const [insiderMintPrice, setInsiderMintPrice] = useState(0);
  const inceptionContract = useInceptionContract(true, false);
  const inceptionContractWithNoSigner = useInceptionContract(false, true);

  useEffect(() => {
    if (inceptionContractWithNoSigner) {
      const fetchPrice = async () => {
        const price = await getInsiderPrice(inceptionContractWithNoSigner);
        setInsiderMintPrice(price.toString());
      }

      fetchPrice();
    }
  }, [inceptionContract, inceptionContractWithNoSigner]);

  const handleInsiderMint = useCallback(async () => {
    if (!inceptionContract || !account) {
      return;
    }

    try {
      const index = signatures[account.toLowerCase()].index;
      const signature = signatures[account.toLowerCase()].signature;

      await insiderMint(inceptionContract, BigNumber.from(insiderMintPrice), index, signature);
    } catch (error) {
      console.error('Insider mint error =>', error)

      throw Error('Insider mint error');
    }
  }, [account, inceptionContract, insiderMintPrice]);

  return { insiderMintPrice, handleInsiderMint }
}

export const useFellowMint = () => {
  const { account } = useActiveWeb3React();
  const [fellowMintPrice, setFellowMintPrice] = useState(0);
  const inceptionContract = useInceptionContract(true, false);
  const inceptionContractWithNoSigner = useInceptionContract(false, true);

  useEffect(() => {
    if (inceptionContractWithNoSigner) {
      const fetchPrice = async () => {
        const price = await getFellowPrice(inceptionContractWithNoSigner);
        setFellowMintPrice(price.toString());
      }

      fetchPrice();
    }
  }, [inceptionContract, inceptionContractWithNoSigner]);

  const handleFellowMint = useCallback(async () => {
    if (!inceptionContract || !account) {
      return;
    }

    try {
      const index = signatures[account.toLowerCase()].index;
      const signature = signatures[account.toLowerCase()].signature;

      await fellowMint(inceptionContract, BigNumber.from(fellowMintPrice), index, signature);
    } catch (error) {
      console.error('Insider mint error =>', error);
      throw Error('Insider mint error');
    }
  }, [inceptionContract, account, fellowMintPrice]);

  return { fellowMintPrice, handleFellowMint }
}

export const useInceptionTotalSupply = () => {
  const [inceptionTotal, setInceptionTotal] = useState(0);

  const inceptionContract = useInceptionContract(false, true);

  useEffect(() => {
    let interval: any;
    const fetchTotalSupply = async () => {
      if (inceptionContract) {
        const total = await getInceptionTotalSupply(inceptionContract);
        setInceptionTotal(total.toString());
      }
    }
    fetchTotalSupply();

    interval = setInterval(fetchTotalSupply, MINT_AUCTION_PRICE_POLLING_INTERVAL);
    return () => clearInterval(interval);

  }, [inceptionContract]);

  return { inceptionTotal }
}

export const useReservedPrivateNfts = () => {
  const [reservedPrivateNfts, setReservedPrivateNfts] = useState(0);

  const inceptionContract = useInceptionContract(false, true);

  useEffect(() => {
    let interval: any;
    const fetchReservedPrivateNfts = async () => {
      if (inceptionContract) {
        const total = await getReservedPrivateNfts(inceptionContract);
        setReservedPrivateNfts(total.toString());
      }
    }
    fetchReservedPrivateNfts();

    interval = setInterval(fetchReservedPrivateNfts, MINT_AUCTION_PRICE_POLLING_INTERVAL);
    return () => clearInterval(interval);

  }, [inceptionContract]);

  return { reservedPrivateNfts }
}
