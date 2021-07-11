import React from 'react';
import styles from './styles';
import {Box, CircularProgress, Grid, LinearProgress, Typography} from '@material-ui/core'
import Superhero from "../../../types/Superhero";

interface Props {
    searchResults: Superhero[];
    isLoading: boolean;
}

const App: React.FC<Props> = (props: Props) => {
    const {searchResults, isLoading} = props;
    const classes = styles();

    return (
        <div className={classes.searchResults}>
            {
                isLoading ? (
                        <CircularProgress />
                ) : (
                    searchResults.map((searchResult) => (
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
                                                    <Grid item xs={6}
                                                          className={classes.powerstatName}>{powerstatName}:</Grid>
                                                    <Grid item xs={6}>
                                                        <LinearProgress
                                                            variant="determinate"
                                                            value={Number(powerstatRating)}
                                                            className={classes.ratingBar}
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
                    ))
                )
            }
        </div>
    );
}

export default App;
