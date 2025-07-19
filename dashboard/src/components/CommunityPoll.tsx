import { useEffect, useState } from 'react';
import { useWallet } from '../context/WalletContext';

const options = ['New Lending Module', 'Mobile App', 'More Integrations'];

interface Votes {
  [key: string]: string[]; // option -> array of addresses
}

const CommunityPoll = () => {
  const { address, signMessage, connect } = useWallet();
  const [votes, setVotes] = useState<Votes>({});

  useEffect(() => {
    const stored = localStorage.getItem('votes');
    if (stored) setVotes(JSON.parse(stored));
  }, []);

  const vote = async (option: string) => {
    if (!address) await connect();
    const sig = await signMessage('primea-vote');
    if (!sig || !address) return;
    const current = votes[option] || [];
    if (!current.includes(address)) {
      const updated = { ...votes, [option]: [...current, address] };
      setVotes(updated);
      localStorage.setItem('votes', JSON.stringify(updated));
    }
  };

  const totalVotes = Object.values(votes).reduce((sum, v) => sum + v.length, 0);

  return (
    <section className="py-12 px-4">
      <h2 className="text-2xl font-bold mb-4">What should we build next?</h2>
      <div className="space-y-2">
        {options.map((o) => (
          <div key={o} className="border p-3 bg-gray-800 rounded">
            <div className="flex justify-between items-center">
              <span>{o}</span>
              <button className="px-2 py-1 bg-gray-700 rounded" onClick={() => vote(o)}>
                Vote
              </button>
            </div>
            <div className="h-2 bg-gray-700 rounded mt-2">
              <div
                className="bg-gold h-2 rounded"
                style={{ width: `${totalVotes ? ((votes[o]?.length || 0) / totalVotes) * 100 : 0}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunityPoll;
