import { SetStateAction } from "react";
import { DisplayCardProps } from "../types";

export const fetchNextPage = async (
  type: string | string[] | undefined,
  page: number,
  data: DisplayCardProps[],
  setData: (value: SetStateAction<DisplayCardProps[]>) => void,
  setHasMore: (value: SetStateAction<boolean>) => void
) => {
  const requestNextPage = await fetch(
    `https://api.themoviedb.org/3/discover/${type}?sort_by=popularity.desc&api_key=1d2291efea2e84d18b938ffde00ff81b&page=${page}`
  ).then((response) => response.json());
  const nextPageData: DisplayCardProps[] = await requestNextPage.results;
  setData(data.concat(nextPageData));
  setHasMore(requestNextPage.page < requestNextPage.total_pages);
};

export const fetchCustomSearch = async (
  type: string | string[] | undefined,
  page: number,
  submittedSearch: string,
  data: DisplayCardProps[],
  setData: (value: SetStateAction<DisplayCardProps[]>) => void,
  setHasMore: (value: SetStateAction<boolean>) => void,
  genre?: number
) => {
  const requestURL =
    genre == undefined
      ? `https://api.themoviedb.org/3/search/${type}?&api_key=1d2291efea2e84d18b938ffde00ff81b&query=${submittedSearch}&page=${page}`
      : `https://api.themoviedb.org/3/discover/${type}?sort_by=popularity.desc&api_key=1d2291efea2e84d18b938ffde00ff81b&with_genres=${genre}&page=${page}`;

  const requestNextPage = await fetch(requestURL).then((response) =>
    response.json()
  );

  const nextPageData: DisplayCardProps[] = await requestNextPage.results;
  setData(data.concat(nextPageData));
  setHasMore(requestNextPage.page < requestNextPage.total_pages);
};
