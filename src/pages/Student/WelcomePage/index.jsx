const WelcomePage = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome to the Student Dashboard
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Explore the sidebar to access different sections of the dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
