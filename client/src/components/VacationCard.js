import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material';

function VacationCard({ vacation, onClick, isPast }) {
  const [timeLeft, setTimeLeft] = useState(null);

  const calculateTimeLeft = useCallback(() => {
    const difference = new Date(vacation.startDate).getTime() - new Date().getTime();
    
    // Only return null if the vacation is in the past
    if (difference < 0) {
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }, [vacation.startDate]);

  useEffect(() => {
    // Set initial time immediately
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        opacity: isPast ? 0.8 : 1,
        filter: isPast ? 'grayscale(30%)' : 'none',
        transition: 'all 0.3s ease'
      }}
      onClick={onClick}
    >
      {isPast && (
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '16px',
            zIndex: 1
          }}
        >
          <Typography variant="body2">
            Past
          </Typography>
        </Box>
      )}
      <img 
        src={vacation.imageUrl} 
        alt={vacation.destination}
        style={{ 
          width: '100%', 
          height: '200px', 
          objectFit: 'cover'
        }}
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          {vacation.destination}
        </Typography>
        <Typography color="textSecondary">
          {new Date(vacation.startDate).toLocaleDateString()} - 
          {new Date(vacation.endDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" component="p">
          {vacation.description}
        </Typography>
        {isPast ? (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" color="textSecondary">
              Completed
            </Typography>
          </Box>
        ) : timeLeft ? (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Time until departure:</Typography>
            <Typography>
              {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </Typography>
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Vacation in progress</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default VacationCard;
