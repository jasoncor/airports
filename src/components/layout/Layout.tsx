import { Header } from "./Header";
import { useRouterState } from "@tanstack/react-router";

export interface PrivateLayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: PrivateLayoutProps) => {
  const { location } = useRouterState();
  const isDetail = /^\/airports\/[^/]+$/.test(location.pathname);
  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      {!isDetail && <Header />}
      <div className="flex-1 w-full flex justify-center bg-white">
        <div className="w-full flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
};
