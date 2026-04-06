'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface HeroProps {
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    showButtons?: boolean;
    gradientFrom?: string;
    gradientTo?: string;
    animationDelay?: number;
}

const Hero = ({ 
    title = "NEXUSPROTOCOL",
    subtitle = "Experience the future of decentralized technology with our cutting-edge solutions",
    ctaText = "Get Started",
    ctaLink = "/solutions",
    secondaryCtaText = "Learn More",
    secondaryCtaLink = "/about",
    showButtons = true,
    gradientFrom = "from-blue-600",
    gradientTo = "to-blue-400",
    animationDelay = 0
}: HeroProps) => {
    
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: animationDelay,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 12,
            },
        },
    };

    const textRevealVariants = {
        hidden: { 
            clipPath: "inset(0 100% 0 0)",
            opacity: 0 
        },
        visible: {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: animationDelay,
            },
        },
    };

    const floatingAnimation = {
        y: [0, -20, 0],
    };

    const floatingTransition = {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: [0.42, 0, 0.58, 1],
    };

    const buttonHover = {
        scale: 1.05,
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
        transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 10,
        },
    };

    const letterVariants = {
        hidden: { y: 100, opacity: 0, rotateX: -90 },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            rotateX: 0,
            transition: {
                delay: i * 0.05,
                type: "spring" as const,
                stiffness: 200,
                damping: 15,
            },
        }),
    };

    // Split title into characters for letter animation
    const titleChars = title.split('');

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="min-h-screen flex items-center justify-center relative overflow-hidden"
        >
            {/* Animated Background Elements */}
            <motion.div
                className="absolute top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full filter blur-3xl"
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
                className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full filter blur-3xl"
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
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/5 to-blue-600/5 rounded-full filter blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            />

            <div className="container mx-auto px-4 text-center relative z-10">
                {/* Animated Title with Letter Reveal */}
                <motion.div className="mb-6 overflow-hidden">
                    <div className="flex flex-wrap justify-center gap-1 md:gap-2">
                        {titleChars.map((char, index) => (
                            <motion.span
                                key={index}
                                custom={index}
                                variants={letterVariants}
                                className={`text-4xl md:text-7xl lg:text-8xl font-bold inline-block bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}
                                style={{ display: 'inline-block' }}
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* Underline Animation */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100px", opacity: 1 }}
                    transition={{ duration: 0.8, delay: animationDelay + 0.5 }}
                    className="h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto mb-8"
                />

                {/* Subtitle */}
                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 px-4"
                >
                    {subtitle}
                </motion.p>

                {/* CTA Buttons */}
                {showButtons && (
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <motion.div
                            whileHover={buttonHover}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href={ctaLink}
                                className="inline-block px-8 py-3 md:px-10 md:py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-base md:text-lg"
                            >
                                {ctaText}
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={buttonHover}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href={secondaryCtaLink}
                                className="inline-block px-8 py-3 md:px-10 md:py-4 bg-white text-gray-800 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 text-base md:text-lg"
                            >
                                {secondaryCtaText}
                            </Link>
                        </motion.div>
                    </motion.div>
                )}

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: animationDelay + 1, duration: 0.8 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={floatingAnimation}
                        // transition={floatingTransition}
                        className="cursor-pointer"
                        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                    >
                        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                            <motion.div
                                animate={{
                                    y: [0, 12, 0],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                }}
                                className="w-1 h-2 bg-blue-500 rounded-full mt-2"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

// Alternative simpler version without letter animation
export const SimpleHero = ({ 
    title = "NEXUSPROTOCOL",
    subtitle = "Experience the future of decentralized technology",
    showButtons = true,
}: HeroProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="h-screen text-center flex flex-col items-center justify-center"
        >
            <motion.h1
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="md:text-xl text-xl font-bold mb-4"
            >
                <span className={`bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent`}>
                    {title}
                </span>
            </motion.h1>
            
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mb-6"
            />
            
            {subtitle && (
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 max-w-2xl mx-auto px-4 mb-8"
                >
                    {subtitle}
                </motion.p>
            )}
            
            {showButtons && (
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex gap-4"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        Get Started
                    </motion.button>
                </motion.div>
            )}
        </motion.div>
    );
};

// Export both versions
export { Hero };
export default Hero;