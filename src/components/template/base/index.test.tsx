import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';
import Base from './index';

// Mock the Header and Footer components
vi.mock('@/components/organisms/header/', () => ({
  default: () => <div data-testid="mock-header">Header Component</div>,
}));

vi.mock('@/components/organisms/footer/', () => ({
  default: () => <div data-testid="mock-footer">Footer Component</div>,
}));

describe('Base Template Component', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui, { wrapper: BrowserRouter });
  };

  test('renders header component', () => {
    renderWithRouter(
      <Base>
        <div>Content</div>
      </Base>
    );

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });

  test('renders footer component', () => {
    renderWithRouter(
      <Base>
        <div>Content</div>
      </Base>
    );

    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  test('renders children content', () => {
    renderWithRouter(
      <Base>
        <div data-testid="test-content">Test Content</div>
      </Base>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('has the correct class name', () => {
    const { container } = renderWithRouter(
      <Base>
        <div>Content</div>
      </Base>
    );

    const baseElement = container.querySelector('.t-base');
    expect(baseElement).toBeInTheDocument();
  });
});
