import casqueImg from "../assets/images/casque.png";
import montreImg from "../assets/images/montre.png";
import clavierImg from "../assets/images/clavier.png";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    title: "Casque Bluetooth",
    description: "Son immersif et design épuré.",
    price: 89.99,
    image: casqueImg,
  },
  {
    id: 2,
    title: "Montre connectée",
    description: "Suivi santé, notifications et plus.",
    price: 129.99,
    image: montreImg,
  },
  {
    id: 3,
    title: "Clavier mécanique",
    description: "Tactile, rétroéclairé et silencieux.",
    price: 74.5,
    image: clavierImg,
  },
];
