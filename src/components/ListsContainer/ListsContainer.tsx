import { List } from "../../types";
import ListItem from "../List/List";
import ListMaker from "../ListMaker/ListMaker";
import ListsContainerCSS from "./ListsContainer.module.css";

interface ListContainerProps {
  lists: List[];
}

const ListsContainer = ({ lists }: ListContainerProps) => {
  return (
    <div className={ListsContainerCSS.container}>
      <ListMaker key="ListMaker" />
      {lists.map((list: List) => (
        <ListItem
          name={list.name}
          description={list.description}
          items={list.items}
          id={list.id}
          key={list.id}
        />
      ))}
    </div>
  );
};

export default ListsContainer;
