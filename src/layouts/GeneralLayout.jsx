import { Outlet } from "react-router-dom";

const GeneralLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white max-w-4xl mx-auto">
      <Outlet />
    </div>
  );
};

export default GeneralLayout;
