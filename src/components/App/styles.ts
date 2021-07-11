import {makeStyles} from "@material-ui/core/styles";

const styles = makeStyles((theme) => {
    return {
        root: {},
        title: {},
        search: {},
        searchResults: {
            border: '1px solid red'
        },
        searchResult: {
            border: '1px solid black'
        }
    }
})

export default styles;