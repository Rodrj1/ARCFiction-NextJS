import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { MediaProps } from "../types";
import Image from "next/image";
import CardCast from "../components/Cards/CastCard/CardCast";
import MediaCard from "../components/Cards/MediaCard/MediaCard";

export const useGetMediaDetails = ({ media }: MediaProps) => {
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
  return {
    TV_TRAILER,
    cast,
    genres,
    similar,
    images,
  };
};
