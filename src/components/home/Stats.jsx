export default function Stats() {
  const stats = [
    { value: '3+ Years', label: 'Professional Experience' },
    { value: '$125k+', label: 'Revenue Generated' },
    { value: '25k+', label: 'Social Media Followers' }
  ];

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-3 gap-8 mt-16">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
          <div className="text-gray-400">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}