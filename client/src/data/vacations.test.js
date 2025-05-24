import { vacations } from './vacations';

describe('Vacations Data', () => {
  test('vacations array is not empty', () => {
    expect(vacations).toBeDefined();
    expect(Array.isArray(vacations)).toBe(true);
    expect(vacations.length).toBeGreaterThan(0);
  });

  test('each vacation has required properties', () => {
    vacations.forEach(vacation => {
      expect(vacation).toHaveProperty('id');
      expect(vacation).toHaveProperty('destination');
      expect(vacation).toHaveProperty('startDate');
      expect(vacation).toHaveProperty('endDate');
      expect(vacation).toHaveProperty('description');
      expect(vacation).toHaveProperty('imageUrl');
    });
  });

  test('vacation IDs are unique', () => {
    const ids = vacations.map(v => v.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  test('dates are in correct format', () => {
    vacations.forEach(vacation => {
      expect(new Date(vacation.startDate).toString()).not.toBe('Invalid Date');
      expect(new Date(vacation.endDate).toString()).not.toBe('Invalid Date');
    });
  });

  test('end dates are after start dates', () => {
    vacations.forEach(vacation => {
      const startDate = new Date(vacation.startDate);
      const endDate = new Date(vacation.endDate);
      expect(endDate.getTime()).toBeGreaterThan(startDate.getTime());
    });
  });

  test('image URLs are valid', () => {
    vacations.forEach(vacation => {
      expect(vacation.imageUrl).toMatch(/^https?:\/\/.+/);
    });
  });

  test('descriptions are not empty', () => {
    vacations.forEach(vacation => {
      expect(vacation.description.trim().length).toBeGreaterThan(0);
    });
  });

  test('destinations are not empty', () => {
    vacations.forEach(vacation => {
      expect(vacation.destination.trim().length).toBeGreaterThan(0);
    });
  });
}); 