import { ReactNode } from "react";
import Header from "./_components/header";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen text-gray-400">
      <Header />
      <div className="container py-10">{children}</div>
    </main>
  );
};

export default RootLayout;
