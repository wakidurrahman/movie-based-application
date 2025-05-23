import { Alert, Button } from 'antd';
import { Component, ErrorInfo, ReactNode } from 'react';
import './index.scss';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service

    this.setState({
      error,
      errorInfo,
    });
  }

  private handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="o-error-boundary">
          <Alert
            message="Something went wrong"
            description={
              <>
                <p>{this.state.error?.toString() || 'An unexpected error occurred'}</p>
                {this.state.errorInfo && (
                  <details className="o-error-boundary__details">
                    {this.state.errorInfo.componentStack}
                  </details>
                )}
                <Button
                  type="primary"
                  onClick={this.handleReset}
                  className="o-error-boundary__reset-button"
                >
                  Try again
                </Button>
              </>
            }
            type="error"
            showIcon
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
