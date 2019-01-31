import fetch from 'isomorphic-unfetch';

const API_GAMES_URL = 'https://www.speedrun.com/api/v1/games';

export const fetchGames = async () => await fetchUrl(API_GAMES_URL);
export const fetchByUrl = async (url) => await fetchUrl(url);

const fetchUrl = async (url) => {
    const res = await fetch(url);
    const result = await res.json();
    return result.data;
};