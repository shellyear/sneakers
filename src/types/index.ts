export type SneakerData = {
  _id: string;
  name: string;
  brand: string;
  price: number;
  size: number;
  year: number;
};

export type Sneaker = Omit<SneakerData, "_id">;
