import { Magic } from 'magic-sdk';

export const authService = {
  login: async (email: string) => {
    const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY!);
    const didToken = await magic.auth.loginWithMagicLink({ email });

    await fetch('/api/auth/login', {
      body: JSON.stringify({ email }),
      headers: {
        Authorization: `Bearer ${didToken}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  },
  logout: async () => await fetch('/api/auth/logout'),
};
