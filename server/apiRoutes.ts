import express from 'express';
import axios from 'axios';
import Superhero from "../src/types/Superhero";

const {SUPERHERO_API_ACCESS_TOKEN} = process.env;

// Singleton
const globalSearchHistory: string[] = [];

const router = express.Router();

export type GetSuperheroDataResponse =  Superhero[];
router.get('/api/superheroData/:name', async (req, res) => {
    const name = req.params.name;
    if (!name) {
        return res.status(400).send('no superhero name specified');
    }


    globalSearchHistory.push(name);
    const response = await axios.get(`https://superheroapi.com/api/${SUPERHERO_API_ACCESS_TOKEN}/search/${name}`);
    const results = response.data?.results;

    if (!results) {
        return res.status(500).send();
    } else {
        return res.send(results);
    }
});

export type GetSearchHistoryResponse = typeof globalSearchHistory;
router.get('/api/searchHistory', async (req, res) => {
    const body: GetSearchHistoryResponse = globalSearchHistory;
    return res.send(body);
});

export {router as apiRoutes}