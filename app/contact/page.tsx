// app/contact/page.tsx

'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSubmitStatus('idle'), 5000);
        }, 1500);
    };

    // Animation variants (correctly typed)
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 30, opacity: 0 },
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

    const fadeInUp: Variants = {
        hidden: { y: 60, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.42, 0, 0.58, 1], // cubic bezier for "easeOut"
            },
        },
    };

    // Hover animations (plain objects, not variants)
    const cardHover = {
        y: -5,
        transition: { type: "spring" as const, stiffness: 300 },
    };

    const buttonHover = {
        scale: 1.02,
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
        transition: { type: "spring" as const, stiffness: 400, damping: 10 },
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
                {/* Header Section */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="text-center mb-12 sm:mb-16"
                >
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "80px" }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto mb-6"
                    />
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
                    >
                        <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-blue-400 bg-clip-text text-transparent">
                            Contact Us
                        </span>
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
                    >
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </motion.p>
                </motion.div>

                {/* Contact Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
                >
                    {/* Contact Information */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>

                            <div className="space-y-6">
                                {/* Address */}
                                <motion.div
                                    whileHover={cardHover}
                                    className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:shadow-md transition-all duration-300"
                                >
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">Visit Us</h3>
                                        <p className="text-gray-600 text-sm">
                                            123 Blockchain Avenue<br />
                                            Silicon Valley, CA 94025<br />
                                            United States
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Email */}
                                <motion.div
                                    whileHover={cardHover}
                                    className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:shadow-md transition-all duration-300"
                                >
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">Email Us</h3>
                                        <p className="text-gray-600 text-sm">
                                            support@nexusprotocol.com<br />
                                            partners@nexusprotocol.com
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Phone */}
                                <motion.div
                                    whileHover={cardHover}
                                    className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:shadow-md transition-all duration-300"
                                >
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">Call Us</h3>
                                        <p className="text-gray-600 text-sm">
                                            +1 (555) 123-4567<br />
                                            Mon-Fri, 9am-6pm PST
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h3>
                            <div className="flex gap-4">
                                {[
                                    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
                                    { name: 'Telegram', icon: '📱', url: 'https://telegram.org' },
                                    { name: 'Discord', icon: '💬', url: 'https://discord.com' },
                                    { name: 'GitHub', icon: '🐙', url: 'https://github.com' },
                                ].map((social) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -3 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-12 h-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full flex items-center justify-center text-2xl hover:shadow-lg transition-all duration-300"
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <motion.input
                                        whileFocus={{ scale: 1.01, boxShadow: "0 0 0 3px rgba(59,130,246,0.1)" }}
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <motion.input
                                        whileFocus={{ scale: 1.01, boxShadow: "0 0 0 3px rgba(59,130,246,0.1)" }}
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject *
                                    </label>
                                    <motion.select
                                        whileFocus={{ scale: 1.01 }}
                                        id="subject"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="support">Technical Support</option>
                                        <option value="partnership">Partnership Opportunity</option>
                                        <option value="feedback">Feedback</option>
                                    </motion.select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <motion.textarea
                                        whileFocus={{ scale: 1.01 }}
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none resize-none"
                                        placeholder="Tell us how we can help..."
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={buttonHover}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
                                        isSubmitting
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-lg'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </div>
                                    ) : (
                                        'Send Message'
                                    )}
                                </motion.button>

                                {/* Status Messages */}
                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm"
                                    >
                                        ✅ Message sent successfully! We'll get back to you soon.
                                    </motion.div>
                                )}
                                {submitStatus === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                                    >
                                        ❌ Something went wrong. Please try again later.
                                    </motion.div>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Map Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-16"
                >
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800">Find Us Here</h3>
                        </div>
                        <div className="relative h-96 bg-gray-100">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.332408834092!2d-122.08424968469482!3d37.42206597982545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba02425dad8f%3A0x6c296c66619367e0!2sGoogleplex!5e0!3m2!1sen!2sus!4v1644262071840!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                title="Office Location"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* FAQ Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-600">
                        Frequently asked questions?{' '}
                        <Link href="/faq" className="text-blue-600 hover:text-blue-700 font-semibold underline transition-colors">
                            Visit our FAQ page
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactPage;