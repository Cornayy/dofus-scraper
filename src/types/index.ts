import { DeepPartial } from 'typeorm';

export type ScrapeCallback<T> = (selector: CheerioStatic) => DeepPartial<T>;

export interface ObjectPart {
    [key: string]: string | number | string[];
}

export interface MonsterDrop {
    name: string;
    imageUrl: string;
    chance: string;
}

export interface RecipeIngredient {
    name: string;
    imageUrl: string;
    amount: number;
}

export interface PromptOption {
    scrapeOption: ItemType;
    callback: () => Promise<void>;
}

export enum ScrapeMode {
    New = 'new',
    Existing = 'existing',
}

export enum ItemType {
    Equipment = 'equipment',
    Set = 'sets',
    Weapon = 'weapons',
    Resource = 'resources',
    Pet = 'pets',
    Ceremonial = 'ceremonial-item',
    Mount = 'mounts',
    Consumable = 'consumables',
    Monster = 'monsters',
    Idol = 'idols',
}
