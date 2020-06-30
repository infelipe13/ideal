import { Magic } from 'magic-sdk';

const MAGIC_PUBLISHABLE_KEY = process.env.MAGIC_PUBLISHABLE_KEY!;

if (!MAGIC_PUBLISHABLE_KEY) {
  // TODO: Log error.
}

export const authService = {
  async login(email: string) {
    const magic = new Magic(MAGIC_PUBLISHABLE_KEY);
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
