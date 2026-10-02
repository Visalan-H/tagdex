import { getCollection, type CollectionEntry } from "astro:content";

export type ElementEntry = CollectionEntry<"elements">;
export type FamilyEntry = CollectionEntry<"families">;

/** Every element, in table order. */
export async function getElements(): Promise<ElementEntry[]> {
  return (await getCollection("elements")).sort((a, b) => a.data.n - b.data.n);
}

/** Families in the order they first appear in the table. */
export async function getFamilies(elements: ElementEntry[]): Promise<FamilyEntry[]> {
  const firstIndex = (id: string) => elements.findIndex((el) => el.data.family.id === id);
  return (await getCollection("families")).sort((a, b) => firstIndex(a.id) - firstIndex(b.id));
}
