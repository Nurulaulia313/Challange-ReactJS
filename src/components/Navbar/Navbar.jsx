import { useId } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export default function Navbar({ onSearchChange }) {
  const inputId = useId();
  const { isLoggedIn, login, logout } = useUser();
  const navigate = useNavigate(); // Hook untuk navigasi programatik

  const handleSearch = (e) => {
    e.preventDefault(); // Mencegah form submit yang dapat reload halaman

    const query = e.target.searchInput.value; // Ambil nilai dari input pencarian
    if (query.trim()) {
      // Mengirimkan kata kunci pencarian ke Parent (ProductPage)
      onSearchChange(query); // Memanggil function dari parent
    }
  };

  return (
    <nav className="bg-[#6173E6] shadow-md text-white">
      <div className="container mx-auto flex justify-between items-center px-8 py-4">
        {/* Logo / Home Link */}
        <Link
          to="/"
          className="text-2xl font-semibold hover:text-gray-200 transition duration-200"
        >
          ShopSport
        </Link>

        {/* Search Bar */}
        <div className="w-1/3">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              name="searchInput"
              id={inputId}
              placeholder="Search products..."
              className="w-full py-2 pl-4 pr-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8091FF] shadow-sm"
            />
            <button
              type="submit"
              className="ml-2 bg-[#8091FF] text-white rounded-full py-2 px-4 hover:bg-[#6a82c6] transition duration-200"
            >
              Cari
            </button>
          </form>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              <Link
                to="/cart"
                className="hover:text-gray-200 transition duration-200"
              >
                Cart
              </Link>
              <Link
                to="/orders"
                className="hover:text-gray-200 transition duration-200"
              >
                My Orders
              </Link>
              <button
                onClick={logout}
                className="hover:text-gray-200 transition duration-200"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={login}
                className="hover:text-gray-200 transition duration-200"
              >
                Sign in
              </button>
              <Link
                to="/signup"
                className="hover:text-gray-200 transition duration-200"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}