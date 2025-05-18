type SliderFilterProps = {
  isLoading: boolean,
  user: any,
  setUser: (value: any) => void
}

export function SliderFilter({ isLoading, user, setUser }: SliderFilterProps) {
  return (
    <div className="flex items-center gap-4 mt-8">
      <span className="font-medium">Show data from:</span>
      <div className="relative inline-flex items-center w-36 h-10 bg-gray-800 rounded-xl shadow overflow-hidden">
        <div className="absolute inset-0 flex">
          <div
            className={`flex-1 transition-colors duration-300 ${user?.dataRange === '30d' ? 'bg-white' : 'bg-gray-700'
              } rounded-l-xl`}
          />
          <div
            className={`flex-1 transition-colors duration-300 ${user?.dataRange === '1y' ? 'bg-white' : 'bg-gray-700'
              } rounded-r-xl`}
          />
        </div>
        <span
          className={`absolute top-0 left-0 w-1/2 h-full rounded-xl shadow-lg transition-transform duration-300 ease-in-out bg-white z-10`}
          style={{
            transform:
              user?.dataRange === '1y'
                ? 'translateX(100%)'
                : 'translateX(0%)',
          }}
        />
        <button
          className={`flex-1 h-full z-20 rounded-l-xl font-semibold transition-colors duration-300 ${user?.dataRange === '30d'
            ? 'text-gray-900'
            : 'text-gray-300 hover:text-white'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
          onClick={() => setUser((prev: any) => ({ ...prev, dataRange: '30d' }))}
        >
          30 days
        </button>
        <button
          className={`flex-1 h-full z-20 rounded-r-xl font-semibold transition-colors duration-300 ${user?.dataRange === '1y'
            ? 'text-gray-900'
            : 'text-gray-300 hover:text-white'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
          onClick={() => setUser((prev: any) => ({ ...prev, dataRange: '1y' }))}
        >
          1 year
        </button>
      </div>
    </div>
  )
}