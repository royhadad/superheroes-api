import React, {useState} from 'react';
import styles from './styles';
import {Box, Button, Grid, LinearProgress, TextField, Typography} from '@material-ui/core'
import Superhero from "../../types/Superhero";
import {getSearchHistory, getSuperheroData} from "../../api/apiRoutes";

interface FormElements extends HTMLFormControlsCollection {
    query: HTMLInputElement
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

const App: React.FC = () => {
    const classes = styles();
    const [searchResults, setSearchResults] = useState<Superhero[]>([]);
    const [searchHistory, setSearchHistory] = useState<string[]>([]);

    const fetchSuperheroData = async (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();
        const query = e.currentTarget.elements.query.value;
        setSearchResults(await getSuperheroData(query));
    }

    const fetchHistory = async () => {
        setSearchHistory(await getSearchHistory());
    }

    return (
        <div className={classes.root}>
            <Typography variant='h2' className={classes.title}>Search for superheroes</Typography>
            <form onSubmit={fetchSuperheroData}>
                <div className={classes.search}>
                    <TextField name='query'/>
                    <Button type='submit'>Search</Button>
                </div>
            </form>
            <Button onClick={fetchHistory}>Show search history</Button>
            <Grid container>
                <Grid item md={6} xs={12}>
                    <div>
                        <Typography variant="subtitle1">search history:</Typography>
                        {searchHistory.map((searchHistoryItem) => (
                            <div>{searchHistoryItem}</div>
                        ))}
                    </div>
                </Grid>
                <Grid item md={6} xs={12}>
                    <div className={classes.searchResults}>
                        {searchResults.map((searchResult) => (
                            <div className={classes.searchResult}>
                                <Box padding={1}>
                                <Typography variant='subtitle1'>{searchResult.name}</Typography>
                                </Box>
                                <Grid container>
                                    <Grid item md={6} xs={12}>
                                        <Box padding={1}>
                                            <Grid container>
                                                {Object.entries(searchResult.powerstats).map(([powerstatName, powerstatRating]) => (
                                                    <>
                                                        <Grid item xs={6}>{powerstatName}:&nbsp;</Grid>
                                                        <Grid item xs={6}>
                                                            <LinearProgress
                                                                variant="determinate"
                                                                value={Number(powerstatRating)}
                                                            />
                                                        </Grid>
                                                    </>
                                                ))}</Grid>
                                        </Box>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <img className={classes.superheroImage} src={searchResult.image.url}
                                             alt={searchResult.name}/>
                                    </Grid>
                                </Grid>
                            </div>
                        ))}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
