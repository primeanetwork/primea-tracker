const resources = [
  { name: 'GitHub', link: '#', coming: false },
  { name: 'GitBook', link: '#', coming: false },
  { name: 'Explorer', link: '#', coming: false },
  { name: 'DEX', link: '#', coming: true },
  { name: 'Cashier', link: '#', coming: true },
  { name: 'Governance Portal', link: '#', coming: true },
];

const ResourceGrid = () => (
  <section className="py-12 px-4">
    <h2 className="text-2xl font-bold mb-4">Resources</h2>
    <div className="grid sm:grid-cols-3 gap-4">
      {resources.map((r) => (
        <a
          key={r.name}
          href={r.link}
          className="border p-4 bg-gray-800 rounded flex items-center justify-center relative"
        >
          {r.name}
          {r.coming && (
            <span className="absolute top-2 right-2 text-xs bg-gray-700 px-1 rounded">
              Coming Soon
            </span>
          )}
        </a>
      ))}
    </div>
  </section>
);

export default ResourceGrid;
