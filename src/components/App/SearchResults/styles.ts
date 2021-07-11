import {makeStyles} from "@material-ui/core/styles";

const styles = makeStyles((theme) => {
    return {
        searchResults: {
            display: 'flex',
            gap: '10px',
            flexDirection: 'column'
        },
        searchResult: {
            border: '1px solid #aaaaaa',
            borderRadius: '10px',
            display: 'flex',
            gap: '1rem',
            flexDirection: 'column'
        },
        superheroImage: {
            width: '100%'
        },
        powerStats: {
            display: 'flex'
        },
        powerstatName: {
            display: "flex",
            alignItems: 'flex-start',
            justifyItems: 'center'
        },
        ratingBar: {}
    }
})

export default styles;