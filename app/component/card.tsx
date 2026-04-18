'use client';

import React from 'react';
import { motion } from 'framer-motion';

type CardProps = {
  name: string;
  description: string;
};

const Card = ({ name, description }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.05,
        y: -10,
        boxShadow: '0px 10px 25px rgba(59,130,246,0.4)',
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className='border-2 border-blue-400 p-5 w-full md:w-72 rounded-2xl shadow-md cursor-pointer '
    >
      <h1 className='font-bold uppercase text-lg mb-2'>{name}</h1>
      <p className='text-sm text-gray-600'>{description}</p>
    </motion.div>
  );
};

export default Card;