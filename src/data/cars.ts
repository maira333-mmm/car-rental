export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  pricePerDay: number;
  seats: number;
  transmission: 'Manual' | 'Automatic';
  fuelType: 'Petrol' | 'Diesel';
  category: 'luxury' | 'economy' | 'suv' | 'van';
  images: string[];
  features: string[];
  description: string;
}

export const cars: Car[] = [
  {
    id: 'luxury-1',
    name: 'Toyota 86 British Green Limited',
    brand: 'Toyota',
    model: '86 British Green Limited',
    year: 2019,
    pricePerDay: 200,
    seats: 2,
    transmission: 'Manual',
    fuelType: 'Petrol',
    category: 'luxury',
    images: ['/pic/toyo.jpg', '/pic/toyin.jpg', '/pic/to.jpg'],
    features: [
      'Bluetooth, premium sound, and touchscreen',
      'Responsive 2.0L engine for dynamic driving',
      'Sleek British Green sporty design',
      'Precision steering for a thrilling drive',
      'ABS, traction control, and airbags'
    ],
    description: 'Experience the thrill of driving with the Toyota 86 British Green Limited.'
  },
  {
    id: 'economy-1',
    name: 'Kia Rio 2018',
    brand: 'Kia',
    model: 'Rio',
    year: 2018,
    pricePerDay: 90,
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    category: 'economy',
    images: ['/pic/econo.jpg', '/pic/econ.jpg', '/pic/econo.jpg'],
    features: [
      'Apple CarPlay, Android Auto, and Bluetooth',
      '1.6L engine offering smooth and efficient performance',
      'Modern and sleek design with compact efficiency',
      'Responsive handling and precise steering',
      'Safety features include ABS, traction control, and airbags'
    ],
    description: 'The Kia Rio 2018 is the perfect economy car.'
  },
  {
    id: 'suv-1',
    name: 'Hyundai Palisade 2021',
    brand: 'Hyundai',
    model: 'Palisade',
    year: 2021,
    pricePerDay: 150,
    seats: 7,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    category: 'suv',
    images: ['/pic/s.jpg', '/pic/ss.jpg', '/pic/sss.jpg'],
    features: [
      'Apple CarPlay, Android Auto, and premium sound system',
      '3.8L V6 engine with 291 horsepower',
      'Stylish design with a spacious interior',
      'All-wheel drive with excellent handling',
      'Forward-collision warning and lane-keeping assist'
    ],
    description: 'The Hyundai Palisade 2021 offers luxury and space.'
  },
  {
    id: 'van-1',
    name: 'Mercedes-Benz Sprinter 2012',
    brand: 'Mercedes-Benz',
    model: 'Sprinter',
    year: 2012,
    pricePerDay: 100,
    seats: 12,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    category: 'van',
    images: ['/pic/v.jpg', '/pic/vv.jpg', '/pic/vvv.jpg'],
    features: [
      'Bluetooth connectivity, GPS navigation, rear-view camera',
      'Powerful V6 engine with excellent fuel efficiency',
      'Premium leather interior with climate control',
      'Ample legroom and luggage space',
      'Advanced airbags, ABS, and stability control'
    ],
    description: 'The Mercedes-Benz Sprinter 2012 is the ultimate passenger van.'
  }
];

export const getCarById = (id: string): Car | undefined => {
  return cars.find(car => car.id === id);
};

export const getCarsByCategory = (category: string): Car[] => {
  if (category === 'all') return cars;
  return cars.filter(car => car.category === category);
};