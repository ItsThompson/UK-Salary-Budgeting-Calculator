import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BudgetForm } from './BudgetForm';
import type { BudgetRequest } from '../types';

describe('BudgetForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form with default values', () => {
    render(<BudgetForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByDisplayValue('50000')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
    expect(screen.getByText('Calculate Budget')).toBeInTheDocument();
  });

  it('calls onSubmit when form is submitted', async () => {
    const user = userEvent.setup();
    render(<BudgetForm onSubmit={mockOnSubmit} />);
    
    const submitButton = screen.getByText('Calculate Budget');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('shows loading state when isLoading is true', () => {
    render(<BudgetForm onSubmit={mockOnSubmit} isLoading={true} />);
    
    expect(screen.getByText('Calculating...')).toBeInTheDocument();
    const submitButton = screen.getByText('Calculating...');
    expect(submitButton).toBeDisabled();
  });

  it('updates form data when fields change', async () => {
    const user = userEvent.setup();
    render(<BudgetForm onSubmit={mockOnSubmit} />);
    
    const salaryInput = screen.getByDisplayValue('50000');
    await user.clear(salaryInput);
    await user.type(salaryInput, '60000');
    
    expect(screen.getByDisplayValue('60000')).toBeInTheDocument();
  });
});
