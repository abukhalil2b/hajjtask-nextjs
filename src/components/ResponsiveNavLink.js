const ResponsiveNavLink = ({ active, children, ...props }) => {
  const classes = active
    ? "block w-full pl-3 pr-4 py-2 border-l-4 border-red-400 text-red-700 bg-orange-200 focus:outline-none transition duration-150 ease-in-out"
    : "block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-[#ffb031] hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out";

  return (
    <a {...props} className={classes}>
      {children}
    </a>
  );
};

export default ResponsiveNavLink;
