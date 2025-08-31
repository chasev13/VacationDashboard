import React, { useState, useEffect } from 'react';
import { Grid, Container, Button, Box, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Fade, Slide } from '@mui/material';
import VacationCard from './VacationCard';
import { vacations } from '../data/vacations';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';

function Dashboard() {
  const [vacationData, setVacationData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedVacation, setSelectedVacation] = useState(null);

  const sortVacations = (vacations) => {
    if (!vacations) return [];
    
    return vacations.sort((a, b) => {
      return new Date(a.startDate) - new Date(b.startDate);
    });
  };

  const handleOpenModal = (vacation) => {
    setSelectedVacation(vacation);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedVacation(null);
  };

  useEffect(() => {
    setVacationData(sortVacations(vacations));
  }, []);

  const { upcoming, past } = {
    upcoming: vacationData.filter(v => new Date(v.endDate) >= new Date()),
    past: vacationData.filter(v => new Date(v.endDate) < new Date())
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #00B4DB 0%, #0083B0 100%)',
      pt: 3,
      pb: 3,
      display: 'flex',
      flexDirection: 'column',
      '@keyframes fadeIn': {
        '0%': {
          opacity: 0,
        },
        '100%': {
          opacity: 1,
        },
      },
      animation: 'fadeIn 1s ease-in-out',
    }}>
      <Container maxWidth="lg">
        <Fade in timeout={1000}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ 
              mb: 4, 
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            Upcoming Vacations
          </Typography>
        </Fade>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          {upcoming.map((vacation, index) => (
            <Slide direction="up" in timeout={500 + index * 200} key={vacation.id}>
              <Grid item xs={12} md={4}>
                <VacationCard 
                  vacation={vacation} 
                  onClick={() => handleOpenModal(vacation)}
                />
              </Grid>
            </Slide>
          ))}
        </Grid>

        {past.length > 0 && (
          <>
            <Fade in timeout={1000}>
              <Typography 
                variant="h4" 
                component="h2" 
                gutterBottom 
                sx={{ 
                  mb: 4, 
                  mt: 6,
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}
              >
                Past Vacations
              </Typography>
            </Fade>

            <Grid container spacing={3} sx={{ mb: 6 }}>
              {past.map((vacation, index) => (
                <Slide direction="up" in timeout={500 + index * 200} key={vacation.id}>
                  <Grid item xs={12} md={4}>
                    <VacationCard 
                      vacation={vacation} 
                      onClick={() => handleOpenModal(vacation)}
                      isPast
                    />
                  </Grid>
                </Slide>
              ))}
            </Grid>
          </>
        )}

        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          maxWidth="sm"
          fullWidth
        >
          {selectedVacation && (
            <>
              <DialogTitle>{selectedVacation.destination}</DialogTitle>
              <DialogContent>
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {new Date(selectedVacation.startDate).toLocaleDateString()} - {new Date(selectedVacation.endDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {selectedVacation.description}
                  </Typography>

                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal}>Close</Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        <Slide direction="up" in timeout={1500}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3,
              backgroundColor: 'white',
              borderRadius: 2,
              mb: 4,
              transform: 'translateY(0)',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: 8,
              }
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2,
                textAlign: 'center',
                color: 'text.secondary'
              }}
            >
              Manage Your Bookings
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              gap: 2,
              flexWrap: 'wrap'
            }}>
              {[
                {
                  icon: <DirectionsBoatIcon />,
                  text: "Carnival Cruise Bookings",
                  color: "error",
                  href: "https://www.carnival.com/booked/home"
                },
                {
                  icon: <FlightIcon />,
                  text: "Southwest Flight Bookings",
                  color: "info",
                  href: "https://www.southwest.com/loyalty/myaccount/trips/upcoming"
                },
                {
                  icon: <HotelIcon />,
                  text: "Hyatt Hotel Bookings",
                  color: "primary",
                  href: "https://www.hyatt.com/profile/en-US/my-stays#upcoming-stays"
                }
              ].map((button, index) => (
                <Fade in timeout={2000 + index * 200} key={button.text}>
                  <Button
                    variant="contained"
                    color={button.color}
                    size="large"
                    startIcon={button.icon}
                    href={button.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ 
                      minWidth: 250,
                      py: 1.5,
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      }
                    }}
                  >
                    {button.text}
                  </Button>
                </Fade>
              ))}
            </Box>
          </Paper>
        </Slide>

        <Fade in timeout={2500}>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              textAlign: 'center',
              mt: 2,
              mb: 1
            }}
          >
            © Chase Vandiver
          </Typography>
        </Fade>
      </Container>
    </Box>
  );
}

export default Dashboard;
