import LWSLogo from './assets/ChatGPT Image Jun 28, 2026, 12_26_52 AM.png'

const Header = () => {
  return (
    <nav className="py-3 md:py-1 fixed top-0 w-full bg-black z-50">
      <div className="container mx-auto flex items-center justify-between gap-x-6">
        <a href="/">
          <img className="h-[80px]" src={LWSLogo} alt="Lws" />
        </a>
      </div>
    </nav>
  );
};

export default Header;
