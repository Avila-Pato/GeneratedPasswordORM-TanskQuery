"use server"

import prisma from "@/lib/prisma"

export const DeletePaswwordAction = async (id: string) => {
    return await prisma.password.delete({
        where: { id}
    })
}