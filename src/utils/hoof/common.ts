import env from "#src/constants/env/index.ts";

export const RETRY_COUNT = env.DEV ? 1 : 10;
