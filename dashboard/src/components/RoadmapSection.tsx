import modules, { type Module } from '../data/modules';
import { useWallet } from '../context/WalletContext';
import { useEffect, useState } from 'react';

const statusEmoji = {
  complete: '✅',
  pending: '🕓',
  locked: '🔒',
};

const RoadmapSection = () => {
  const { address } = useWallet();
  const [supported, setSupported] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('supported');
    if (stored) setSupported(JSON.parse(stored));
  }, []);

  const support = (id: string) => {
    const next = Array.from(new Set([...supported, `${address}:${id}`]));
    setSupported(next);
    localStorage.setItem('supported', JSON.stringify(next));
  };

  return (
    <section className="py-12 px-4">
      <h2 className="text-2xl font-bold mb-4">Roadmap</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {modules.map((m: Module) => (
          <div key={m.id} className="border rounded p-4 bg-gray-800">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{m.title}</h3>
              <span>{statusEmoji[m.status]}</span>
            </div>
            <p className="text-sm mb-2">{m.description}</p>
            <div className="w-full bg-gray-700 h-2 rounded">
              <div
                className="bg-gold h-2 rounded"
                style={{ width: `${m.progress}%` }}
              />
            </div>
            <button
              className="mt-3 px-3 py-1 bg-gray-700 rounded"
              onClick={() => support(m.id)}
            >
              Support this Module
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoadmapSection;
