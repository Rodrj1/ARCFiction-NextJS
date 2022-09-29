import { NextPage } from "next";
import { DisplayCardProps } from "../types";
import { useSearchByMedia } from "../hooks/useSearcherByMedia";
import SearcherContainer from "../components/SearcherContainer/SearcherContainer";
import AnimatedMotionDiv from "../components/AnimatedMotionDiv/AnimatedMotionDiv";
import { useGetCurrentWidth } from "../hooks/useGetCurrentWidth";

interface SearcherProps {
  initialData: DisplayCardProps[];
  media: string;
}

const Searcher: NextPage<SearcherProps> = ({ initialData, media }) => {
  const { width } = useGetCurrentWidth();
  const {
    data,
    hasMore,
    advancePage,
    submitSearch,
    provisionalSearch,
    storeProvisionalSearch,
    selectGenre,
  } = useSearchByMedia({ initialData });

  return (
        <AnimatedMotionDiv>
          <SearcherContainer
            name={media}
            data={data}
            hasMore={hasMore}
            advancePage={advancePage}
            submitSearch={submitSearch}
            provisionalSearch={provisionalSearch}
            storeProvisionalSearch={storeProvisionalSearch}
            selectGenre={selectGenre}
          />
        </AnimatedMotionDiv>
  );
};

export const getServerSideProps = async (context: {
  query: { name: string };
}) => {
  const media = context.query.name;
  const requestData = await fetch(
    `https://api.themoviedb.org/3/discover/${media}?sort_by=popularity.desc&api_key=${process.env.MOVIE_DB_API_KEY}&page=1`
  ).then((response) => response.json());

  return {
    props: {
      initialData: requestData.results,
      media,
    },
  };
};

export default Searcher;
