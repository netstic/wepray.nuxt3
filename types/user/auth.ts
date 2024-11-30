export const validAuthProviders = ['google', 'facebook'] as const;
export type TAuthProvider = (typeof validAuthProviders)[number];
