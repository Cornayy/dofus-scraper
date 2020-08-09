import { DeepPartial } from 'typeorm';

export type ScrapeCallback<T> = (selector: CheerioStatic) => DeepPartial<T>;

export interface ObjectPart {
    [key: string]: string | number | string[];
}

export interface ScrapeOptions {
    useDefaultProps: boolean;
}

export interface PromptOption {
    scrapeOption: ItemType;
    callback: () => Promise<void>;
}

export enum ItemType {
    Equipment = 'equipment',
    Set = 'sets',
    Weapon = 'weapons',
    Resource = 'resources',
    Pet = 'pets',
    Ceremonial = 'ceremonial-item',
}

export enum StatType {
    Vitality = 'Vitality',
    AP = 'AP',
    MP = 'MP',
    Initiative = 'Initiative',
    Prospecting = 'Prospecting',
    Range = 'Range',
    Summon = 'Summon',
    Wisdom = 'Wisdom',
    Strength = 'Strength',
    Intelligence = 'Intelligence',
    Chance = 'Chance',
    Agility = 'Agility',
    ApParry = 'AP Parry',
    ApReduction = 'Ap Reduction',
    MpParry = 'MP Parry',
    MpReduction = 'MP Reduction',
    Critical = '% Critical',
    Heals = 'Heals',
    Lock = 'Lock',
    Dodge = 'Dodge',
    Power = 'Power',
    Damage = 'Damage',
    CriticalDamage = 'Critical Damage',
    NeutralDamage = 'Neutral Damage',
    EarthDamage = 'Earth Damage',
    FireDamage = 'Fire Damage',
    WaterDamage = 'Water Damage',
    AirDamage = 'Air Damage',
    Reflect = 'Reflect',
    TrapDamage = 'Trap Damage',
    TrapPower = 'Trap Power',
    PushbackDamage = 'Pushback Damage',
    PctSpellDamage = '% Spell Damage',
    PctWeaponDamage = '% Weapon Damage',
    PctRangedDamage = '% Ranged Damage',
    PctMeleeDamage = '% Melee Damage',
    NeutralRes = 'Neutral Resistance',
    PctNeutralRes = '% Neutral Resistance',
    EarthRes = 'Earth Resistance',
    PctEarthRes = '% Earth Resistance',
    FireRes = 'Fire Resistance',
    PctFireRes = '% Fire Resistance',
    WaterRes = 'Water Resistance',
    PctWaterRes = '% Water Resistance',
    AirRes = 'Air Resistance',
    PctAirRes = '% Air Resistance',
    CriticalRes = 'Critical Resistance',
    PushbackRes = 'Pushback Resistance',
    PctRangedRes = '% Ranged Resistance',
    PctMeleeRes = '% Melee Resistance',
    Pods = 'Pods',
}
