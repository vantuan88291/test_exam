import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SLICES, TASK_PRIORITY, TASK_STATUS, randomTaskID } from "@utils";
import { IData, TaskReducer } from "./types";
import { Alert } from "react-native";

const initNewTask = {
  id: "",
  title: "",
  description: "",
  priority: TASK_PRIORITY.medium,
  status: TASK_STATUS.doing,
};

const initialState: TaskReducer = {
  data: [],
  task: initNewTask,
  priorityTaskSelected: {
    id: "",
    priority: TASK_PRIORITY.high,
    title: "",
    status: TASK_STATUS.doing,
  },
};

const slice = createSlice({
  name: SLICES.task,
  initialState,
  reducers: {
    setDataTask(state, action: PayloadAction<IData[]>) {
      state.data = action.payload;
    },
    changeNewTaskTitle(state, action: PayloadAction<string>) {
      state.task.title = action.payload;
    },
    changeNewTaskDescription(state, action: PayloadAction<string>) {
      state.task.description = action.payload;
    },
    setProcessTask(state, action: PayloadAction<string>) {
      const id = action.payload;
      const itemFound: IData | undefined = state.data.find(
        (item: IData) => item.id === id
      );
      if (itemFound) {
        state.task = itemFound;
      }
    },
    processTask(
      state,
      action: PayloadAction<{
        cb: () => void;
        mode: "create" | "update";
      }>
    ) {
      if (!state.task.title.length) {
        Alert.alert("Ops!", "Title are required");
        return;
      }
      if (action.payload.mode === "update") {
        console.log(state.task);
        const idxFound = state.data.findIndex(
          (item: IData) => item.id === state.task.id
        );
        if (idxFound > -1) {
          const clonedData = [...state.data];
          clonedData[idxFound].title === state.task.title;
          clonedData[idxFound].description === state.task.description;
          state.data = clonedData;
          action.payload.cb();
        }
        return;
      }
      const newTask: IData = {
        id: randomTaskID(),
        title: state.task.title,
        description: state.task.description,
        priority: TASK_PRIORITY.medium,
        status: TASK_STATUS.doing,
      };
      state.data = [...state.data, newTask];
      action.payload.cb();
      state.task = initNewTask;
    },
    clearNewTaskData(state) {
      state.task = initNewTask;
    },
    changePriority(state, action: PayloadAction<string>) {},
    markTaskAsDone(state, action: PayloadAction<string>) {
      let newData = [...state.data];
      const idxFound = newData.findIndex(
        (item: IData) => item.id === action.payload
      );
      if (idxFound > -1) {
        newData[idxFound].status = TASK_STATUS.done;
      }
      state.data = newData;
    },
    deleteTask(state, action: PayloadAction<string>) {
      const id = action.payload;
      const newData = state.data.filter((item: IData) => item.id !== id);
      state.data = newData;
    },
    setPriorityTaskSelected(state, action: PayloadAction<string>) {
      const id = action.payload;
      const itemFound: IData | undefined = state.data.find(
        (item: IData) => item.id === id
      );
      if (itemFound) {
        state.priorityTaskSelected = itemFound;
      }
    },
    changePriorityTaskSelected(state, action: PayloadAction<TASK_PRIORITY>) {
      const idxFound: number = state.data.findIndex(
        (item: IData) => item.id === state.priorityTaskSelected.id
      );
      if (idxFound > -1) {
        let clonedData = [...state.data];
        clonedData[idxFound].priority = action.payload;
        state.data = clonedData;
      }
    },
    addComment(state, action: PayloadAction<string>) {},
    clearData() {
      return initialState;
    },
  },
});

export const {
  setDataTask,
  changeNewTaskTitle,
  changeNewTaskDescription,
  setProcessTask,
  processTask,
  clearNewTaskData,
  changePriority,
  markTaskAsDone,
  deleteTask,
  addComment,
  setPriorityTaskSelected,
  changePriorityTaskSelected,
  clearData,
} = slice.actions;

export const TaskSlice = slice.reducer;
