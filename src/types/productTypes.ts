export type TProduct = {
    _id: string;
    name: string;
    price: number;
    category: string;
    description: string;
    ratings: number;
    imageUrls: string[];
    stock: number;
    isFeatured: boolean;
    isBestSelling: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type TCartProduct = {
  _id: string;
  name: string;
  price: number;
  imageUrls: string[];
};


export type TCartItem = {
  _id: string;
  productId: TCartProduct;
  quantity: number;
};


export type TCart = {
  _id: string;
  userId: string;
  items: TCartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};


export type TGetCartResponse = {
  success: boolean;
  message: string;
  data: TCart;
};


export type TAddToCartPayload = {
  productId: string;
  quantity: number;
};

export type TUpdateCartPayload = {
  id: string;
  quantity: number;
};


export type TDeleteCartPayload = {
  id: string;
};