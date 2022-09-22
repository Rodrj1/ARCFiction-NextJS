import ListMakerCSS from "./ListMaker.module.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createList } from "../../feature/list-slice";
import { v4 as uuid } from "uuid";

const ListMaker = () => {
  const dispatch = useDispatch();
  const [newList, setNewList] = useState({
    name: "",
    description: "",
  });

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewList({ ...newList, [e.target.name]: e.target.value });
  };

  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (newList.name != "" && newList.description != "") {
      dispatch(createList({ ...newList, items: [], id: uuid() }));
      setNewList((prevState) => ({
        ...prevState,
        name: "",
        description: "",
      }));
    }
  };

  return (
    <>
      <form className={ListMakerCSS.container}>
        <h1>Make your own list.</h1>
        <input
          onChange={handleOnChange}
          name="name"
          type="text"
          placeholder="Set a name"
          value={newList.name}
        />

        <textarea
          onChange={handleOnChange}
          name="description"
          placeholder="What's this list about?"
          value={newList.description}
        />

        <button onClick={handleOnClick}>SAVE LIST</button>
      </form>
    </>
  );
};

export default ListMaker;
