import { useRouter } from "next/router";
import { SetStateAction } from "react";
import { movieGenres, tvGenres } from "../../data/genreData";
import { DisplayCardProps } from "../../types";
import { v4 as uuid } from "uuid";
import MediaCard from "../Cards/MediaCard/MediaCard";
import GenreButton from "../GenreButton/GenreButton";
import InfiniteScroll from "react-infinite-scroll-component";
import SearcherCSS from "./SearcherContainer.module.css";

interface SearcherContainerProps {
  name: string;
  data: DisplayCardProps[];
  hasMore: boolean;
  advancePage: () => void;
  submitSearch: (e: { preventDefault: () => void }) => void;
  provisionalSearch: string;
  storeProvisionalSearch: (e: {
    target: {
      value: SetStateAction<string>;
    };
  }) => void;
  selectGenre: (id: number) => void | null | undefined;
}

const SearcherContainer = ({
  name,
  data,
  hasMore,
  advancePage,
  submitSearch,
  provisionalSearch,
  storeProvisionalSearch,
  selectGenre,
}: SearcherContainerProps) => {

  const router = useRouter();
  const title =
    name == "movie"
      ? "Search for your favorite movies."
      : "Search for your favorite tv shows.";

  return (
    <div style={{ width: "100%" }}>
      <InfiniteScroll
        dataLength={data?.length}
        hasMore={hasMore}
        next={advancePage}
        loader={null}
      >
        <div className={SearcherCSS.columnContainer}>
          <form className={SearcherCSS.searchContainer} onSubmit={submitSearch}>
            <h1 className="welcomeh1">{title}</h1>
            <input
              className={`${SearcherCSS.searchItem} ${SearcherCSS.search}`}
              type="search"
              placeholder="Search"
              value={provisionalSearch}
              onChange={storeProvisionalSearch}
            />
          </form>
          <div className={SearcherCSS.genresContainer}>
            {name == "movie" ? movieGenres?.map((genre) => (
              <GenreButton
                key={genre.name}
                id={genre.id}
                fn={selectGenre}
                text={genre.name}
              />
            )) : tvGenres?.map((genre) => (
              <GenreButton
                key={genre.name}
                id={genre.id}
                fn={selectGenre}
                text={genre.name}
              />
            ))}
          </div>
          <div className={SearcherCSS.mediaContainer}>
            {data?.map((movie) => {
              const media = movie?.name != undefined ? "tv" : "movie";
              return (
                <div
                  onClick={() =>
                    router.push(`./${media}/${movie?.id.toString()}`)
                  }
                  key={movie?.id}
                >
                  <MediaCard
                    id={movie?.id}
                    poster_path={movie?.poster_path}
                    title={movie?.title}
                    name={movie?.name}
                    uuid={uuid()}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default SearcherContainer;
