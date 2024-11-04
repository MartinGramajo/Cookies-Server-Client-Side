## Cookies - Server y Client Side

El objetivo de esta sección es poder grabar y leer cookies, y con las cookies en el lado del servidor, podes construir el contenido deseado en ellas

Puntos que vamos a trabajar:

1. Cookies del lado del servidor

2. Cookies del lado del cliente

3. Carrito de compras

4. Manipulación de cookies

# Development

Pasos para levantar la app en desarrollo

1. Levantar la base de datos. Esto con el docker abierto en nuestra PC.

```
docker compose up -d
```

2. Crear una copia de el .env.template, y renombrarlo a .env
3. Reemplazar las variables de entorno.
4. Ejecutar el comando `npm install`
5. Ejecutar el comando `npm run dev`
6. Ejecutar estos comando de prisma: Estos comando los ejecutamos porque la base al estar totalmente limpia no se ejecutaron los comando de migración ni el de generación del cliente (no hay regeneración del cliente ni tenemos ese schema en sintonía con nuestra base de datos).

```
npx prisma migrate dev
npx prisma generate
```

7. Ejecutar el SEED (esto es para reconstruir la base de datos local ) para [crear la base de datos local](http://localhost:3000/api/seed)

# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

# Prod

# Stage

## Continuación de la app

Hacemos copia del proyecto de la sección anterior para trabajar sobre un nuevo tema. También podemos clonar el repositorio y seguir los pasos que están en development.

## Introducción a las cookies

Las `cookies` nos sirven para tener una comunicación directa desde el cliente al servidor.
En ellas podemos almacenar información no sensible por medios de id o con un string.
Las cookies nos sirven también para leer información util por parte del usuario. Ejemplo: Si un usuario le gusta mucho ver sobre camisetas, podemos utilizar esa información, leerla desde el lado del backend para que al cargarle la aplicación le damos prioridad a ese tipo de producto.

#### Diferencia entre cookies y localStorage

Mientras que con localStorage el traspaso de información es mecánico, es decir, indicamos que bloque del local es lo que vamos a tomar, para al servidor.
En las `cookies` es automático, ya que viajan automáticamente al servidor cuando se hace una petición HTTP. Esto es importante porque al estar trabajando en NEXT tenemos todo generado por SERVER COMPONENT. Por ende pueden leer las cookies para generar el contenido del lado del servidor.

## Diseño de pantalla y componentes

En este punto agregamos una nueva ruta '/dashboard/cookies' y en su page trabajamos un nuevo componente TabBar.tsx.

## Cookies - Client Side

1. Para grabar y leer las cookies depende mucho de donde lo estemos haciendo.

2. [Librería cookie-next](https://www.npmjs.com/package/cookies-next): Este paquete de cookie next nos permite set, get, entre otras acciones a las cookies, sin necesidad de utilizar un context global. Comando => `npm i cookies-next `

3. Utilizamos la librería en el componente donde vamos a guardar o tomar la cookie, en nuestro caso, vamos a trabajar sobre TabBar.tsx

```js
import { setCookie } from "cookies-next";

// esto solo lo podemos hacer desde el lado del cliente
const onTabSelected = (tab: number) => {
  setSelect(tab);
  setCookie("selectedTab", tab.toString()); // si o si tenemos que grabarlo como string.
};
```

> [!NOTA]
>
> Para ver la cookie: vamos al inspeccionar/application/cookies/http://localhost:3000

## Cookies - Server Side

1. [Para leer las cookies desde el lado del servidor](https://nextjs.org/docs/app/api-reference/functions/cookies)

2. Nos recomienda que en el archivo `page.tsx` donde estamos trabajando con nuestras `cookies ` utilicemos el siguiente bloque de código:

```js
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies(); // tomamos el cookieStore para poder utilizar sus distintos métodos.
  const theme = cookieStore.get("theme");
  return "...";
}
```

En nuestro caso:

```js
import { cookies } from "next/headers";
import { TabBar } from "@/components";

export const metadata = {
  title: "Cookies Page",
  description: "Cookies Page",
};

export default async function CookiesPage() {
  const cookieStore = await cookies();
  // Esa condición la agregamos porque en un punto de nuestro app
  // las cookies no están seteadas es decir que son null por ende nos aseguramos
  // que tengan un valor por defecto, en ese caso de 1
  const cookieTab = cookieStore.get("selectedTab")?.value ?? "1";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col">
        <span className="text-3xl">Tabs</span>
        <TabBar />
      </div>
    </div>
  );
}
```

3. Mandamos el `cookieTab` a nuestro component `TabBar`: Pero como esta esperando un dato de tipo number debido a nuestra interface tenemos que convertirlo y lo podemos hacer de varias formas:
   
- Convirtiendo el resultado directamente en la const

```js
const cookieTab = Number(cookieStore.get("selectedTab")?.value ?? "1");
```

- Agregando el + al enviarlo:

```js
<TabBar currentTab={+cookieTab} />
```

## Diseño de pantalla de productos

Lo que hicimos fue agregar una nueva ruta ```/dashboard/products```. Por otra parte, creamos un nuevo component para mostrar en dicha page, ```ProductCard.tsx``` y agregamos una carpeta ```data`` con datos ficticios para nuestra pantalla de productos.

## Mostrar listado de productos

