import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { fetchCustomSearch, fetchNextPage } from "../helpers/searcherData";
import { DisplayCardProps } from "../types";

interface searchProps {
  initialData: DisplayCardProps[];
}

export const useSearchByMedia = ({ initialData }: searchProps) => {
  const [data, setData] = useState<DisplayCardProps[]>(initialData);
  const [page, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [provisionalSearch, setProvisionalSearch] = useState("");
  const [search, setSearch] = useState("");
  const [searchByGenre, setSearchByGenre] = useState<number>();

  const router = useRouter();
  const media = router.query.name;

  const advancePage = () => {
    setCurrentPage((page) => page + 1);
  };

  const storeProvisionalSearch = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setProvisionalSearch(e.target.value);
  };

  const submitSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (provisionalSearch != "" && provisionalSearch != search) {
      setData([]);
      setSearchByGenre(undefined);
      setHasMore(true);
      setSearch(provisionalSearch);
      setCurrentPage((current) => current - current + 1);
    } else if (provisionalSearch != search || provisionalSearch == "") {
      setData(initialData);
      setSearch("");
    }
  };

  const selectGenre: (id: number) => void | null | undefined = (id: number) => {
    if (id != searchByGenre) {
      setSearchByGenre(id);
      setData([]);
      setSearch("");
      setProvisionalSearch("");
      setHasMore(true);
      setCurrentPage((current) => current - current + 1);
    }
  };

  useEffect(() => {
    if (search != "") {
      fetchCustomSearch(media, page, search, data, setData, setHasMore);
    }
    if (searchByGenre != undefined) {
      const g = searchByGenre;
      fetchCustomSearch(media, page, search, data, setData, setHasMore, g);
    }
  }, [search, searchByGenre]);

  useEffect(() => {
    if (page > 1 && search == "" && searchByGenre == undefined) {
      fetchNextPage(media, page, data, setData, setHasMore);
    } else if (page > 1 && search != "" && searchByGenre == undefined) {
      fetchCustomSearch(media, page, search, data, setData, setHasMore);
    } else if (page > 1 && search == "" && searchByGenre != undefined) {
      const g = searchByGenre;
      fetchCustomSearch(media, page, search, data, setData, setHasMore, g);
    }
  }, [page]);

  return {
    data,
    hasMore,
    advancePage,
    submitSearch,
    provisionalSearch,
    storeProvisionalSearch,
    selectGenre,
  };
};
