'use client';
interface ProductProps {
  [product: string]: {
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    id: string;
    available: boolean;
    stars: number;
  };
}

interface categoryProps {
  data?: ProductProps;
  category: string;
}

export function SaveDataInLocalStorage(products: ProductProps) {
  localStorage.setItem('All products', JSON.stringify(products));
}

export function VerifyIfExistDataInStorage() {
  if (localStorage.getItem('All products') != null) {
    return true;
  } else {
    return false;
  }
}

export function FetchProductsCategory({ data, category }: categoryProps) {
  let storageProducts = localStorage.getItem('All products');
  let AllProducts;
  let newData = {};

  if (!data && storageProducts != null) {
    AllProducts = JSON.parse(storageProducts);
  } else {
    AllProducts = data;
    data && localStorage.setItem('All products', JSON.stringify(data));
  }

  for (let Product in AllProducts) {
    if (AllProducts[Product].category === category) {
      newData = {
        ...newData,
        [Product]: AllProducts[Product],
      };
    }
  }

  return newData;
}
