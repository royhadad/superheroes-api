import express from 'express';
import axios from 'axios';

const {SUPERHERO_API_ACCESS_TOKEN} = process.env;

const router = express.Router();

router.get('/api/superheroData/:name', async (req, res) => {
    const name = req.params.name;
    if (!name) {
        return res.status(400).send('no superhero name specified');
    }



    const response = await axios.get(`https://superheroapi.com/api/${SUPERHERO_API_ACCESS_TOKEN}/search/${name}`);
    const results = response.data?.results;

    if (!results) {
        return res.status(500).send();
    } else {
        return res.send(results);
    }
});

router.get('/api/searchHistory', async (req, res) => {

});

export {router as apiRoutes}