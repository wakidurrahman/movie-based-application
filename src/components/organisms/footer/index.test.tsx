import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Footer from './index';

describe('Footer Component', () => {
  test('renders footer with current year', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear().toString();
    const footerText = screen.getByText(
      content => content.includes('Movies App') && content.includes(currentYear)
    );

    expect(footerText).toBeInTheDocument();
  });

  test('renders with correct class', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('.o-footer');

    expect(footer).toBeInTheDocument();
  });

  test('includes movie emoji in the footer', () => {
    render(<Footer />);

    const footerContent = screen.getByText(/🎬/);
    expect(footerContent).toBeInTheDocument();
  });
});
