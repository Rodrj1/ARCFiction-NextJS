import Image from "next/image";

interface CastProps {
  character: string;
  name: string;
  imageURL: string;
}

const CardCast = ({ character, name, imageURL }: CastProps) => {
  const img_link = `https://image.tmdb.org/t/p/w500/${imageURL}`;
  return (
    <>
      <div className="card">
        <div className="next-image-card">
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

      <style jsx>{`
        .card {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          flex-direction: column;
          color: white;
          text-align: center;
        }

        .card h1 {
          font-size: 1.2rem;
          height: 20px;
          font-weight: 200;
        }

        .card h3 {
          font-size: 1.1rem;
          font-weight: 300;
          margin-bottom: 5px;
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

export default CardCast;
