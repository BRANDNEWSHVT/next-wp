"use client";

import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-[200px] items-center justify-center border border-neutral-200 bg-neutral-50 p-8">
            <div className="text-center">
              <p className="font-mono text-sm text-neutral-600">
                Something went wrong loading this section.
              </p>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="mt-4 border border-foreground px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors hover:bg-foreground hover:text-background"
              >
                Try Again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
