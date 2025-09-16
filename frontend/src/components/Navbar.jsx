import ThemeToggle from "./ThemeToggle";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-dotted border-b-2 border-black rounded-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            {/* <img 
              src={logo} 
              alt="TaskSync - Interlaced hands representing collaboration" 
              className="h-8 w-8 object-contain"
            /> */}
            <h1 className="text-xl font-semibold text-foreground">
              TaskSync
            </h1>
          </div>
          
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};