import React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex justify-center items-stretch p-0 xl:bg-linear-to-b xl:from-gradient-start xl:to-gradient-end xl:items-center xl:py-23 xl:px-35">
      <div className="w-full bg-white flex flex-col lg:flex-row h-screen overflow-hidden xl:max-w-7xl xl:shadow-main-container xl:rounded-lg xl:border xl:border-border-main xl:h-[calc(100vh-184px)]">
        {/* Top Bar (Mobile/Tablet - 1024px and below) */}
        <header className="lg:hidden bg-sidebar-bg flex items-center justify-between p-4 border-b border-border flex-shrink-0">
          <div className="flex flex-col">
            <h1 className="font-medium text-text-primary">The Birds App</h1>
            <p className="text-sm font-normal text-text-secondary">By Copilot</p>
          </div>
          
          <nav>
            <a href="#" className="block px-3 py-2 text-sm font-semibold rounded-lg bg-nav-bg hover:bg-nav-bg-hover transition-colors duration-300 ease-in-out">
              Home
            </a>
          </nav>
        </header>

        {/* Left Sidebar (Desktop - above 1024px) */}
        <aside className="hidden lg:flex lg:w-86 bg-sidebar-bg flex-shrink-0 p-4 border-r border-border flex-col">
          <h1 className="font-medium text-text-primary">The Birds App</h1>
          <p className="text-sm font-normal text-text-secondary mb-4">By Copilot</p>
          
          <nav>
            <a href="#" className="block w-full text-left px-3 py-2 text-sm font-semibold rounded-lg bg-nav-bg hover:bg-nav-bg-hover transition-colors duration-300 ease-in-out">
              Home
            </a>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 basis-full bg-white overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};
