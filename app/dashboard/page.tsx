export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow">
            <h3 className="font-medium mb-2">Card {item}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is a sample card with some content.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
