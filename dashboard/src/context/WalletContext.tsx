import { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';

interface WalletContextProps {
  address: string | null;
  connect: () => Promise<void>;
  signMessage: (message: string) => Promise<string | null>;
}

const WalletContext = createContext<WalletContextProps>({
  address: null,
  connect: async () => {},
  signMessage: async () => null,
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);

  const connect = async () => {
    if ((window as any).ethereum) {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      setAddress(accounts[0]);
    }
  };

  const signMessage = async (message: string) => {
    if (!address || !(window as any).ethereum) return null;
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    return signer.signMessage(message);
  };

  useEffect(() => {
    if ((window as any).ethereum && !address) {
      (window as any).ethereum.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
        if (accounts.length) setAddress(accounts[0]);
      });
    }
  }, [address]);

  return (
    <WalletContext.Provider value={{ address, connect, signMessage }}>
      {children}
    </WalletContext.Provider>
  );
};
