import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"
import { DeletePaswwordAction } from "../_actions/delete_password-actions"
import { toast } from "sonner"

interface Props {
    id: string
}


export function PasswordDeleteDialog({id }: Props) {

    const queryClient = useQueryClient() 
    
    const {mutate, isPending} = useMutation({
        mutationFn: (id: string) => DeletePaswwordAction(id),
        async onSuccess(data) {
            toast.success(`Contraseña ${data.title} eliminada correctamente`)

        queryClient.invalidateQueries({
            queryKey: ['passwords'],
            exact: true
        })
        
        },
        onError(error) {
            toast.error(`Error al eliminar la contraseña: ${error instanceof Error ? error.message : 'Error desconocido'}`)
        }
        
    })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
            <Trash2 />
            Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Seguro que quieres Elimanarlo?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta accion no se puede deshacer. Esto eliminará 
            permanentemente tu cuenta y eliminará tus datos de nuestros servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
          onClick={() => {mutate(id)}}
          disabled={isPending}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default PasswordDeleteDialog