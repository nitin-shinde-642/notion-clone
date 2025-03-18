'use client'

import { useState, useTransition } from "react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { Loader2Icon } from "lucide-react"
import { useRoom } from "@liveblocks/react/suspense"
import { useRouter } from "next/navigation"
import { deleteDocument } from "@/actions"
import { toast } from "sonner"

function DeleteDocument() {
    const [isOpen, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const room = useRoom()
    const router = useRouter()
    const handleDelete = () => {
        if (!room.id) return;
        startTransition(async () => {
            const { success } = await deleteDocument(room.id)
            if (success) {
                setIsOpen(false)
                router.replace('/')
                toast.success('Room Deleted Successfully!')
            } else {
                toast.error('Failed to Delete room!')
            }
        })
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant={'destructive'}>
                <DialogTrigger>Delete</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure you want to Delete?</DialogTitle>
                    <DialogDescription>
                        This will delete the document and all it&apos;s contents, removing all users from the Document.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end gap-2">
                    <Button type="button" variant={'destructive'} onClick={handleDelete} disabled={isPending}>
                        {isPending ? <>Deleting <Loader2Icon size={32} className="animate-spin" /></> : 'Delete'}
                    </Button>
                    <DialogClose asChild><Button type="button" variant={'secondary'}>Close</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default DeleteDocument