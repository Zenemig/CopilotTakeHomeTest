import React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-linear-to-b from-gradient-start to-gradient-end flex justify-center items-center py-23 px-35">
      <div className="max-w-7xl w-full bg-white flex shadow-main-container rounded-lg border border-border-main h-[calc(100vh-184px)] overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-86 bg-sidebar-bg flex-shrink-0 p-4 border-r border-border">
          <h1 className="font-medium text-text-primary">The Birds App</h1>
          <p className="text-sm font-normal text-text-secondary mb-4">By Copilot</p>
          
          <nav>
            <a href="#" className="block w-full text-left px-3 py-2 text-sm font-semibold rounded-lg bg-nav-bg hover:bg-nav-bg-hover transition-colors duration-300 ease-in-out">
              Home
            </a>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 basis-full bg-white">
          {children}
        </main>
      </div>
    </div>
  );
};
