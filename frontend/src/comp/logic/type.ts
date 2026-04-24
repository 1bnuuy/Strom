export type DataType = {
  id: string | null;
  cover: string;
  title: string;
  artist: string;
  fileURL: string;
  favorited: boolean;
};

export type DataContextType = {
  data: DataType[];
  FETCH: () => Promise<void>;
  loading: boolean;
  authenticated: boolean;
  username: string
};

export type ClientReloadType = {
  url: string;
  options?: RequestInit
}

export type PostType = {
  cover: string;
  title: string;
  artist: string;
  file: File
}

export type PatchType = {
  id: string;
} & Partial<Omit<DataType, "id">>;

export type DeleteType = {
  id: string;
} & Partial<Omit<DataType, "id">>;

export type RegisterType = {
  username: string;
  password: string;
};

export type LoginType = RegisterType