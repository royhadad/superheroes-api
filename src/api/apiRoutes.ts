import axios from "axios";
import {GetSearchHistoryResponse, GetSuperheroDataResponse} from "../../server/apiRoutes";

export async function getSuperheroData(query: string): Promise<GetSuperheroDataResponse> {
    const response = await axios.get(`api/superheroData/${query}`);
    return response.data;
}

export async function getSearchHistory(): Promise<GetSearchHistoryResponse> {
    const response = await axios.get(`api/searchHistory`);
    return response.data;
}