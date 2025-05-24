const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// vacation data if using non static website
const vacations = [
  {
    id: 1,
    destination: 'Las Vegas, Nevada',
    startDate: 'Jan 15 2025 00:00:00 GMT-0600',
    endDate: 'Jan 18 2025 00:00:00 GMT-0600',
    description: 'Stay at Flamingo Las Vegas',
    imageUrl: 'https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?w=800'
  },
  {
    id: 2,
    destination: 'Galveston - Western Caribbean',
    startDate: 'Feb 01 2025 00:00:00 GMT-0600',
    endDate: 'Feb 08 2025 00:00:00 GMT-0600',
    description: 'Cruise - Galveston to Western Caribbean',
    imageUrl: 'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=800'
  },
  {
    id: 3,
    destination: 'Cruise - Los Angeles to Hawaii',
    startDate: 'Mar 09 2025 00:00:00 GMT-0600',
    endDate: 'Mar 23 2025 00:00:00 GMT-0600',
    description: 'Hawaii Cruise',
    imageUrl: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?w=800'
  },
  {
    id: 4,
    destination: 'Cruise - Los Angeles to Baja Mexico',
    startDate: 'Dec 07 2025 00:00:00 GMT-0600',
    endDate: 'Dec 11 2025 00:00:00 GMT-0600',
    description: 'Visiting Ensenda and Catalina Island',
    imageUrl: 'https://images.fineartamerica.com/images-medium-large-5/ensenada-mexico-003-lance-vaughn.jpg'
  }
];

app.get('/api/vacations', (req, res) => {
  res.json(vacations);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});