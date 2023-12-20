export type Dog = {
  id: number;
  name: string;
  description: string;
  image: string;
  isFavorite: boolean;
};

export type ActiveComponent = "favorited" | "unfavorited" | "create" | "all";
