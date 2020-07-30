import axios from 'axios';

export const fetchUrl = async (url: string): Promise<string> => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (err) {
        console.error(err);
    }
};

export const getFileName = (category: string, ext: string): string =>
    `${category}-${Date.now().toFixed()}${ext}`;
