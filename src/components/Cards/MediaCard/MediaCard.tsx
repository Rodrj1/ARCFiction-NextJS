import { DisplayCardProps } from "../../../types";
import { motion } from "framer-motion";
import Image from "next/image";
import CardCSS from "../Card.module.css";

const MediaCard = ({ id, poster_path, title, name }: DisplayCardProps) => {
  const image_URL = `https://image.tmdb.org/t/p/w500/${poster_path}`;

  return (
    <>
      <div className={CardCSS.card}>
        {poster_path != null ? (
          <a>
            <motion.div whileHover={{ scale: 1.1 }}>
              <div className="next-image-card">
                <Image
                  alt={name ? name : title}
                  src={image_URL}
                  width={200}
                  height={250}
                  layout="intrinsic"
                  objectFit="cover"
                />
              </div>
            </motion.div>
          </a>
        ) : (
          <p>oops</p>
        )}
        <h1>{name ? name : title}</h1>
      </div>
    </>
  );
};

export default MediaCard;
