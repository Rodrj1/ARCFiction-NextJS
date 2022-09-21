import { motion } from "framer-motion";
import { MediaProps } from "../../types";
import YoutubeTrailer from "../YoutubeTrailer/YoutubeTrailer";
import MediaCSS from "./media.module.css";

interface DetailsProps {
  media: MediaProps["media"];
  TV_TRAILER:
    | {
        official?: boolean | undefined;
        id: number;
        key: string;
      }
    | undefined;
  similar: JSX.Element[];
  genres: string[];
  cast: (JSX.Element | undefined)[];
  images: (JSX.Element | undefined)[];
}

const MediaDetailsContainer = ({
  media,
  TV_TRAILER,
  similar,
  genres,
  cast,
  images,
}: DetailsProps) => {
  return (
    <motion.div
      initial={{ x: -400, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      exit={{ x: -400, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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
    </motion.div>
  );
};

export default MediaDetailsContainer;
