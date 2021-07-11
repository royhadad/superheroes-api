import express from 'express';
import axios from 'axios';

const {SUPERHERO_API_ACCESS_TOKEN} = process.env;
const router = express.Router();

router.get('/api/superheroData/:name', async (req, res) => {
    const name = req.params.name;
    if (!name) {
        return res.status(400).send('no superhero name specified');
    }

    const superheroData = await axios.get(`https://superheroapi.com/api/${SUPERHERO_API_ACCESS_TOKEN}/search/${name}`);
    return res.send(superheroData);
});

export {router as apiRoutes}