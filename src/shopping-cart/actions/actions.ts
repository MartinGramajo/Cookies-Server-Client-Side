// 'use client'

import { getCookie, hasCookie, setCookie } from "cookies-next";

/* 
Estructura 
cookie: cart 
{
    'uui-123-1':4, // id del producto : cuanto esta llevando
    'uui-123-2':3,
    'uui-123-3':1,
}
*/

// Function para retornar el object de la estructura
export const getCookieCart = (): { [id: string]: number } => {
  if (hasCookie("cart")) {
    const cookieCart = JSON.parse((getCookie("cart") as string) ?? " {}");
    return cookieCart;
  }

  return {};
};

// function para agregar un producto al object de la estructura
export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart();

  if (cookieCart[id]) {
    cookieCart[id] = cookieCart[id] + 1;
  } else {
    cookieCart[id] = 1;
  }
  // actualiza el carrito
  setCookie("cart", JSON.stringify(cookieCart)); // siempre hay que serializarlo como string
};

// function para remover  productos

export const removeProductFromCart = (id: string) => {
  // 1. tomar nuestro carrito
  const cookieCart = getCookieCart();

  // 2. eliminar una propiedad por id (no importa que no exista)
  delete cookieCart[id];

  // 3. actualizar el carrito
  setCookie("cart", JSON.stringify(cookieCart));
};
