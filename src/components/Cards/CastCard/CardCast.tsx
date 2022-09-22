import Image from "next/image";
import CardCSS from "../Card.module.css";

interface CastProps {
  character: string;
  name: string;
  imageURL: string;
}

const CardCast = ({ character, name, imageURL }: CastProps) => {
  const img_link = `https://image.tmdb.org/t/p/w500/${imageURL}`;
  return (
    <>
      <div className={CardCSS.card}>
        <div className="next-image-card no-border">
          <Image
            src={img_link}
            width={200}
            height={250}
            layout="intrinsic"
            objectFit="cover"
          />
        </div>
        <h1>{name}</h1>
        <h3>Character: {character}</h3>
      </div>
    </>
  );
};

export default CardCast;
