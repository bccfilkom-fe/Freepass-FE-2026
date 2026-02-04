'use client';

import { ProgressProvider } from '@bprogress/next/app';
import { Bar, Progress } from '@bprogress/next';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider
      height="4px"
      options={{ showSpinner: false, template: null }}
      shallowRouting
    >
      <Progress>
        <Bar className="absolute bottom-0 top-auto !bg-foreground" />
      </Progress>
      {children}
    </ProgressProvider>
  );
};

export default Providers;