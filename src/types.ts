type Pack = {
  size: number;
  price: number;
};

interface Product {
  code: string;
  packs: Pack[];
}
