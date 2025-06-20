"use client";
import { Badge } from '@/components/ui/badge'
import { PasswordConfig } from '@/lib/password'
import React from 'react'

interface Props {
    passwordConfig: PasswordConfig
}

const PasswordOptionTags = ({ passwordConfig }: Props) => {
  return (
    <div className='flex flex-wrap gap-2'>
        {
            [
                {
                    condition: passwordConfig.hasLowerCase,
                    label: "Minusculas",
                },
                 {
                    condition: passwordConfig.hasUppercase,
                    label: "Mayusculas",
                },
                 {
                    condition: passwordConfig.hasNumbers,
                    label: "Numeros",
                },
                 {
                    condition: passwordConfig.hasSymbols,
                    label: "Simbolos",
                },
            ]
            .filter((item) => item.condition)
            .map((item, index) => (
                <Badge key={index}> 
                    {item.label}
                </Badge>
            ) )

        }

    </div>
  )
}

export default PasswordOptionTags