import { Header } from "./Header";

export interface PrivateLayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: PrivateLayoutProps) => {
  return (
    <>
      <Header />
      <div className="max-w-[1280px]">{children}</div>
    </>
  );
};
