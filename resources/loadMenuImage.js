import mainDish from '../assets/mainDish.jpg';
import mainDish2 from '../assets/mainDish2.jpg';
import sideDish from '../assets/sideDish.jpg';
import sideDish2 from '../assets/sideDish2.jpg';
import drink from '../assets/drink.jpg';
import wine from '../assets/wine.jpg';
import appetizer from '../assets/appetizer.jpg';
import appetizer2 from '../assets/appetizer2.jpg';
import pigInBlanket from '../assets/pig-in-blanket.jpg';
import devilEgg from '../assets/devilEgg.jpg';
import cuminLamb from '../assets/cumin-lamb.jpg';
import grilledSalmon from '../assets/grilled-salmon.jpg';
import hotpot from '../assets/hotpot.jpg';
import gongbaoChicken from '../assets/gongbao-chicken.jpg';
import beefWelly from '../assets/Beef-Wellington.jpg';
import ribeye from '../assets/tbone-ribeye.jpg';
import pekingDuck from '../assets/peking-duck.jpg';
import duckLorange from '../assets/duck-lorange.jpg';

const mainDishData = [
  {
    id: 'main_dish1',
    imgLink: mainDish,
    title: 'GuoBao Pork',
  },
  {
    id: 'main_dish2',
    imgLink: mainDish2,
    title: 'Moo Shoo Pork',
  },
  {
    id: 'main_dish3',
    imgLink: cuminLamb,
    title: 'Cumin Lamb ',
  },
  {
    id: 'main_dish4',
    imgLink: grilledSalmon,
    title: 'Grilled Salmon',
  },
  {
    id: 'main_dish5',
    imgLink: hotpot,
    title: 'Hotpot',
  },
  {
    id: 'main_dish6',
    imgLink: gongbaoChicken,
    title: 'Gong Bao Chicken',
  },
  {
    id: 'main_dish7',
    imgLink: beefWelly,
    title: 'Beef Wellington',
  },
  {
    id: 'main_dish8',
    imgLink: ribeye,
    title: 'T Bone Ribeye',
  },
  {
    id: 'main_dish9',
    imgLink: pekingDuck,
    title: 'PekingDuck',
  },
  {
    id: 'main_dish10',
    imgLink: duckLorange,
    title: 'Duck A L\'orange',
  },



];

const sideDishData = [
  {
    id: 'side_dish1',
    imgLink: sideDish,
    title: 'Chicken Wing',
  },
  {
    id: 'side_dish2',
    imgLink: sideDish2,
    title: 'Mozzarella stick',
  },
  {
    id: 'appetizer',
    imgLink: appetizer,
    title: 'Fruit Tart',
  },
  {
    id: 'appetizer2',
    imgLink: appetizer2,
    title: 'Bacon Roll',
  },
  {
    id: 'appetizer3',
    imgLink: pigInBlanket,
    title: 'Pig In Blanket',
  },
  {
    id: 'appetizer4',
    imgLink: devilEgg,
    title: 'Deviled Egg',
  },
];

const drinkData = [
  {
    id: 'drink_img',
    imgLink: drink,
    title: 'Beer',
  },
  {
    id: 'drink_img2',
    imgLink: wine,
    title: 'Wine',
  },
];

export default {
  mainDish: mainDishData,
  sideDish: sideDishData,
  drink: drinkData,
};
