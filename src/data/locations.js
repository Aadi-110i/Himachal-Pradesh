// Centralized Himachal Heritage Data
import rumtekImg from '../assets/1.jpeg'; // Note: Rumtek is Sikkim but kept for backward compatibility if needed, though we focus on Himachal
import keyImg from '../assets/monastery_exterior.png';
import hadimbaImg from '../assets/temple_interior.png';
import rohtangImg from '../assets/3.jpeg';

export const locations = [
  {
    id: "key",
    name: "Key Monastery",
    loc: "Spiti Valley",
    category: "Monastery",
    x: 35,
    y: 30,
    lat: 32.298,
    lng: 78.012,
    img: keyImg,
    panorama: "https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=2000",
    description: "Key Gompa is a Tibetan Buddhist monastery located on top of a hill at an altitude of 4,166 metres above sea level in the Spiti Valley.",
    history: "Founded in the 11th century, it is the largest monastery in Spiti Valley and serves as a religious training centre for Lamas. It has survived numerous attacks from Mongols and other empires over centuries.",
    traditions: [
      "Annual Cham Dance (Masked Dance)",
      "Daily Morning Chants & Meditation",
      "Traditional Thangka Painting workshops",
      "Guhyasamaja Tantra rituals"
    ],
    elevation: "4,166m",
    bestVisit: "June - September"
  },
  {
    id: "hadimba",
    name: "Hadimba Devi Temple",
    loc: "Manali",
    category: "Temple",
    x: 42,
    y: 55,
    lat: 32.246,
    lng: 77.181,
    img: hadimbaImg,
    panorama: "https://images.unsplash.com/photo-1623492701902-47dc207df5dc?auto=format&fit=crop&q=80&w=2000",
    description: "An ancient cave temple dedicated to Hidimbi Devi, built in 1553 by Maharaja Bahadur Singh.",
    history: "The temple is built around a cave where Hidimbi Devi performed meditation. It is known for its exquisite four-tiered pagoda-style roof and intricately carved wooden doors.",
    traditions: [
      "Annual Saroohni Fair in May",
      "Traditional Himachali architecture rituals",
      "Local deity processions (Kullu Dussehra link)",
      "Sacred cedar forest preservation"
    ],
    elevation: "2,050m",
    bestVisit: "May - June & September - October"
  },
  {
    id: "rohtang",
    name: "Rohtang Pass",
    loc: "Manali",
    category: "Nature",
    x: 48,
    y: 42,
    lat: 32.371,
    lng: 77.246,
    img: rohtangImg,
    panorama: "https://images.unsplash.com/photo-1623492701902-47dc207df5dc?auto=format&fit=crop&q=80&w=2000",
    description: "A high mountain pass on the eastern Pir Panjal Range of the Himalayas around 51 km from Manali.",
    history: "Rohtang means 'pile of corpses', named so because of the high number of people who died trying to cross it in ancient times. It connects the Kullu Valley with the Lahaul and Spiti Valleys.",
    traditions: [
      "Sacred Beas Kund source rituals",
      "Himalayan border security culture",
      "High-altitude pastoralism heritage",
      "Summer mountain festivals"
    ],
    elevation: "3,978m",
    bestVisit: "May - November"
  },
  {
    id: "tabo",
    name: "Tabo Monastery",
    loc: "Lahaul & Spiti",
    category: "Monastery",
    x: 65,
    y: 35,
    lat: 32.091,
    lng: 78.381,
    img: "https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=400",
    panorama: "https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=2000",
    description: "Known as the 'Ajanta of the Himalayas', founded in 996 AD by the Tibetan Buddhist loṭsawa Rinchen Zangpo.",
    history: "It is the oldest continuously operating Buddhist enclave in India. The monastery is famous for its thousand-year-old murals and stucco sculptures that cover almost every wall.",
    traditions: [
      "Ancient Murals Preservation Rituals",
      "Kalachakra Tantra practice",
      "Monastic clay sculpture arts",
      "Spiritual library archive maintenance"
    ],
    elevation: "3,050m",
    bestVisit: "May - October"
  }
];

export const getLocationById = (id) => locations.find(l => l.id === id);
export const getRandomLocation = () => locations[Math.floor(Math.random() * locations.length)];
