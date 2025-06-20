"use client"
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getPasswordAction } from '../_actions/get_password'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CopyIcon } from 'lucide-react'
import { toast } from 'sonner'
import PasswordOptionTags from './password-options-tags'
import PasswordDeleteDialog from './password_delete_dialog'

const PasswordLists = () => {

    const {data, error, isPending} = useQuery({
        queryKey: ['passwords'], // Esta clave es única para identificar la consulta
        queryFn: getPasswordAction, // Esta función se encarga de obtener las contraseñas desde la base de datos
    })
    const handleCopyPassword = (password: string) => {
        navigator.clipboard.writeText(password).then(() => {
            toast.success('Contraseña copiada Correctamente')
        })
    }

    if(isPending) {
        return <div className='text-center text-gray-500'>Cargando contraseñas...</div>
    }

    if(error) {
        return <div className='text-center text-red-500'>Error al cargar las contraseñas: {error instanceof Error ? error.message : 'Error desconocido'}</div>
    }

    if(!data || data.length === 0) {
        return <div className='text-center text-gray-500'>No tienes contraseñas guardadas.</div>
    }


  return (
    <div className='max-w-2xl mx-auto p-6 space-y-6'>
        <section className='text-center space-y-1'>
            <h2 className='text-2xl font-bold text-gray-800'>
                Listado de contraseñas guardadas
            </h2>
                <p className='text-sm text-gray-500'>
                    Tus contraseñas guardadas aparecerán aquí.
                </p>
        </section>
        <section className='space-y-4'>
        {
            data.map(item => (
                <Card key={item.id} >
                    <CardContent className='p-4 flex justify-between items-center gap-4'>
                        <section>
                            <p className='font-bold text-gray-800'>
                                {item.title}
                            </p>
                            <p className='text-sm text-gray-500 my-2'>
                                Longitud {item.Length} caracteres
                            </p>
                            <PasswordOptionTags passwordConfig={item} />
                        </section>
                        <section className='flex flex-col space-y-2'>
                        <Button
                         className='cursor-pointer' 
                         onClick={(  ) => {handleCopyPassword(item.descryptedPassword)}}
                         //{handleCopyPassword(item.descryptedPassword)}} copia el texto desencriptado de la contraseña
                        >
                            <CopyIcon />
                            Copiar
                        </Button>
                        <PasswordDeleteDialog  id={item.id}/>
                        </section>
                    </CardContent>
                </Card>
            ))
        }
        </section>
        </div>
  )
}

export default PasswordLists