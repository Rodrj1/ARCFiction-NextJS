import { MediaProps } from "../../types";
import { useGetMediaDetails } from "../../hooks/useGetMediaDetails";
import MediaDetailsContainer from "../../components/MediaDetailsContainer/MediaDetailsContainer";

const MovieDetail = ({ media }: MediaProps) => {
  const { TV_TRAILER, cast, genres, similar, images } = useGetMediaDetails({
    media,
  });

  return (
    <MediaDetailsContainer
      media={media}
      TV_TRAILER={TV_TRAILER}
      similar={similar}
      genres={genres}
      cast={cast}
      images={images}
    />
  );
};

export const getServerSideProps = async (context: {
  query: { id: string };
}) => {
  const id = context.query.id;

  const reqMovieData = await fetch(`
  https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&include_image_language&append_to_response=videos,images,credits,reviews,similar&include_image_language=en,null`).then(
    (response) => response.json()
  );
  return {
    props: {
      media: reqMovieData,
    },
  };
};

export default MovieDetail;
