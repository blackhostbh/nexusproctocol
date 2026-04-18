'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
    name: string;
    href: string;
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState<boolean>(false);
    const pathname = usePathname();

    const navigation: NavItem[] = [
        // { name: 'home', href: '/' },
        { name: 'Troubleshooter', href: '/troubleshooter' },

        { name: 'Faq', href: '/faq' },
        { name: 'Contact', href: '/contact' },
    ];

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        // Prevent scrolling when sidebar is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string): boolean => pathname === path;

    const closeSidebar = () => setIsOpen(false);

    // Animation variants
    const navVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 20,
                duration: 0.5
            }
        }
    };

    const logoVariants = {
        hover: {
            scale: 1.05,
            transition: { type: "spring" as const, stiffness: 400, damping: 10 }
        },
        tap: { scale: 0.95 }
    };

    const navItemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                type: "spring" as const,
                stiffness: 200,
                damping: 15
            }
        }),
        hover: {
            y: -2,
            transition: { type: "spring" as const, stiffness: 300 }
        }
    };

    const sidebarVariants = {
        hidden: { x: "100%" },
        visible: {
            x: 0,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 30,
                duration: 0.3
            }
        },
        exit: {
            x: "100%",
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 30,
                duration: 0.3
            }
        }
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 0.5,
            transition: { duration: 0.3 }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.3 }
        }
    };

    const sidebarItemVariants = {
        hidden: { x: 50, opacity: 0 },
        visible: (i: number) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: i * 0.05,
                type: "spring" as const,
                stiffness: 200,
                damping: 20
            }
        }),
        hover: {
            x: 5,
            transition: { type: "spring" as const, stiffness: 400 }
        }
    };

    const mobileButtonVariants = {
        tap: { scale: 0.9 },
        hover: { scale: 1.05 }
    };

    if (!isMounted) {
        return null; // Prevent hydration issues
    }

    return (
        <>
            <motion.nav
                initial="hidden"
                animate="visible"
                variants={navVariants}
                className={`fixed w-full z-40 transition-all duration-300 ${scrolled
                        ? 'bg-white/90 backdrop-blur-lg shadow-xl'
                        : 'bg-white shadow-lg'
                    }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <motion.div
                            variants={logoVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <Link href="/" className="flex items-center space-x-2">
                                <motion.h2
                                    className="text-xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    NEXUSPROTOCOL
                                </motion.h2>
                            </Link>
                        </motion.div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-8">
                            {navigation.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    custom={i}
                                    initial="hidden"
                                    animate="visible"
                                    variants={navItemVariants}
                                    whileHover="hover"
                                >
                                    <Link
                                        href={item.href}
                                        className={`relative px-3 py-2 text-sm font-medium transition duration-300 ${isActive(item.href)
                                                ? 'text-blue-600'
                                                : 'text-gray-600 hover:text-blue-600'
                                            }`}
                                    >
                                        {item.name}
                                        {isActive(item.href) && (
                                            <motion.div
                                                layoutId="activeIndicator"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Desktop Right Section */}
                        <motion.div
                            className="hidden md:flex items-center space-x-4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    href="/walletconnect"
                                    className="relative px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
                                >
                                    <span className="relative z-10">Connect Wallet</span>
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600"
                                        initial={{ x: "100%" }}
                                        whileHover={{ x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            onClick={() => setIsOpen(true)}
                            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none"
                            aria-label="Open menu"
                            variants={mobileButtonVariants}
                            whileTap="tap"
                            whileHover="hover"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Overlay with Animation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black z-50"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={closeSidebar}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar - Right to Left with Animation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed top-0 right-0 bg-gradient-to-br from-gray-900 to-gray-800 h-full w-80 shadow-2xl z-50"
                        variants={sidebarVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="p-4 relative h-full">
                            {/* Close Button */}
                            <motion.button
                                onClick={closeSidebar}
                                className="absolute top-4 left-4 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                                aria-label="Close menu"
                                whileHover={{ rotate: 90, scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </motion.button>

                            {/* Sidebar Header */}
                            <motion.div
                                className="mt-12 mb-8"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                    Menu
                                </h2>
                            </motion.div>

                            {/* Navigation Links */}
                            <div className="space-y-3">
                                {navigation.map((item, i) => (
                                    <motion.div
                                        key={item.name}
                                        custom={i}
                                        variants={sidebarItemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover="hover"
                                    >
                                        <Link
                                            href={item.href}
                                            className={`${isActive(item.href)
                                                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg'
                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                                } block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300`}
                                            onClick={closeSidebar}
                                        >
                                            <motion.span
                                                className="block"
                                                whileHover={{ x: 5 }}
                                            >
                                                {item.name}
                                            </motion.span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Divider */}
                            <motion.div
                                className="border-t border-gray-700 my-6"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.3 }}
                            />

                            {/* Auth Links */}
                            <motion.div
                                className="space-y-3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Link
                                        href="/walletconnect"
                                        className="block px-4 py-3 text-center text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                                        onClick={closeSidebar}
                                    >
                                        Connect Wallet
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}