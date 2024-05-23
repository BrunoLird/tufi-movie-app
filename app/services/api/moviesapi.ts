// @ts-ignore
import { movieapikey } from "./apikey";
import axios from "axios";

// Endpointsr
const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${movieapikey}`;
const popularMoviesEndpoint = `${apiBaseUrl}/movie/popular?api_key=${movieapikey}`;
const upComingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${movieapikey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${movieapikey}`;
const genresEndpoint = `${apiBaseUrl}/genre/movie/list?api_key=${movieapikey}`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${movieapikey}`;

// Movie Details Endpoint
const movieDetailsEndpoint = (id:number ) =>
  `${apiBaseUrl}/movie/${id}?api_key=${movieapikey}`;


const similarMoviesEndpoint = (id:number ) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${movieapikey}`;


// Api call to get  movies

const movieApiCall = async (endpoints: string, params?: Record<string, any>) => {
  const options = {
    method: "GET",
    url: endpoints,
    params: params || {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// Functions to get Images of different sizes and width
export const image500 = (posterpath: string) =>
  posterpath ? "https://image.tmdb.org/t/p/w500" + posterpath : null;

// Home Screen Apis
export const fetchTrendingMovie = () => {
  return movieApiCall(trendingMoviesEndpoint);
};

export const fetchPopularMovie = () => {
  return movieApiCall(popularMoviesEndpoint);
};

export const fetchUpComingMovie = () => {
  return movieApiCall(upComingMoviesEndpoint);
};

export const fetchTopRatedMovie = () => {
  return movieApiCall(topRatedMoviesEndpoint);
};

export const fetchGenres = () => {
  return movieApiCall(genresEndpoint);
};

export const fetchMovieDetails = (id:number) => {
  return movieApiCall(movieDetailsEndpoint(id));
};


export const fetchSimilarMovies = (movieId:number) => {
  return movieApiCall(similarMoviesEndpoint(movieId));
};

export const searchMovies = (params?: Record<string, any>) => {
  return movieApiCall(searchMoviesEndpoint, params);
};

