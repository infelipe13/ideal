import { Magic } from 'magic-sdk';

export const authService = {
  async login(email: string) {
    const magic = new Magic(process.env.MAGIC_PUBLISHABLE_KEY!);
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
  async logout() {
    await fetch('/api/auth/logout');
  },
};
