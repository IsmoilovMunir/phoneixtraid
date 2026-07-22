import type { StaticImageData } from "next/image";
import coffeeIcon from "@/assets/ecosystem/coffee.png";
import expoIcon from "@/assets/ecosystem/expo.png";
import tradeIcon from "@/assets/ecosystem/trade.png";
import villaIcon from "@/assets/ecosystem/villa.png";
import driveIcon from "@/assets/ecosystem/drive.png";
import partnersIcon from "@/assets/ecosystem/partners.png";

export type EcosystemSite = {
  name: string;
  href: string;
  icon: StaticImageData;
};

/** Сайты экосистемы «Феникс» */
export const ecosystemSites: EcosystemSite[] = [
  {
    name: "Кофе Феникс",
    href: "http://coffeephoenix.ru/",
    icon: coffeeIcon,
  },
  {
    name: "Expo Phoenix",
    href: "http://expophoenix.com",
    icon: expoIcon,
  },
  {
    name: "Феникс Трейдинг",
    href: "https://phoneixtraid.com/",
    icon: tradeIcon,
  },
  {
    name: "Вилла Феникс",
    href: "https://villa-phoenix.ru/",
    icon: villaIcon,
  },
  {
    name: "Феникс Драйв",
    href: "https://phoenix-drive.ru/",
    icon: driveIcon,
  },
  {
    name: "Партнёрам Coffee Phoenix",
    href: "https://partniers.coffeephoenix.ru/",
    icon: partnersIcon,
  },
];
