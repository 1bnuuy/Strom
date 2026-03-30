export type DataType = {
  id: string | null;
  title: string;
  artist: string;
  fileURL: string;
};

export type PostType = Omit<DataType, "id">;
