import React from 'react';
import styles from './styles';
import {CircularProgress, Typography} from '@material-ui/core'

interface Props {
    searchHistory: string[];
    isLoading: boolean;
}

const App: React.FC<Props> = (props: Props) => {
    const {searchHistory, isLoading} = props;
    const classes = styles();

    return (
        <div>
            <Typography variant="subtitle1">search history:</Typography>
            <div className={classes.searchHistory}>
                {isLoading ? (
                    <CircularProgress/>
                ) : (
                    <div>
                        {searchHistory.map((searchHistoryItem) => (
                            <div>{searchHistoryItem}</div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
