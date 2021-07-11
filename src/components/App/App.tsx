import React, {useState} from 'react';
import styles from './styles';
import {Box, Button, Grid, TextField, Typography} from '@material-ui/core'
import Superhero from "../../types/Superhero";
import {getSearchHistory, getSuperheroData} from "../../api/apiRoutes";
import SearchResults from "./SearchResults/SearchResults";
import SearchHistory from "./SearchHistory/SearchHistory";

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
    const [isLoadingSearchResults, setIsLoadingSearchResults] = useState<boolean>(false);
    const [isLoadingSearchHistory, setIsLoadingSearchHistory] = useState<boolean>(false);

    const fetchSuperheroData = async (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();
        const query = e.currentTarget.elements.query.value;

        if (!query) {
            alert('Please enter a search query first');
        } else {
            setIsLoadingSearchResults(true);
            const searchResults = await getSuperheroData(query);
            setIsLoadingSearchResults(false);
            setSearchResults(searchResults);

        }
    }

    const fetchHistory = async () => {
        setIsLoadingSearchHistory(true);
        const searchHistory = await getSearchHistory();
        setIsLoadingSearchHistory(false);
        setSearchHistory(searchHistory);
    }

    return (
        <div className={classes.root}>
            <Typography variant='h2' className={classes.title}>Search for superheroes</Typography>
            <Grid container>
                <Grid item md={6} xs={12}>
                    <Box padding={2}><Button onClick={fetchHistory}>Show search history</Button></Box>
                    <SearchHistory searchHistory={searchHistory} isLoading={isLoadingSearchHistory}/>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Box padding={2}>
                        <form onSubmit={fetchSuperheroData}>
                            <div className={classes.search}>
                                <TextField name='query'/>
                                <Button type='submit'>Search</Button>
                            </div>
                        </form>
                    </Box>
                    <SearchResults
                        searchResults={searchResults}
                        isLoading={isLoadingSearchResults}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
