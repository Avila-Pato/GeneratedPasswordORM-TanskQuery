"use server";

import { cryptr } from "@/lib/cripto"
import prisma from "@/lib/prisma"

export const getPasswordAction = async () => {
    const passwords = await prisma.password.findMany()

    // regresando contraseñas desencriptadas
    return passwords.map(item => ({
        ...item,
        descryptedPassword: cryptr.decrypt(item.encryptedPassword)
    }))

}