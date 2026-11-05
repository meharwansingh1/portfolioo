/** Paths to the Bhujangyy site's own files. Kept separate from the portfolio's data on purpose. */
export const asset = (path: string) => (process.env.NEXT_PUBLIC_BASE_PATH || "") + path
