"use client";

const GuestLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#013b4f]">
      <img src="/logo-login.png" alt="logo" />
      <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-[#00c0a8] shadow-md overflow-hidden sm:rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default GuestLayout;
