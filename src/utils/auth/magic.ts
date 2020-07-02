import { Magic } from '@magic-sdk/admin';

const MAGIC_SECRET_KEY = process.env.MAGIC_SECRET_KEY;

// Init Magic for the back-end.
export const magic = new Magic(MAGIC_SECRET_KEY);
