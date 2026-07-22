import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/types";
import { ruDictionary } from "./dictionaries/ru";
import { enDictionary } from "./dictionaries/en";
import { faDictionary } from "./dictionaries/fa";

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  if (locale === "en") return enDictionary;
  if (locale === "fa") return faDictionary;
  return ruDictionary;
}
