import { MediaProps } from "../../types";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import MediaCard from "../../components/Cards/MediaCard/MediaCard";
import CardCast from "../../components/Cards/CastCard/CardCast";
import Image from "next/image";
import YoutubeTrailer from "../../components/YoutubeTrailer/YoutubeTrailer";
import MediaCSS from "../media.module.css";
const TvDetail = ({ media }: MediaProps) => {
  const router = useRouter();

  const TV_TRAILER = media?.videos?.results?.find(
    (video) => video.official === true
  );

  const cast = media?.credits?.cast?.map((cast) => {
    if (cast.profile_path != null) {
      return (
        <CardCast
          key={cast.id}
          character={cast.character}
          name={cast.name}
          imageURL={cast.profile_path}
        />
      );
    }
  });

  const genres = media?.genres?.map((genre, index) => {
    if (media?.genres?.length != index + 1) {
      return `${genre.name}, `;
    } else {
      return `${genre.name}.`;
    }
  });

  const similar = media?.similar?.results?.map((similar) => (
    <div onClick={() => router.push(`./${similar.id.toString()}`)}>
      <MediaCard
        key={similar.id}
        id={similar.id}
        poster_path={similar.poster_path}
        title={similar.title}
        name={similar.name}
      />
    </div>
  ));

  const ORIGINAL_IMG_URL = `https://image.tmdb.org/t/p/original`;

  const images = media?.images?.backdrops?.map((backdrop) => {
    if (backdrop.file_path != null) {
      return (
        <a
          title="See backdrop in full resolution."
          href={`${ORIGINAL_IMG_URL}${backdrop?.file_path}`}
          target="_blank"
          key={backdrop?.file_path}
        >
          <motion.div whileHover={{ scale: 1.04 }}>
            <div className="next-image-backdrop">
              <Image
                src={`${ORIGINAL_IMG_URL}${backdrop?.file_path}`}
                layout="intrinsic"
                objectFit="cover"
                height={300}
                width={400}
              />
            </div>
          </motion.div>
        </a>
      );
    }
  });

  return (
    <>
      <div className={MediaCSS.details}>
        <div className={`${MediaCSS.detailsItem} ${MediaCSS.description}`}>
          <h1>
            {media.original_name
              ? media.name.toUpperCase()
              : media.title.toUpperCase()}
          </h1>
          <h3 style={{ color: "hsl(272, 88%, 62%)" }}>
            What's this all about?
          </h3>
          <p>
            {media.overview
              ? media.overview
              : "It does not have a description yet."}
          </p>
        </div>
        <div className={MediaCSS.detailsItem}>
          <img
            loading="lazy"
            src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
            alt={media.original_title}
          />
        </div>
        <div className={`${MediaCSS.detailsItem} ${MediaCSS.description}`}>
          <a title="Visit Homepage" href={media.homepage} target="_blank">
            <h1>VISIT OFFICIAL WEBSITE</h1>
          </a>
          <p>{genres}</p>
          {media.first_air_date ? (
            <>
              <h3>{media.first_air_date}: First aired</h3>
              <h3>{media.last_air_date}: Last aired</h3>
            </>
          ) : (
            <>
              <h3>Release Date: {media.release_date}</h3>
              <h3>Runtime: {media.runtime}</h3>
            </>
          )}

          <h3>
            <i className="fa-solid fa-star" />
            {media.rating}
          </h3>

          <YoutubeTrailer trailer={TV_TRAILER} />
        </div>
      </div>

      <div className={MediaCSS.gridContainer}>
        <div className={MediaCSS.container}>
          <h1>If you liked it, then you might like this</h1>
          <div className={MediaCSS.innerContainer}>{similar}</div>
        </div>

        <div className={MediaCSS.container}>
          <h1>Top Cast</h1>
          <div className={MediaCSS.innerContainer}>{cast}</div>
        </div>
      </div>
      <div className={MediaCSS.container} style={{ width: "90%" }}>
        <h1>Best images</h1>
        <div className={MediaCSS.imageContainer}>{images}</div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context: {
  query: { id: string };
}) => {
  const id = context.query.id;

  const reqTvShowData = await fetch(`
  https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&include_image_language&append_to_response=videos,images,credits,reviews,similar&include_image_language=en,null`).then(
    (response) => response.json()
  );
  return {
    props: {
      media: reqTvShowData,
    },
  };
};

export default TvDetail;
