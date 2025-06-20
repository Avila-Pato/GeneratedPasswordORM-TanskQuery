// este componente siempre se ejecuta en el servidor para que se lean las llaves de encriptacion
"use server";
import { cryptr } from "@/lib/cripto";
import prisma from "@/lib/prisma";
import { PasswordChemaType, passwordSchema } from "@/schema/password.schema";

// Valiida el formato del password y otros datos que sean correctos usando un schema probablemente usando zod 
// encripta el password
// y lo guarda en la base de datos
export const CreatePasswordAction = async (newPassword: PasswordChemaType) => {
    const parseBody = passwordSchema.safeParse(newPassword);

    if (!parseBody.success) {
        throw new Error(
            `Validation failed: ${parseBody.error.errors
                .map(e => e.message)
                .join(", ")}`
        );
    }

    const { password, ...restItems } = parseBody.data;

    // console.log("Password validado:", password);
    // console.log("Otros datos:", restItems);

     // aqui el passwor dpasa el texto de validacion y se encripta
     // ejemplo "password123" se convierte en "asdasdq3rq23e2q2dasd2"
    const encryptedPassword = cryptr.encrypt(password);

    // Lo guarda en la base de datos encriptado 
    
    return await prisma.password.create({
        data : { ...restItems, encryptedPassword }
    })
    
};
