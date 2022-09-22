import { DisplayCardProps } from "../../types";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
import MediaCard from "../Cards/MediaCard/MediaCard";
import CategorizerCSS from "./Categorizer.module.css";

interface CategorizerProps {
  name: string;
  data: {
    results: DisplayCardProps[];
  };
}

const Categorizer = ({ name, data }: CategorizerProps) => {
  const router = useRouter();

  const displayMedia = data?.results.map((card) => {
    const media = card.name != undefined ? "tv" : "movie";
    return (
      <div
        onClick={() => router.push(`./${media}/${card.id.toString()}`)}
        key={card.id}
      >
        <MediaCard
          id={card.id}
          poster_path={card.poster_path}
          title={card.title}
          name={card.name}
          uuid={uuid()}
        />
      </div>
    );
  });

  return (
    <div className={CategorizerCSS.container}>
      <h1>{name}</h1>
      <div className={CategorizerCSS.itemContainer}>{displayMedia}</div>
    </div>
  );
};

export default Categorizer;
