'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  Brain,
  Bell,
  Search
} from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Models', href: '/models' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Pricing', href: '/pricing' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">ModelVerse</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-dark-300 hover:text-white transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors duration-200">
              <Search className="w-5 h-5 text-dark-400" />
            </button>

            {/* Notifications */}
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors duration-200 relative">
              <Bell className="w-5 h-5 text-dark-400" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <ChevronDown className="w-4 h-4 text-dark-400" />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-dark-800 border border-dark-700 rounded-lg shadow-lg py-2"
                  >
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-dark-300 hover:text-white hover:bg-dark-700 transition-colors duration-200"
                    >
                      <User className="w-4 h-4 mr-3" />
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center px-4 py-2 text-dark-300 hover:text-white hover:bg-dark-700 transition-colors duration-200"
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </Link>
                    <hr className="border-dark-700 my-2" />
                    <button className="flex items-center w-full px-4 py-2 text-dark-300 hover:text-white hover:bg-dark-700 transition-colors duration-200">
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-dark-400" />
              ) : (
                <Menu className="w-5 h-5 text-dark-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-dark-700 py-4"
            >
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-dark-300 hover:text-white transition-colors duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <hr className="border-dark-700" />
                <div className="flex items-center space-x-4">
                  <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors duration-200">
                    <Search className="w-5 h-5 text-dark-400" />
                  </button>
                  <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors duration-200 relative">
                    <Bell className="w-5 h-5 text-dark-400" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full"></span>
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
