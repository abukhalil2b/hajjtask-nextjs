import Navigation from "@/app/components/Navigation";

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#003b4f] text-[#fff]">
      <Navigation />

      <main>{children}</main>
      <div className="py-5 w-full flex justify-center">
        <img src="/logo-login.png" alt="logo" width="70" />
      </div>
    </div>
  );
};

export default AppLayout;
