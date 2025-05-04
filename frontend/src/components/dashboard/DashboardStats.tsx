export default function DashboardStats() {
    const stats = [
      { name: 'Total Users', stat: '71,897', change: '+12%', changeType: 'increase' },
      { name: 'Avg. Session', stat: '58.16%', change: '+4.75%', changeType: 'increase' },
      { name: 'Conversion Rate', stat: '24.57%', change: '-0.32%', changeType: 'decrease' },
    ];
  
    return (
      <div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.name}
              className="bg-white shadow rounded-lg relative overflow-hidden transition-all hover:scale-105 duration-300"
            >
              <div className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-blue-50 to-indigo-100 -bottom-6 -right-6 opacity-60" />
              <div className="px-5 py-5 sm:p-6 relative z-10">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {item.name}
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {item.stat}
                </dd>
                <dd className="mt-3">
                  <span
                    className={`text-sm font-medium ${
                      item.changeType === 'increase'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {item.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">from last month</span>
                </dd>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }