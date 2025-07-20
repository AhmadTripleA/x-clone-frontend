'use client';

import { useUserAuth } from '@/contexts/UserAuthContext';

export default function manWhatTheFuck() {
  const { user, updateUser } = useUserAuth();

  function setUsername(val: string){
    updateUser({username: val});
  }
  function setPassword(val: string){
    updateUser({username: val});
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form className="space-y-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold">Login</h1>

        <div>
          <label className="block mb-1 text-sm font-medium">Username</label>
          <input
            type="text"
            className="w-full rounded border p-2"
            value={'X'}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full rounded border p-2"
            value={'***'}
            required
            onChange={(e) => setPassword(e.target.value)}
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
