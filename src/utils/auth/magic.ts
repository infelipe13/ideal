import { Magic } from '@magic-sdk/admin';

// Init Magic for the back-end.
export const magic = new Magic(process.env.MAGIC_SECRET_KEY);
