import {z} from 'zod';
import { formateNumberWithDecimal } from './utils';


const currency = z.string().refine((value)=> /^\d+(\.\d{2}) ?$/.test(formateNumberWithDecimal(Number(value))), {
    message : "Invalid price format. Price must be a string in the format '123.45'"
})
export const insertProductSchema = z.object({
    name : z.string().min(3, "Product name must be at least 3 characters long"),
    slug : z.string().min(3, "Product slug must be at least 3 characters long"),
    category : z.string().min(3, "Product category must be at least 3 characters long"),
    brand : z.string().min(3, "Product brand must be at least 3 characters long"),
    description : z.string().min(3, "Product description must be at most 3 characters long"),
    stock : z.coerce.number(),
    numReviews : z.coerce.number(),
    images : z.array(z.string()).min(1,'At least one image is required'),
    isFeatured : z.boolean(),
    banner : z.string().nullable(),
    colors : z.array(z.string()).min(1,'At least one color is required'),
    sizes : z.array(z.string()).min(1,'At least one size is required'),
    price : currency
})

export const signInFormSchema = z.object({ 
    email : z.string().email("Invalid email address"),
    password : z.string().min(6, "Password must be at least 6 characters long")
})