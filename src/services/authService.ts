import axios from 'axios';
import { Magic } from 'magic-sdk';

export const authService = {
  async login(email: string) {
    const magic = new Magic(process.env.MAGIC_PUBLISHABLE_KEY!);
    const didToken = await magic.auth.loginWithMagicLink({ email });

    await axios.post(
      '/api/auth/login',
      { email },
      { headers: { Authorization: `Bearer ${didToken}` } }
    );
  },
  async logout() {
    await axios('/api/auth/logout');
  },
};
