import { RootState } from "./store";

export const userSelector = (state: RootState) => state.user;

export const taskSelector = (state: RootState) => state.task;
