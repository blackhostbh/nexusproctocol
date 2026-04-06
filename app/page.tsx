'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { easeOut, easeInOut } from "framer-motion";

export default function Home() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  const fadeInUp = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
        delay: 0.2,
      },
    },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: easeInOut,
    },
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    }),
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <>
      {/* Hero Section */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-20 overflow-hidden"
      >
    
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div variants={fadeInUp}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100px" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mb-6 mx-auto lg:mx-0"
                />
                <h1 className="md:text-5xl text-4xl lg:text-7xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Welcome to
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    NEXUSPROTOCOL
                  </span>
                </h1>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
              >
                Experience the future of decentralized technology with our cutting-edge solutions.
                Join the revolution today and be part of something extraordinary.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.div
                  whileHover={buttonHover}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/solutions"
                    className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl  transition-all duration-300"
                  >
                    Get Started
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={buttonHover}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/about"
                    className="inline-block px-8 py-4 bg-white text-gray-800 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={fadeInUp}
                className="flex justify-center lg:justify-start gap-8 mt-12"
              >
                {[
                  { label: "Active Users", value: "10K+" },
                  { label: "Transactions", value: "$50M+" },
                  { label: "Countries", value: "50+" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold text-blue-600">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Content - Animated Image */}
            <motion.div
              variants={scaleIn}
              className="flex-1 relative"
              animate={floatingAnimation}
            >
              <div className="relative w-full h-96 lg:h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full filter blur-3xl opacity-20 animate-pulse" />
                <Image
                  src="/hero-illustration.png"
                  alt="Hero Illustration"
                  fill
                  className="object-contain relative z-10"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full filter blur-3xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.header>

      {/* Features Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                NEXUSPROTOCOL
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the features that make us the leading choice for decentralized solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Decentralized",
                description: "Fully decentralized infrastructure ensuring security and transparency",
                icon: "🔗",
              },
              {
                title: "Scalable",
                description: "Built to scale with your needs, handling millions of transactions",
                icon: "📈",
              },
              {
                title: "Secure",
                description: "Military-grade encryption and security protocols",
                icon: "🛡️",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                whileHover="hover"
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: i * 0.1, type: "spring" as const }}
                  className="text-5xl mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="py-20 bg-gradient-to-r from-blue-600 to-blue-500"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-white mb-4"
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
          >
            Join thousands of users already benefiting from our platform
          </motion.p>
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Contact Us Today
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}