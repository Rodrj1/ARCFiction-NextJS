import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { List } from "../types";

interface ListsStates {
  currentLists: List[];
}

const initialState: ListsStates = {
  currentLists: [],
};

const listSlice = createSlice({
  name: "listContainer",
  initialState,
  reducers: {
    createList(state, action: PayloadAction<List>) {
      state.currentLists.push(action.payload);
    },
    deleteList(state, action: PayloadAction<string>) {
      const findList = state.currentLists.find(
        (list) => list.id === action.payload
      );
      if (findList) {
        state.currentLists.splice(state.currentLists.indexOf(findList), 1);
      }
    },
    addToList: (
      state,
      action: PayloadAction<{
        media: {
          name: string;
          title: string;
          poster_path: string;
          id: string;
          uuid: string;
        };
        listId: string;
      }>
    ) => {
      const findList = state.currentLists.find(
        (list) => list.id === action.payload.listId
      );
      if (findList) {
        const listIndex = state.currentLists.indexOf(findList);
        const mediaIsInList = state.currentLists[listIndex].items.find(
          (media) => media.id === action.payload.media.id
        );
        if (!mediaIsInList) {
          console.log("Listed");
          state.currentLists[listIndex].items.push(action.payload.media);
        } else {
          console.log("Already listed.");
        }
      }
    },
    removeFromList: (state, action: PayloadAction<string>) => {
      for (let i = 0; i < state.currentLists.length; i++) {
        const findFromList = state.currentLists[i].items.find(
          (media) => media.uuid === action.payload
        );
        if (findFromList) {
          state.currentLists[i].items.splice(
            state.currentLists[i].items.indexOf(findFromList),
            1
          );
        }
      }
    },
  },
});

export const { createList, deleteList, addToList, removeFromList } =
  listSlice.actions;
export default listSlice.reducer;
