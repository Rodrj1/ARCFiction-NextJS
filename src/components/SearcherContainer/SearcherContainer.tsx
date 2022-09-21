import { useRouter } from "next/router";
import { SetStateAction } from "react";
import { movieGenres } from "../../data/genreData";
import { DisplayCardProps } from "../../types";
import MediaCard from "../Cards/MediaCard/MediaCard";
import GenreButton from "../GenreButton/GenreButton";
import InfiniteScroll from "react-infinite-scroll-component";
import SearcherCSS from "./SearcherContainer.module.css";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ x: -400, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      exit={{ x: -400, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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
              onSubmit={submitSearch}
            >
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
              {movieGenres?.map((genre) => (
                <GenreButton
                  key={genre.name}
                  id={genre.id}
                  fn={selectGenre}
                  text={genre.name}
                />
              ))}
            </div>
            <div className={SearcherCSS.mediaContainer}>
              {data.map((movie) => {
                const media = movie.name != undefined ? "tv" : "movie";
                return (
                  <div
                    onClick={() =>
                      router.push(`./${media}/${movie.id.toString()}`)
                    }
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
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </motion.div>
  );
};

export default SearcherContainer;
