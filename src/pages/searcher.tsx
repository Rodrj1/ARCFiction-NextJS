import { NextPage } from "next";
import { useRouter } from "next/router";
import MediaCard from "../components/Cards/MediaCard/MediaCard";
import { DisplayCardProps } from "../types";
import { useEffect, useState } from "react";
import SearcherCSS from "./searcher.module.css";
import InfiniteScroll from "react-infinite-scroll-component";

interface SearcherProps {
  initialData: DisplayCardProps[];
}

const Searcher: NextPage<SearcherProps> = ({ initialData }) => {
  const [data, setData] = useState<DisplayCardProps[]>(initialData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [provisionalSearch, setProvisionalSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");

  const router = useRouter();

  const displayMedia = data.map((movie) => {
    const media = movie.name != undefined ? "tv" : "movie";
    return (
      <div
        onClick={() => router.push(`./${media}/${movie.id.toString()}`)}
        key={movie.id}
      >
        <MediaCard
          id={movie.id}
          poster_path={movie.poster_path}
          title={movie.title}
          name={movie.name}
        />
      </div>
    );
  });

  const fetchNextPage = async () => {
    const requestNextPage = await fetch(
      `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1d2291efea2e84d18b938ffde00ff81b&page=${currentPage}`
    ).then((response) => response.json());
    const nextPageData: DisplayCardProps[] = await requestNextPage.results;
    setData(data.concat(nextPageData));
    setHasMore(requestNextPage.page < requestNextPage.total_pages);
  };

  const fetchCustomSearch = async () => {
    const requestNextPage = await fetch(
      `https://api.themoviedb.org/3/search/movie?&api_key=1d2291efea2e84d18b938ffde00ff81b&query=${submittedSearch}&page=${currentPage}`
    ).then((response) => response.json());
    const nextPageData: DisplayCardProps[] = await requestNextPage.results;
    setData(data.concat(nextPageData));
    setHasMore(requestNextPage.page < requestNextPage.total_pages);
  };

  const advancePage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const submitSearchValue = (e: any) => {
    e.preventDefault();
    if (provisionalSearch != "" && provisionalSearch != submittedSearch) {
      setData([]);
      setHasMore(true);
      setSubmittedSearch(provisionalSearch);
      setCurrentPage((current) => current - current + 1);
    } else if (provisionalSearch != submittedSearch) {
      setData(initialData);
      setSubmittedSearch("");
    }
  };

  const storeProvisionalSearch = (e: any) => {
    setProvisionalSearch(e.target.value);
  };

  useEffect(() => {
    if (submittedSearch != "") {
      fetchCustomSearch();
    }
  }, [submittedSearch]);

  useEffect(() => {
    if (currentPage > 1 && submittedSearch == "") {
      fetchNextPage();
    } else if (currentPage > 1 && submittedSearch != "") {
      fetchCustomSearch();
    }
  }, [currentPage]);

  return (
    <div style={{ width: "100%" }}>
      <InfiniteScroll
        dataLength={data?.length}
        hasMore={hasMore}
        next={advancePage}
        loader={null}
      >
        <div className={SearcherCSS.columnContainer}>
          <form
            className={SearcherCSS.searchContainer}
            onSubmit={submitSearchValue}
          >
            <h1>Searcher</h1>
            <input
              className={`${SearcherCSS.searchItem} ${SearcherCSS.search}`}
              type="search"
              placeholder="Search"
              value={provisionalSearch}
              onChange={storeProvisionalSearch}
            />
          </form>
          <div className="genres-container"></div>
          <div className={SearcherCSS.mediaContainer}>{displayMedia}</div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export const getServerSideProps = async () => {
  const requestData = await fetch(
    `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1d2291efea2e84d18b938ffde00ff81b&page=1`
  ).then((response) => response.json());

  return {
    props: {
      initialData: requestData.results,
    },
  };
};

export default Searcher;
