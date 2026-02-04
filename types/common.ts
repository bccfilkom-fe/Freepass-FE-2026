/**
 * Common utility types and interfaces
 */

// ==================== API ====================

export interface APIError extends Error {
  status: number;
  errors?: Record<string, string[]>;
}

export interface APIResponse<T> {
  data: T;
  message?: string;
}

// ==================== Component Props ====================

export interface BaseComponentProps {
  className?: string;
}

export interface LoadingProps {
  isLoading: boolean;
}

export interface ErrorProps {
  error: Error | null;
  onRetry?: () => void;
}

// ==================== Route Params ====================

export interface PageParams {
  params: Record<string, string>;
  searchParams?: Record<string, string | string[] | undefined>;
}

// ==================== Utility Types ====================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export type Nullable<T> = T | null;

export type AsyncFunction<T = void> = () => Promise<T>;
