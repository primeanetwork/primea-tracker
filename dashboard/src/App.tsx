import { BrowserRouter } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import RoadmapSection from './components/RoadmapSection';
import FundingTracker from './components/FundingTracker';
import CommunityPoll from './components/CommunityPoll';
import ResourceGrid from './components/ResourceGrid';
import Footer from './components/Footer';
import { WalletProvider, useWallet } from './context/WalletContext';

const ConnectBar = () => {
  const { address, connect } = useWallet();
  return (
    <div className="p-4 bg-gray-900 text-right">
      {address ? (
        <span className="text-sm">{address}</span>
      ) : (
        <button className="px-3 py-1 bg-gray-700 rounded" onClick={connect}>
          Connect Wallet
        </button>
      )}
    </div>
  );
};

const AppContent = () => (
  <>
    <ConnectBar />
    <HeroSection />
    <RoadmapSection />
    <FundingTracker />
    <CommunityPoll />
    <ResourceGrid />
    <Footer />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <WalletProvider>
        <AppContent />
      </WalletProvider>
    </BrowserRouter>
  );
}

export default App;
