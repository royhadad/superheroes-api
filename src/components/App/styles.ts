import {makeStyles} from "@material-ui/core/styles";

const styles = makeStyles((theme) => {
    return {
        root: {
            width: '100%',
            maxWidth: '800px',
            margin: '20px auto'
        },
        title: {},
        search: {},
        searchResults: {
            border: '1px solid red'
        },
        searchResult: {
            border: '1px solid black'
        },
        powerStat: {
            display: 'flex'
        },
        superheroImage: {
            width: '100%'
        }
    }
})

export default styles;