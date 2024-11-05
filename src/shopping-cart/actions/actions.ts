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

export const removeSingleItemFromCart = (id: string) => {
  // 1. tomar nuestro carrito
  const cookieCart = getCookieCart();

  // 2. Preguntamos si existe el product

  if (!cookieCart[id]) return;

  // 3.Si existe vamos a eliminar de uno en uno y en caso de llegar a 0 borrar la tarjeta
  if (cookieCart[id] > 0) {
    cookieCart[id]--;
  }
  if (cookieCart[id] === 0) {
    // elimina la propiedad si es 0 o menos
    delete cookieCart[id];
  }

  // 3. actualizar el carrito
  setCookie("cart", JSON.stringify(cookieCart));
};

// Solución de clase
export const removeTSingleItemFromCart = (id: string) => {
  // 1. tomar nuestro carrito
  const cookieCart = getCookieCart();

  // 2. Preguntamos si existe el product. Regla de seguridad

  if (!cookieCart[id]) return;

  // 3.Creamos unas const para ser mas facil de leer
  const itemsInCart = cookieCart[id] - 1;

  // 4.   Hacemos la verificación de la cart
  if (itemsInCart <= 0) {
    delete cookieCart[id];
  } else {
    cookieCart[id] = itemsInCart; // actualizamos el carrito con los items restantes
  }

  // 5. actualizar el carrito
  setCookie("cart", JSON.stringify(cookieCart));
};
