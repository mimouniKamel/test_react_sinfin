import axios from "axios";
import {
  ReadModelBooks,
  ReadModelCharaters,
  ReadModelHouses,
  ReadModelItem,
  ReadModelNameAndID,
} from "../types";
import { getIDFromUrl, GetLastPage } from "../utils";

export const getBooks = async (
  page: number,
  pageSize: number,
  filter?: string,
  value?: string
): Promise<ReadModelBooks> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/books?page=${page}&pageSize=${pageSize}&${filter}=${value}`
    );
    const lastPage = GetLastPage(response.headers.link);
    return { books: response.data, lastPage: lastPage };
  } catch (error) {
    console.error(error);
    return { books: [], lastPage: 0 };
  }
};

export const getCharacters = async (
  page: number,
  pageSize: number,
  filter?: string,
  value?: string
): Promise<ReadModelCharaters> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/characters?page=${page}&pageSize=${pageSize}&${filter}=${value}`
    );
    const lastPage = GetLastPage(response.headers.link);
    return { characters: response.data, lastPage: lastPage };
  } catch (error) {
    console.error(error);
    return { characters: [], lastPage: 0 };
  }
};

export const getHouses = async (
  page: number,
  pageSize: number,
  filter?: string,
  value?: string
): Promise<ReadModelHouses> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/houses?page=${page}&pageSize=${pageSize}&${filter}=${value}`
    );
    const lastPage = GetLastPage(response.headers.link);
    return { houses: response.data, lastPage: lastPage };
  } catch (error) {
    console.error(error);
    return { houses: [], lastPage: 0 };
  }
};

export const getOneItem = async (pathname: string): Promise<ReadModelItem> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/${pathname}`
    );
    return { item: response.data };
  } catch (error) {
    console.error(error);
    return { item: {} };
  }
};

export const getName = async (pathname: string) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/${pathname}`
    );
    return response.data.name;
  } catch (error) {
    console.error(error);
  }
};

export const getNameAndID = async (
  value: string,
  url: string
): Promise<ReadModelNameAndID> => {
  try {
    const id = getIDFromUrl(url);
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/${value}/${id}`
    );
    return { id: id, name: response.data.name };
  } catch (error) {
    console.error(error);
    return { id: "", name: "" };
  }
};
