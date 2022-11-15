import { Movie } from "../models/movie";
import { PaginationResponse } from "../models/paginationResponse";
import { httpClient } from "./httpClient";

export const getNextPageParam = (data : PaginationResponse<Movie>) => {
  return data.total_pages == data.page ? undefined : data.page + 1;
}

export const APIQueries = {
  popularMovies: () => ({
    queryKey: ["popularMovies"],
    queryFn: ({ pageParam = 1 }) => 
      httpClient.get<PaginationResponse<Movie>>(
        "api/movies/popular", {
          page: pageParam
        }),
    getNextPageParam
  }),

  searchMovie: (search: string) => ({
    queryKey: ["search", search],
    queryFn: ({ pageParam = 1}) => 
      httpClient.get<PaginationResponse<Movie>>(
        "/api/search/movie",
        {
          page: pageParam,
          query: search
        }
      ),
    getNextPageParam
  })
}