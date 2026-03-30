import { DataType } from "../logic/type";

export type InitialPlayerType = {
  currentID: string | null;
  song: DataType[];
  time: number;
  duration: number;
  pause: boolean;
};

export type PlayerActionType =
  | { type: "SELECT"; payload: DataType }
  | { type: "PREVIOUS" }
  | { type: "NEXT" }
  | { type: "TIME"; payload: number }
  | { type: "DURATION"; payload: number }
  | { type: "PAUSE" };

export type PlayerContextType = {
  state: InitialPlayerType;
  dispatch: React.Dispatch<PlayerActionType>;
};
