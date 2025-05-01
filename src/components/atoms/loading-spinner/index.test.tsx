import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import LoadingSpinner from './index';

describe('LoadingSpinner Component', () => {
  test('renders the spinner', () => {
    render(<LoadingSpinner />);

    // In Ant Design, LoadingOutlined has role="img" with aria-label="loading"
    const spinner = screen.getByRole('img', { name: 'loading' });
    expect(spinner).toBeInTheDocument();
  });

  test('accepts custom size prop', () => {
    render(<LoadingSpinner size={64} />);

    const spinner = screen.getByRole('img', { name: 'loading' });
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveStyle('font-size: 64px');
  });

  test('has large size class', () => {
    const { container } = render(<LoadingSpinner />);

    // Find the element with the large size class using the container
    const spinElement = container.querySelector('.ant-spin-lg');
    expect(spinElement).toBeInTheDocument();
    expect(spinElement).toHaveClass('ant-spin-lg');
  });
});
