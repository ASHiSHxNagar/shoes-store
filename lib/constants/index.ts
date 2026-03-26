export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Shoes Store";
export const NEXT_PUBLIC_APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Modern Website in Nextjs 15";
export const SERVER_URL = process.env.SERVER_URL || "http://localhost:3000/";
export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

export const signInDefaultValue={
    email : "",
    password : ""
}