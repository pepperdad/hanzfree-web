export const operationHourTable = [
  {
    method: 'Airport -> Accommodation',
    dropOff: '08:00 - 17:00',
    pickUp: 'Arrival by 22:00 on the same day',
  },
  {
    method: 'Accommodation -> Airport',
    dropOff: 'Before 11:00',
    pickUp: 'from 15:00 on the same day',
  },
  {
    method: 'Accommodation -> Accommodation',
    dropOff: 'Before 11:00',
    pickUp: 'Arrival by 22:00 on the same day',
  },
];

export const priceTable = [
  {
    luggageSize: '16 ≤ Luggage Size < 20 (inches)',
    airportToAccommodation: '10000won',
    accomodationToAirport: '10000won',
    accomodationToAccommodation: '10000won',
  },
  {
    luggageSize: '20 ≤ Luggage Size < 24 (inches)',
    airportToAccommodation: '10000won',
    accomodationToAirport: '10000won',
    accomodationToAccommodation: '15000won',
  },
  {
    luggageSize: '24 ≤ Luggage Size < 28 (inches)',
    airportToAccommodation: '20000won',
    accomodationToAirport: '20000won',
    accomodationToAccommodation: '15000won',
  },
  {
    luggageSize: '28(inches) ≤ Luggage Size',
    airportToAccommodation: '25000won',
    accomodationToAirport: '25000won',
    accomodationToAccommodation: '20000won',
  },
  {
    luggageSize: 'HandBag, Briefcase, Shopping Bag',
    airportToAccommodation: '10000won',
    accomodationToAirport: '10000won',
    accomodationToAccommodation: '10000won',
  },
  {
    luggageSize: 'Golf Bag',
    airportToAccommodation: '25000won',
    accomodationToAirport: '25000won',
    accomodationToAccommodation: '20000won',
  },
];

export const mustKnows = [
  {
    content:
      'Please upload photos of your luggage via the link provided in the personal message after making your reservation.',
  },
  {
    content:
      'Cancellations or changes to your reservation are free of charge until 20:00 the service day before, but fees may apply thereafter.',
  },
  {
    content:
      'Please use a lock on your bag. We are not be responsible for any lost items inside the bag due to the absence of a lock.',
  },
  {
    content: 'Always carry your passport, travel documents, and valuables with you.',
  },
];
