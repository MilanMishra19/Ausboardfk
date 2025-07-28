import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import React, { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const SIDEBAR_WIDTH_CLASS = "w-64";
  const MAIN_CONTENT_OFFSET_CLASS = "ml-64";

  return (
    <div className="flex h-screen bg-black/10">
      <div className={`fixed top-0 left-0 h-screen ${SIDEBAR_WIDTH_CLASS}  z-30 overflow-y-auto bg-black/10`}>
        <Sidebar />
      </div>
      <div className={`flex-1 flex flex-col overflow-hidden bg-black/10 ${MAIN_CONTENT_OFFSET_CLASS}`}>
        <div className="w-full h-[59px]  sticky top-0 z-10">
          <Navbar />
        </div>
        <main className="flex-1 overflow-y-auto mt-[39px] px-15 pt-6">
          {children}
        </main>
      </div>
    </div>
  );
}
