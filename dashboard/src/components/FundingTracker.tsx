import { funding } from '../data/funding';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#d4af37', '#8884d8', '#82ca9d'];

const FundingTracker = () => (
  <section className="py-12 px-4">
    <h2 className="text-2xl font-bold mb-4">Funding Tracker</h2>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <div className="bg-gray-800 p-4 rounded">Total Advanced: ${funding.totalAdvanced.toLocaleString()}</div>
        <div className="bg-gray-800 p-4 rounded">Protocol Revenue: ${funding.revenue.toLocaleString()}</div>
        <div className="bg-gray-800 p-4 rounded">Reimbursement Pending: ${funding.reimbursement.toLocaleString()}</div>
      </div>
      <PieChart width={250} height={250}>
        <Pie data={funding.allocations} dataKey="value" nameKey="name" outerRadius={100}>
          {funding.allocations.map(( _entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
    <table className="mt-6 w-full text-left">
      <thead>
        <tr>
          <th className="py-2">Category</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {funding.allocations.map((a) => (
          <tr key={a.name} className="border-t border-gray-700">
            <td className="py-2">{a.name}</td>
            <td>${a.value.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

export default FundingTracker;
