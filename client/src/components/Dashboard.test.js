import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard';
import { vacations } from '../data/vacations';

// Mock the vacations data
jest.mock('../data/vacations', () => ({
  vacations: [
    {
      id: 1,
      destination: 'Future Vacation',
      startDate: '2025-01-01T00:00:00.000Z',
      endDate: '2025-01-05T00:00:00.000Z',
      description: 'Future Description',
      imageUrl: 'https://future-image.jpg'
    },
    {
      id: 2,
      destination: 'Past Vacation',
      startDate: '2020-01-01T00:00:00.000Z',
      endDate: '2020-01-05T00:00:00.000Z',
      description: 'Past Description',
      imageUrl: 'https://past-image.jpg'
    }
  ]
}));

describe('Dashboard Component', () => {
  test('renders dashboard title', () => {
    render(<Dashboard />);
    expect(screen.getByText('Upcoming Vacations')).toBeInTheDocument();
  });

  test('separates vacations into upcoming and past sections', () => {
    render(<Dashboard />);
    
    // Check upcoming vacations section
    expect(screen.getByText('Future Vacation')).toBeInTheDocument();
    
    // Check past vacations section
    expect(screen.getByText('Past Vacation')).toBeInTheDocument();
  });

  test('opens modal when vacation card is clicked', async () => {
    render(<Dashboard />);
    
    // Click on a vacation card
    fireEvent.click(screen.getByText('Future Vacation'));
    
    // Check if modal content is displayed
    await waitFor(() => {
      const modalContent = screen.getAllByText('Future Description')[1]; // Get the second instance (modal content)
      expect(modalContent).toBeInTheDocument();
    });
  });

  test('closes modal when close button is clicked', async () => {
    render(<Dashboard />);
    
    // Open modal
    fireEvent.click(screen.getByText('Future Vacation'));
    
    // Verify modal is open
    await waitFor(() => {
      const modalContent = screen.getAllByText('Future Description')[1];
      expect(modalContent).toBeInTheDocument();
    });
    
    // Close modal
    fireEvent.click(screen.getByText('Close'));
    
    // Wait for modal to close and verify content is no longer visible
    await waitFor(() => {
      const modalContents = screen.getAllByText('Future Description');
      expect(modalContents.length).toBe(1); // Only the card content should remain
    });
  });

  test('renders booking management section', () => {
    render(<Dashboard />);
    
    expect(screen.getByText('Manage Your Bookings')).toBeInTheDocument();
    expect(screen.getByText('Carnival Cruise Bookings')).toBeInTheDocument();
    expect(screen.getByText('Southwest Flight Bookings')).toBeInTheDocument();
    expect(screen.getByText('Hyatt Hotel Bookings')).toBeInTheDocument();
  });

  test('booking buttons have correct links', () => {
    render(<Dashboard />);
    
    const cruiseButton = screen.getByText('Carnival Cruise Bookings').closest('a');
    const flightButton = screen.getByText('Southwest Flight Bookings').closest('a');
    const hotelButton = screen.getByText('Hyatt Hotel Bookings').closest('a');
    
    expect(cruiseButton).toHaveAttribute('href', 'https://www.carnival.com/booked/home');
    expect(flightButton).toHaveAttribute('href', 'https://www.southwest.com/loyalty/myaccount/trips/upcoming');
    expect(hotelButton).toHaveAttribute('href', 'https://www.hyatt.com/profile/en-US/my-stays#upcoming-stays');
  });

  test('renders copyright information', () => {
    render(<Dashboard />);
    expect(screen.getByText('© Chase Vandiver')).toBeInTheDocument();
  });
}); 