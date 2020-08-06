import { ItemType } from './../../../types/index';

export interface PromptOption {
    scrapeOption: ItemType;
    callback: () => Promise<void>;
}
