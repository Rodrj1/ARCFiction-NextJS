import { useDispatch } from "react-redux";
import { deleteList, removeFromList } from "../../feature/list-slice";
import { DisplayCardProps } from "../../types";
import { useState } from "react";
import { useRouter } from "next/router";
import MediaCard from "../Cards/MediaCard/MediaCard";
import ListCSS from "./List.module.css";

interface ListProps {
  name: string;
  description: string;
  id: string;
  items: DisplayCardProps[];
}

const ListItem = ({ name, description, items, id }: ListProps) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleRemoveList = () => {
    dispatch(deleteList(id));
  };

  const handleRemoveFromList = (mediaId: string) => {
    dispatch(removeFromList(mediaId));
  };

  const showMediaInCurrentList = items.map((media) => {
    const mediatype = media.name == undefined ? "movie" : "tv";
    return (
      <div className={ListCSS.flexCard} key={media.uuid}>
        <div
          onClick={() => router.push(`./${mediatype}/${media.id.toString()}`)}
        >
          <MediaCard
            id={media.id}
            poster_path={media.poster_path}
            title={media.title}
            name={media.name}
            uuid={media.uuid}
          />
        </div>
        <button onClick={() => handleRemoveFromList(media.uuid)}>
          Remove From List
        </button>
      </div>
    );
  });

  return (
    <>
      <br />
      <div className={ListCSS.list}>
        <div>
          <h1>{name}</h1>
          <h3>{description}</h3>
        </div>
        <div className={ListCSS.flexContainer}>
          <div className={ListCSS.mediaContainer}>{showMediaInCurrentList}</div>
        </div>
        {!showConfirm && (
          <button onClick={() => setShowConfirm(true)}>DELETE LIST</button>
        )}

        {showConfirm && (
          <>
            <button onClick={handleRemoveList}>CONFIRM</button>
            <br/>
            <br/>
            <button onClick={() => setShowConfirm(false)}>RETURN</button>
          </>
        )}
      </div>
      <br />
    </>
  );
};

export default ListItem;
