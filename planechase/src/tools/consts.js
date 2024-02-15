import Planeswalk from '../img/symbols/PW.png';
import Chaos from '../img/symbols/CHAOS.png';
import Blank from '../img/symbols/BLANK.png';
import { importAll } from './utils';

export const dieOptions = [
  {
    name: 'Blank',
    image: Blank,
  },
  {
    name: 'Blank',
    image: Blank,
  },
  {
    name: 'Blank',
    image: Blank,
  },
  {
    name: 'Blank',
    image: Blank,
  },
  {
    name: 'Planeswalk',
    image: Planeswalk,
  },
  {
    name: 'Chaos',
    image: Chaos,
  },
];

export const planeImages = importAll(require.context('../img/webcam-friendly/planes', true, /\.(png|jpe?g|svg)$/),'mtg');