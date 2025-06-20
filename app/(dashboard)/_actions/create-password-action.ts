import { PasswordChemaType, passwordSchema } from "@/schema/password.schema";

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

    // Aquí harías la llamada al backend, por ejemplo:
    // const response = await fetch("/api/password", { ... });

    console.log("Password validado:", password);
    console.log("Otros datos:", restItems);

    return parseBody.data;
};
