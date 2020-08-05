import axios from 'axios';

export * from './data';

export const fetchUrl = async (url: string): Promise<string> => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (err) {
        console.error(`Error fetching: ${url}`);
    }
};

export const getFileName = (category: string, ext: string): string => `${category}${ext}`;

export const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));
