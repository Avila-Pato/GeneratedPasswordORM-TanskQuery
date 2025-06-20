import {z} from "zod"



export const passwordSchema = z.object({
    title: z.string().trim().min(1, "El título es obligatorio"),
    password: z.string().trim().min(4, "La contraseña es obligatoria minimo 4 caracteres"),
    Length: z.coerce.number().min(4).max(128).optional(),
    hasUppercase: z.boolean().optional(),
    hasLowercase: z.boolean().optional(),
    hasNumbers: z.boolean().optional(),
    hasSymbols: z.boolean().optional(),

})
export type PasswordChemaType = z.infer<typeof passwordSchema>