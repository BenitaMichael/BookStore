const PageLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FAFFEB] dark:bg-gray-900 transition-colors duration-500">
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Custom Spinner */}
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />

        {/* Optional Loading Text */}
        {/* <p className="text-sm text-gray-700 dark:text-gray-300 font-medium tracking-wide">
          Loading magic...
        </p> */}
      </div>
    </div>
  );
};

export default PageLoader;
