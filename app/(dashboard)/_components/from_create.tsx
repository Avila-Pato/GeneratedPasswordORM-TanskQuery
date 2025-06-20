"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { generatedPassword, PasswordConfig } from '@/lib/password'
import { ArrowUp01, CaseLower, CaseUpper, CopyIcon, Hash, ShieldCheck } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import FormSavePassword from './form_save'

const options = [
    {
        key: "hasUppercase",
        label: "Mayúsculas (A-Z)",  
        icon: <CaseUpper />
    },
    {
        key: "hasLowerCase",
        label: "Minúsculas (a-z)",
        icon: <CaseLower />
    },
    {
        key: "hasNumbers",
        label: "Números (0-9)",
        icon: <ArrowUp01 />
    },
    {
        key: "hasSymbols",
        label: "Símbolos (!@#$%^)",
        icon: <Hash />
    }
] as const;

const PasswordDisplay = React.memo(({ password }: { password: string }) => (
    <div className='flex-1 min-w-0'>
        <p className='text-sm text-slate-400 mb-1'>
            Tu contraseña generada es:
        </p>
        <p className='text-xl font-mono break-all text-green-400 leading-relaxed'>
            {password}
        </p>
    </div>
));

PasswordDisplay.displayName = 'PasswordDisplay';

const FormCreatePassword = () => {
    const [password, setPassword] = useState("")
    const form = useForm<PasswordConfig>({
        defaultValues: {
            hasLowerCase: true,
            hasUppercase: true,
            hasNumbers: true,
            hasSymbols: true,
            length: 10
        }
    })

    useEffect(() => {
        const generated = generatedPassword(form.getValues())
        setPassword(generated)
    }, [form])

    const handleCopyPassword = useCallback(() => {
        navigator.clipboard.writeText(password).then(() => {
            toast.success("Contraseña copiada al portapapeles")
        })
    }, [password])

    const handleGenerate = useCallback(() => {
        const values = form.getValues()
        const newPassword = generatedPassword(values)
        setPassword(newPassword)
    }, [form])

    return (
        <div className='max-w-2xl mx-auto p-6 space-y-6'>
            <header className='text-center space-y-2'>
                <h1 className='text-3xl font-bold text-gray-700'>
                    Generador de contraseñas
                </h1>
                <p className='text-gray-600'>Crear contraseñas seguras, aleatorias y personalizdas</p>
            </header>

            <Card className='bg-gradient-to-r from-gray-900 to-gray-800'>
                <CardContent className='flex items-center justify-between gap-4'>
                    <PasswordDisplay password={password} />
                    <Button
                        onClick={handleCopyPassword}
                        className="shrink-0 cursor-pointer bg-blue-600 hover:bg-blue-800 transition-all duration-200 hover:scale-105"
                    >
                        <CopyIcon className='w-4 h-4' />
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                        Configura tu contraseña
                    </h2>
                    <FormProvider {...form}>
                        <form className='space-y-6' onSubmit={(e) => {
                            e.preventDefault()
                            handleGenerate()
                        }}>
                            <FormField
                                control={form.control}
                                name="length"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Longitud de la contraseña</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                className="text-center text-lg font-semibold h-12"
                                                min={4}
                                                max={32}
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    handleGenerate()
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className='space-y-3'>
                                <h3 className='text-sn font-medium text-gray-700'>
                                    Incluir caracteres especiales
                                </h3>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                                    {options.map(({ key, label, icon }) => (
                                        <FormField
                                            key={key}
                                            control={form.control}
                                            name={key}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={(checked) => {
                                                                    field.onChange(checked)
                                                                    handleGenerate()
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <span className='text-xl'>{icon}</span>
                                                        <div>
                                                            <p>{label}</p>
                                                        </div>
                                                    </FormLabel>
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4'>
                                <Button type='submit'>
                                    <ShieldCheck />
                                    Generar contraseña
                                </Button>
                                <FormSavePassword  
                                    password={password}
                                    passwordConfig={form.getValues()}
                                />
                            </div>
                        </form>
                    </FormProvider>
                </CardContent>
            </Card>
        </div>
    )
}

export default React.memo(FormCreatePassword)