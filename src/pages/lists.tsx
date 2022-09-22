import { NextPage } from "next";
import { useAppSelector } from "../app/hooks";
import ListsContainer from "../components/ListsContainer/ListsContainer";

const ListsPage: NextPage = () => {
  const getLists = useAppSelector((state) => state.lists.currentLists);

  return (
    <>
      <ListsContainer lists={getLists} />
    </>
  );
};

export default ListsPage;
