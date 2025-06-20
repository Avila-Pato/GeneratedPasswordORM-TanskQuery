"use client";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { PasswordChemaType, passwordSchema } from "@/schema/password.schema";
import { PasswordConfig } from "@/lib/password";
import PasswordOptionTags from "./password-options-tags";


interface Props {
    password: string
    passwordConfig: PasswordConfig
}


const FormSavePassword = ({ password, passwordConfig }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    // 1. Define your form.
    const form = useForm<PasswordChemaType>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            title: "",
            password: password || "", // Use the password prop if available
        },
    })

    useEffect(() => {
        if (isOpen) {
            form.setValue("password", password || "");
            form.setValue("length", passwordConfig.length);
            form.setValue("hasLowercase", passwordConfig.hasLowerCase );
            form.setValue("hasUppercase", passwordConfig.hasUppercase );
            form.setValue("hasNumbers", passwordConfig.hasNumbers );
            form.setValue("hasSymbols", passwordConfig.hasSymbols );

        }

    },[ isOpen, password, passwordConfig, form])

    // 2. Define a submit handler.
    function onSubmit(values: PasswordChemaType) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    <SaveIcon />
                    Guardar contraseña
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Guardar contraseña</DialogTitle>
                    <DialogDescription>
                        Ingresa los datos para guardar tu contraseña.
                    </DialogDescription>
                </DialogHeader>
                <section className="space-y-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {/* titulo de la contraseña */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Titulo de la contraseña</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ejemplo.. Google, Facebook " {...field}  className="h-12"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* descripcion de la contraseña */}

                                 <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Titulo de la contraseña</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled placeholder="3d3#XC%^" className="h-12 bg-gray-100 font-mono text-shadow-gray-800"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-gray-200 rounded-xl p-4">
                                <h3 className="text-sm font-semibold text-blue-800 mb-3 ">
                                    Configuración de la contraseña aplicada
                                </h3>
                                <div className="space-y-4 text-sm">
                                    <p>
                                        <span className="font-bold">
                                            Longitud de la contraseña:
                                            {passwordConfig.length} caracteres
                                        </span>

                                    </p>
                                    <PasswordOptionTags passwordConfig={passwordConfig} />
                                </div>
                            </div>

                        </form>
                    </Form>

                </section>
{/*                 
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="name-1">Nombre</Label>
                        <Input id="name-1" name="name" placeholder="Nombre" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="username-1">Usuario</Label>
                        <Input id="username-1" name="username" placeholder="Usuario" />
                    </div>
                </div> */}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                        onClick={form.handleSubmit(onSubmit)} 
                        type="submit">Guardar Contraseña</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default FormSavePassword;
