import { ThemeProvider } from 'next-themes'
import { Web3ReactProvider } from '@web3-react/core';

import { getLibrary } from './utils/web3Helpers';

const Providers = ({ children }: any) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider enableSystem={false} defaultTheme='dark'>{children}</ThemeProvider>
    </Web3ReactProvider>
  )
};

export default Providers;
