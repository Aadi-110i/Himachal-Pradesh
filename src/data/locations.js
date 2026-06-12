// Centralized Himachal Heritage Data
import rumtekImg from '../assets/1.jpeg'; 
import keyImg from '../assets/monastery_exterior.png';
import hadimbaImg from '../assets/temple_interior.png';
import rohtangImg from '../assets/3.jpeg';

// 360 Panoramas
import key360 from '../assets/monetry360.png';
import hadimba360 from '../assets/temple.png';
import stadium360 from '../assets/dharashalastadium.png';
import rohtang360 from '../assets/moqshss4.png';

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
    panorama: key360,
    description: "Key Gompa is a Tibetan Buddhist monastery located on top of a hill at an altitude of 4,166 metres above sea level in the Spiti Valley.",
    history: "Founded in the 11th century, it is the largest monastery in Spiti Valley and serves as a religious training centre for Lamas.",
    traditions: [
      "Annual Cham Dance (Masked Dance)",
      "Daily Morning Chants & Meditation",
      "Traditional Thangka Painting"
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
    panorama: hadimba360,
    description: "An ancient cave temple dedicated to Hidimbi Devi, built in 1553 by Maharaja Bahadur Singh.",
    history: "The temple is built around a cave where Hidimbi Devi performed meditation. It is known for its exquisite four-tiered pagoda-style roof.",
    traditions: [
      "Annual Saroohni Fair in May",
      "Sacred cedar forest preservation"
    ],
    elevation: "2,050m",
    bestVisit: "May - June"
  },
  {
    id: "stadium",
    name: "HPCA Stadium",
    loc: "Dharamshala",
    category: "Nature",
    x: 22,
    y: 62,
    lat: 32.197,
    lng: 76.325,
    img: stadium360,
    panorama: stadium360,
    description: "The Himachal Pradesh Cricket Association Stadium is one of the most beautiful cricket grounds in the world, set against the Dhauladhar range.",
    history: "Established in 2003, it is the first stadium in India to use rye grass, which prevents the grass from dying in cold temperatures.",
    traditions: [
      "International Cricket Matches",
      "Himalayan Sports Culture"
    ],
    elevation: "1,457m",
    bestVisit: "March - June & September - November"
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
    panorama: rohtang360,
    description: "A high mountain pass on the eastern Pir Panjal Range of the Himalayas connecting Kullu with Lahaul.",
    elevation: "3,978m",
    bestVisit: "May - November"
  }
];

export const getLocationById = (id) => locations.find(l => l.id === id);
export const getRandomLocation = () => locations[Math.floor(Math.random() * locations.length)];
