import WidgetItem from "@/components/WidgetItem";
import { products, type Product } from "@/products/data/products";
import { ItemCard } from "@/shopping-cart";

import { cookies } from "next/headers";

export const metadata = {
  title: "Carrito de compras",
  description: "Carrito de compras",
};

interface ProductInCart {
  product: Product;
  quantity: number;
}

// esta function retorna un arreglo de los productos
const getProductsInCart = (cart: { [id: string]: number }): ProductInCart[] => {
  // vamos a generar el array de los productos
  const productsInCart: ProductInCart[] = [];

  // ahora hacemos el barrido de los productos,
  for (const id in cart) {
    // esto nos trae toda la información del producto que coincida con el id
    const product = products.find((prod) => prod.id === id);
    // si el product existe lo vamos a pushear en productsInCart
    if (product) {
      productsInCart.push({ product, quantity: cart[id] });
    }
  }
  return productsInCart;
};

export default async function CartPage() {
  // 1. tomamos las cookies
  const cookiesStore = await cookies();

  // 2. guardamos las cookies en una variable
  const cart = JSON.parse(cookiesStore.get("cart")?.value ?? "{}") as {
    [id: string]: number;
  };

  // 3. Ahora que ya tenemos barrido los productos y guardados en un array lo guardamos
  const productsInCart = getProductsInCart(cart);

  //Para el total a pagar vamos a hacer uso del reduce()
  // prev: valor anterior = 0
  // current : valor actual, es decir, la iteración.

  const totalToPay = productsInCart.reduce((prev, current) => (current.product.price * current.quantity) + prev, 0);

  return (
    <div>
      <h1 className="text-5xl">Productos en el carrito </h1>
      <hr className="mb-2" />
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {productsInCart.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>
        <div className="flex flex-col w-full sm:w-4/12">
          <WidgetItem title="Total a pagar">
            <div className="mt-2 flex justify-center gap-4">
              <h3 className="text-3xl font-bold text-gray-700">${(totalToPay* 1.15).toFixed(2)}</h3>
            </div>
            <span className=" font-bold text-center text-gray-500">
              Impuestos 15%: $ {(totalToPay * 0.15).toFixed(2)}
            </span>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
}
