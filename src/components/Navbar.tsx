import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, LogOut, Heart, Package, ChevronDown, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    navigate('/');
  };

  // Prevent scrolling when menu is open
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 md:space-x-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white font-black text-xl md:text-2xl shadow-lg shadow-orange-500/30 group-hover:rotate-6 transition-all duration-300">
              F
            </div>
            <span className="text-xl md:text-2xl font-black text-gray-900 tracking-tighter group-hover:text-orange-500 transition-colors duration-300">
              Foodie<span className="text-orange-500 group-hover:text-gray-900 transition-colors duration-300">Express</span>
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-12">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-14 pr-6 py-3.5 border-2 border-gray-50 rounded-2xl bg-gray-50 text-sm font-bold placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-orange-500/30 focus:bg-white transition-all shadow-sm"
                placeholder="Search for food, groceries, tech..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1 md:space-x-6">
            <Link to="/cart" className="relative p-2 md:p-3 text-gray-600 hover:text-orange-500 hover:bg-gray-50 rounded-2xl transition-all">
              <ShoppingCart className="h-6 w-6 md:h-7 md:w-7" />
              {totalItems > 0 && (
                <span className="absolute top-1.5 right-1.5 md:top-2 md:right-2 inline-flex items-center justify-center px-2 py-1 text-[10px] font-black leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-orange-500 rounded-full border-2 border-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 p-1.5 pr-4 rounded-2xl hover:bg-gray-50 border-2 border-transparent hover:border-gray-100 transition-all"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden shadow-sm">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                  <span className="text-sm font-black text-gray-900 hidden lg:block tracking-tight">{user?.name}</span>
                  <ChevronDown className="h-4 w-4 text-gray-400 hidden lg:block" />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-gray-50 mb-1">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Account</p>
                        <p className="text-sm font-black text-gray-900 truncate">{user?.email}</p>
                      </div>
                      <Link to="/profile" className="flex items-center px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                        <User className="h-4 w-4 mr-3" /> Profile
                      </Link>
                      <Link to="/orders" className="flex items-center px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                        <Package className="h-4 w-4 mr-3" /> My Orders
                      </Link>
                      <Link to="/wishlist" className="flex items-center px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                        <Heart className="h-4 w-4 mr-3" /> Wishlist
                      </Link>
                      <Link to="/settings" className="flex items-center px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                        <Settings className="h-4 w-4 mr-3" /> Settings
                      </Link>
                      <hr className="my-2 border-gray-50" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-3" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-gray-900 text-white px-5 md:px-8 py-2.5 md:py-3 rounded-2xl text-xs md:text-sm font-black hover:bg-orange-500 transition-all shadow-xl shadow-black/10"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-orange-500 transition-colors"
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

    </nav>
    {/* Mobile Menu - Moved outside nav to avoid filter/transform issues */}
    <AnimatePresence>
      {isMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 w-full h-[100dvh] bg-white z-[100] flex flex-col overflow-hidden"
          >
            <div className="p-6 flex justify-between items-center border-b border-gray-100 bg-white shrink-0">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-500/20">
                  F
                </div>
                <span className="text-xl font-black text-gray-900 tracking-tighter">
                  Foodie<span className="text-orange-500">Express</span>
                </span>
              </Link>
              <button 
                onClick={() => setIsMenuOpen(false)} 
                className="p-2.5 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-xl transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-8 px-6 space-y-8 bg-white pb-32">
              {isAuthenticated && (
                <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-[32px] flex items-center space-x-4 border border-orange-100">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-xl border-2 border-white shrink-0">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="h-8 w-8 text-orange-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xl font-black text-gray-900 truncate tracking-tight leading-none mb-1">{user?.name || 'User Account'}</p>
                    <p className="text-xs font-bold text-orange-600/70 truncate uppercase tracking-widest">{user?.email}</p>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for anything..."
                    className="w-full pl-12 pr-4 py-4.5 bg-gray-50 border-2 border-transparent focus:border-orange-500/20 rounded-2xl text-sm font-bold transition-all"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Explore Categories</p>
                <div className="grid grid-cols-1 gap-3">
                  <Link to="/category/Food" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between p-4 bg-orange-50/50 hover:bg-orange-50 rounded-2xl transition-all group">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-orange-500/20">
                        <ShoppingCart className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-black text-gray-900">Food Delivery</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-orange-400 -rotate-90" />
                  </Link>
                  <Link to="/category/Grocery" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between p-4 bg-green-50/50 hover:bg-green-50 rounded-2xl transition-all group">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-green-500/20">
                        <Package className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-black text-gray-900">Groceries</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-green-400 -rotate-90" />
                  </Link>
                  <Link to="/category/Electronics" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between p-4 bg-blue-50/50 hover:bg-blue-50 rounded-2xl transition-all group">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-blue-500/20">
                        <Search className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-black text-gray-900">Electronics</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-blue-400 -rotate-90" />
                  </Link>
                  <Link to="/category/Bakery" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between p-4 bg-yellow-50/50 hover:bg-yellow-50 rounded-2xl transition-all group">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-yellow-500/20">
                        <ShoppingCart className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-black text-gray-900">Bakery & Sweets</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-yellow-400 -rotate-90" />
                  </Link>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-50">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">My Account</p>
                {isAuthenticated ? (
                  <div className="grid grid-cols-1 gap-2">
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center px-4 py-4 text-base font-bold text-gray-700 hover:bg-gray-50 rounded-2xl transition-all">
                      <User className="h-5 w-5 mr-4 text-gray-400" /> Profile Settings
                    </Link>
                    <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="flex items-center px-4 py-4 text-base font-bold text-gray-700 hover:bg-gray-50 rounded-2xl transition-all">
                      <Package className="h-5 w-5 mr-4 text-gray-400" /> Order History
                    </Link>
                    <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="flex items-center px-4 py-4 text-base font-bold text-gray-700 hover:bg-gray-50 rounded-2xl transition-all">
                      <Heart className="h-5 w-5 mr-4 text-gray-400" /> My Wishlist
                    </Link>
                    <button onClick={handleLogout} className="flex items-center w-full px-4 py-4 text-base font-bold text-red-600 hover:bg-red-50 rounded-2xl transition-all mt-2">
                      <LogOut className="h-5 w-5 mr-4" /> Sign Out
                    </button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center w-full py-5 bg-gray-900 text-white rounded-[24px] font-black text-lg shadow-xl shadow-black/10">
                    Login / Register
                  </Link>
                )}
              </div>
            </div>

            <div className="p-8 border-t border-gray-50 bg-white shrink-0">
              <button className="w-full bg-orange-500 text-white py-5 rounded-[24px] font-black text-lg shadow-2xl shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Download Mobile App
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
};

export default Navbar;
