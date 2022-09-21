import { DisplayCardProps } from "../../../types";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Image from "next/image";

const MediaCard = ({ id, poster_path, title, name }: DisplayCardProps) => {
  const image_URL = `https://image.tmdb.org/t/p/w500/${poster_path}`;

  return (
    <>
      <div className="card">
        {poster_path != null ? (
          <a>
            <motion.div whileHover={{ scale: 1.1 }}>
              <div className="next-image-card">
                <Image
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

      <style jsx>{`
        .card {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          flex-direction: column;
          color: white;
          text-align: center;
        }

        .card img {
          object-fit: cover;
          height: 300px;
          width: 80%;
          border-radius: 5px;
          border: 1px solid transparent;
          transition: 0.3s ease-in-out;
        }

        .card h1 {
          font-size: 1.2rem;
          min-height: 20px;
          font-weight: 200;
        }

        .card img:hover {
          border: 1px solid white;
        }

        .fa-star {
          color: hsl(54, 74%, 49%);
        }

        @media screen and (max-width: 648px) {
          .card {
            justify-content: center;
            align-content: center;
          }
          .card img {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default MediaCard;
