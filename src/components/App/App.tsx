import React, {useState} from 'react';
import styles from './styles';
import {Button, TextField, Typography} from '@material-ui/core'
import axios from 'axios';

interface FormElements extends HTMLFormControlsCollection {
    query: HTMLInputElement
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

const App: React.FC = () => {
    const classes = styles();
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const handleGetSuperheroData = async (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();
        const query = e.currentTarget.elements.query.value;
        console.log(query);
        const response = await axios.get(`api/superheroData/${query}`);
        setSearchResults(response.data);
    }

    const getSearchHistory = async () => {
        await axios.get(`api/searchHistory`);
    }

    return (
        <div className={classes.root}>
           <Typography  variant='h1' className={classes.title}>Search for superheroes</Typography>
            <form onSubmit={handleGetSuperheroData}>
            <div className={classes.search}>
                <TextField name='query' />
                <Button  type='submit' />
            </div>
            </form>
            <Button onClick={getSearchHistory} />
            <div className={classes.searchResults}>
                {searchResults.map((searchResult)=>(
                    <div className={classes.searchResult}>
                        {JSON.stringify(searchResult)}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
