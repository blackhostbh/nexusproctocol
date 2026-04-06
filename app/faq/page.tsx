'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface TroubleshooterItem {
    title: string;
    description: string;
    category?: string;
}

export default function Troubleshooter() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);

    const troubleshooterItems: TroubleshooterItem[] = [
        { title: "SYNCHRONIZE", description: "Click here to synchronize your wallet data across multiple chains and networks.", category: "wallet" },
        { title: "MIGRATION", description: "Click here for migration or to resolve any migration related issues.", category: "transfer" },
        { title: "RECTIFICATION", description: "Click here to rectify all strange wallet issues.", category: "wallet" },
        { title: "CLAIM", description: "Click here to claim tokens or resolve any token claiming related issues.", category: "token" },
        { title: "SWAP", description: "Click here to swap tokens or resolve issues related to token swap.", category: "trading" },
        { title: "SLIPPAGE", description: "Click here for slippage or transaction fee related issues.", category: "trading" },
        { title: "CLAIM AIRDROP", description: "Click here to claim airdrop or resolve errors encountered during airdrop claim.", category: "token" },
        { title: "STAKING", description: "Click here to resolve issues encountered while staking/unstaking.", category: "defi" },
        { title: "WHITELIST", description: "Click here to whitelist your address or resolve whitelisting related error.", category: "wallet" },
        { title: "CROSS TRANSFER", description: "Click here to resolve cross bridging errors encountered during cross transfer.", category: "transfer" },
        { title: "NFTs", description: "Click here to resolve NFT related issues.", category: "nft" },
        { title: "LOCKED ACCOUNT", description: "Click here to resolve locked account or wallet stuck issues.", category: "wallet" },
        { title: "LOGIN ERROR", description: "Click here to resolve errors encountered during login.", category: "wallet" },
        { title: "WALLET GLITCH", description: "Click here to resolve wallet issues.", category: "wallet" },
        { title: "DEFI FARMING", description: "Click here for DeFi or Commercial farming related issues.", category: "defi" },
        { title: "VALIDATION", description: "Click here to validate your wallet via Multisig.", category: "wallet" },
        { title: "TRANSACTION DELAY", description: "Click here for any transaction related error.", category: "trading" },
        { title: "MISSING/IRREGULAR BALANCE", description: "Click here to recover lost or missing funds.", category: "wallet" },
        { title: "RECOVERY", description: "Click here for wallet recovery.", category: "wallet" },
        { title: "BUY TOKEN/COIN", description: "Click here to trade. Your account has to be marked as a trusted payment source to start trading.", category: "trading" },
        { title: "EXCHANGE", description: "Click here for token exchange or to resolve errors encountered during token exchange.", category: "trading" },
        { title: "BRIDGING", description: "Click here to bridge tokens or resolve bridging related issues.", category: "transfer" },
    ];

    const categories = [
        { id: 'all', name: 'All Issues', icon: '📋' },
        { id: 'wallet', name: 'Wallet', icon: '👛' },
        { id: 'trading', name: 'Trading', icon: '💱' },
        { id: 'token', name: 'Tokens', icon: '🪙' },
        { id: 'transfer', name: 'Transfer', icon: '🔄' },
        { id: 'defi', name: 'DeFi', icon: '🏦' },
        { id: 'nft', name: 'NFTs', icon: '🎨' },
    ];

    const filteredItems = selectedCategory === 'all' 
        ? troubleshooterItems 
        : troubleshooterItems.filter(item => item.category === selectedCategory);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0, scale: 0.95 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 12,
            },
        },
        exit: {
            y: -30,
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.2 },
        },
    };

    const headerVariants = {
        hidden: { y: -50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 15,
            },
        },
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
            transition: {
                type: "spring" as const,
                stiffness: 400,
                damping: 10,
            },
        },
        tap: { scale: 0.95 },
    };

    const cardVariants = {
        hover: {
            y: -8,
            scale: 1.02,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 20,
            },
        },
    };

    const categoryVariants = {
        hover: {
            scale: 1.05,
            transition: { type: "spring" as const, stiffness: 400 },
        },
        tap: { scale: 0.95 },
    };

    const floatingVariants = {
        animate: {
            y: [0, -10, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse" as const,
                ease: "easeInOut" as const,
            },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div
                className="fixed top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full filter blur-3xl"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            />
            <motion.div
                className="fixed bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full filter blur-3xl"
                animate={{
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 relative z-10">
                {/* Header Section */}
                <motion.div
                    variants={headerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-12"
                >
                    <div>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "80px" }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mb-4"
                        />
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
                            <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-blue-400 bg-clip-text text-transparent">
                                Troubleshooter
                            </span>
                        </h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-600 mt-2 text-sm sm:text-base"
                        >
                            Select an issue below to get started with resolution
                        </motion.p>
                    </div>
                    
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-2 mb-8"
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            variants={categoryVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                                selectedCategory === category.id
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                            }`}
                        >
                            <span>{category.icon}</span>
                            <span>{category.name}</span>
                            {selectedCategory === category.id && (
                                <motion.span
                                    layoutId="activeCategory"
                                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 -z-10"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring" as const, stiffness: 300 }}
                                />
                            )}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Stats Counter */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6 flex justify-between items-center"
                >
                    <p className="text-sm text-gray-600">
                        Showing <span className="text-blue-600 font-semibold">{filteredItems.length}</span> of {troubleshooterItems.length} issues
                    </p>
                    <motion.div
                        variants={floatingVariants}
                        animate="animate"
                        className="text-xs text-gray-500"
                    >
                        Need help? Select an issue →
                    </motion.div>
                </motion.div>

                {/* Troubleshooter Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                    >
                        {filteredItems.map((item, index) => (
                            <motion.button
                                key={item.title}
                                variants={itemVariants}
                                whileHover="hover"
                                onHoverStart={() => setHoveredItem(index)}
                                onHoverEnd={() => setHoveredItem(null)}
                                className="relative bg-white p-4 sm:p-6 rounded-xl text-left hover:shadow-xl transition-all duration-300 border border-gray-200 shadow-md overflow-hidden group"
                            >
                                {/* Animated gradient overlay */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-600/0"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "100%" }}
                                    transition={{ duration: 0.6 }}
                                />
                                
                                {/* Icon placeholder */}
                                <motion.div
                                    className="text-2xl mb-3"
                                    animate={hoveredItem === index ? { 
                                        rotate: [0, -10, 10, -5, 5, 0],
                                        scale: 1.1
                                    } : {}}
                                    transition={{ duration: 0.3 }}
                                >
                                    {item.title.includes("WALLET") && "👛"}
                                    {item.title.includes("SWAP") && "🔄"}
                                    {item.title.includes("CLAIM") && "🎁"}
                                    {item.title.includes("STAKE") && "⚡"}
                                    {item.title.includes("NFT") && "🎨"}
                                    {item.title.includes("TRANSACTION") && "⏱️"}
                                    {item.title.includes("RECOVERY") && "🔐"}
                                    {item.title.includes("BUY") && "💰"}
                                    {!item.title.match(/WALLET|SWAP|CLAIM|STAKE|NFT|TRANSACTION|RECOVERY|BUY/) && "🔧"}
                                </motion.div>

                                <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
                                    {item.description}
                                </p>
                                
                                {/* Hover arrow */}
                                <motion.div
                                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    initial={{ x: -10, opacity: 0 }}
                                    whileHover={{ x: 0, opacity: 1 }}
                                >
                                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </motion.div>

                                {/* Ripple effect on click */}
                                <motion.div
                                    className="absolute inset-0 rounded-xl bg-blue-500"
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileTap={{ scale: 2, opacity: 0.2 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.button>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Footer Message */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 text-center"
                >
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                        <p className="text-gray-700 text-sm sm:text-base">
                            ⚡ Can't find your issue? Contact our support team for immediate assistance
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-4"
                        >
                            <Link
                                href="/contact"
                                className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg text-white font-semibold text-sm hover:shadow-lg transition-all duration-300"
                            >
                                Contact Support
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}