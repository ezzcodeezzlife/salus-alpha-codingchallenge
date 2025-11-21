import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuickAmountButtons } from '../QuickAmountButtons';

describe('QuickAmountButtons', () => {
  it('should render all three quick amount buttons', () => {
    const mockOnSelect = vi.fn();
    render(<QuickAmountButtons onSelect={mockOnSelect} />);

    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('$1,000')).toBeInTheDocument();
    expect(screen.getByText('$10,000')).toBeInTheDocument();
  });

  it('should display "Quick Select" label', () => {
    const mockOnSelect = vi.fn();
    render(<QuickAmountButtons onSelect={mockOnSelect} />);

    expect(screen.getByText('Quick Select')).toBeInTheDocument();
  });

  it('should call onSelect with 100 when $100 button is clicked', () => {
    const mockOnSelect = vi.fn();
    render(<QuickAmountButtons onSelect={mockOnSelect} />);

    const button = screen.getByText('$100');
    fireEvent.click(button);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(100);
  });

  it('should call onSelect with 1000 when $1,000 button is clicked', () => {
    const mockOnSelect = vi.fn();
    render(<QuickAmountButtons onSelect={mockOnSelect} />);

    const button = screen.getByText('$1,000');
    fireEvent.click(button);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(1000);
  });

  it('should call onSelect with 10000 when $10,000 button is clicked', () => {
    const mockOnSelect = vi.fn();
    render(<QuickAmountButtons onSelect={mockOnSelect} />);

    const button = screen.getByText('$10,000');
    fireEvent.click(button);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(10000);
  });

  it('should render exactly 3 buttons', () => {
    const mockOnSelect = vi.fn();
    render(<QuickAmountButtons onSelect={mockOnSelect} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });

  it('should handle multiple clicks correctly', () => {
    const mockOnSelect = vi.fn();
    render(<QuickAmountButtons onSelect={mockOnSelect} />);

    const button100 = screen.getByText('$100');
    const button1000 = screen.getByText('$1,000');

    fireEvent.click(button100);
    fireEvent.click(button1000);
    fireEvent.click(button100);

    expect(mockOnSelect).toHaveBeenCalledTimes(3);
    expect(mockOnSelect).toHaveBeenNthCalledWith(1, 100);
    expect(mockOnSelect).toHaveBeenNthCalledWith(2, 1000);
    expect(mockOnSelect).toHaveBeenNthCalledWith(3, 100);
  });

  it('should format amounts with thousands separators', () => {
    const mockOnSelect = vi.fn();
    render(<QuickAmountButtons onSelect={mockOnSelect} />);

    // Check that large numbers are formatted with commas
    expect(screen.getByText('$1,000')).toBeInTheDocument();
    expect(screen.getByText('$10,000')).toBeInTheDocument();
  });
});

