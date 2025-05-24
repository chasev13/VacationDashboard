import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VacationCard from './VacationCard';

// Mock vacation data
const mockVacation = {
  id: 1,
  destination: 'Test Destination',
  startDate: '2025-01-01T00:00:00.000Z',
  endDate: '2025-01-05T00:00:00.000Z',
  description: 'Test Description',
  imageUrl: 'https://test-image.jpg'
};

describe('VacationCard Component', () => {
  test('renders vacation information correctly', () => {
    render(<VacationCard vacation={mockVacation} />);
    
    expect(screen.getByText('Test Destination')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByAltText('Test Destination')).toHaveAttribute('src', 'https://test-image.jpg');
  });

  test('displays correct date format', () => {
    render(<VacationCard vacation={mockVacation} />);
    
    // The date format will be locale-specific, so we'll check for the presence of both dates
    const dateText = screen.getByText(/12\/31\/2024.*1\/4\/2025/);
    expect(dateText).toBeInTheDocument();
  });

  test('shows countdown timer for future vacations', () => {
    const futureVacation = {
      ...mockVacation,
      startDate: new Date(Date.now() + 86400000).toISOString() // Tomorrow
    };
    
    render(<VacationCard vacation={futureVacation} />);
    
    expect(screen.getByText(/Time until departure:/)).toBeInTheDocument();
  });

  test('shows "Past" label for past vacations', () => {
    const pastVacation = {
      ...mockVacation,
      startDate: '2020-01-01T00:00:00.000Z',
      endDate: '2020-01-05T00:00:00.000Z'
    };
    
    render(<VacationCard vacation={pastVacation} isPast={true} />);
    
    expect(screen.getByText('Past')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<VacationCard vacation={mockVacation} onClick={handleClick} />);
    
    // Click the card itself since it's the clickable element
    fireEvent.click(screen.getByText('Test Destination').closest('.MuiCard-root'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies correct styles for past vacations', () => {
    const pastVacation = {
      ...mockVacation,
      startDate: '2020-01-01T00:00:00.000Z',
      endDate: '2020-01-05T00:00:00.000Z'
    };
    
    const { container } = render(<VacationCard vacation={pastVacation} isPast={true} />);
    const card = container.firstChild;
    
    expect(card).toHaveStyle({
      opacity: '0.8',
      filter: 'grayscale(30%)'
    });
  });
}); 