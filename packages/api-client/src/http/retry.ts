export type RetryOptions = {
  maxRetries: number;
  baseDelayMs?: number;
  shouldRetry: (error: unknown) => boolean;
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function retry<T>(fn: () => Promise<T>, options: RetryOptions): Promise<T> {
  const base = options.baseDelayMs ?? 250;

  let attempt = 0;
  // attempt=0 is the initial call; retries happen after failures.
  while (true) {
    try {
      return await fn();
    } catch (error) {
      if (attempt >= options.maxRetries || !options.shouldRetry(error)) throw error;
      const delay = base * Math.pow(2, attempt);
      attempt += 1;
      await sleep(delay);
    }
  }
}

