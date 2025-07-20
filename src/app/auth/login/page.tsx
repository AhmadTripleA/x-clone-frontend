'use client';

import { useState } from 'react';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useUserAuth } from '@/contexts/UserAuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { updateUser } = useUserAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post(
        '/auth/login',
        { username, password },
      );

      const { accessToken } = response.data;

      // Store access token in memory/localStorage if needed
      localStorage.setItem('accessToken', accessToken);

      if (response.data.success == true) {
        // Redirect or update UI
        updateUser(response.data.user);

        router.push('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={handleLogin} className="space-y-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold">Login</h1>

        {error && <div className="text-red-500">{error}</div>}

        <div>
          <label className="block mb-1 text-sm font-medium">Username</label>
          <input
            type="text"
            className="w-full rounded border p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full rounded border p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
