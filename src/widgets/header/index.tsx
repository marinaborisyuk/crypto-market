import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          CryptoMarket
        </Link>
        <div className="text-sm">
          Powered by{" "}
          <a href="https://coincap.io/" target="_blank" rel="noopener noreferrer" className="underline">
            CoinCap API
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;