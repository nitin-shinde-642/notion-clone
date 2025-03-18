'use client'

import { useState, useTransition } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { useRoom } from "@liveblocks/react/suspense"
import { useUser } from "@clerk/nextjs"
import useOwner from "@/lib/useOwner"
import { useCollection } from "react-firebase-hooks/firestore"
import { collectionGroup, query, where } from "firebase/firestore"
import { db } from "@/firebase"
import { Loader2Icon, XIcon } from "lucide-react"
import { removeUserFromDocument } from "@/actions"
import { toast } from "sonner"

function InviteUser() {
    const { user } = useUser()
    const isOwner = useOwner()
    const room = useRoom()
    const [isOpen, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()

    const [usersInRoom] = useCollection(
        user && query(
            collectionGroup(db, "rooms"),
            where('roomId', '==', room.id)
        )
    )


    const handleRemoveUser = (userId: string) => {
        startTransition(async () => {
            if (!user) return
            const { success } = await removeUserFromDocument(room.id, userId)
            if (success) {
                toast.success('User Removed from Document!')
            } else {
                toast.error('Failed to remove User from Document!')
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant={'outline'}>
                <DialogTrigger>Users ({usersInRoom?.docs.length})</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Users with Access</DialogTitle>
                    <DialogDescription>
                        Below is a list of users who have access to this Document
                    </DialogDescription>
                </DialogHeader>
                <hr className="my-2" />
                <div className="flex flex-col space-y-2">
                    {usersInRoom?.docs.map(doc => {
                        return <div key={doc.data().userId} className="flex items-center justify-between">
                            <p className="font-light">
                                {
                                    doc.data().userId === user?.emailAddresses[0].toString()
                                        ? `You (${doc.data().userId})`
                                        : doc.data().userId
                                }
                            </p>
                            <div className="flex items-center gap-2">
                                <p>{doc.data().role}</p>
                                {
                                    isOwner && doc.data().userId !== user?.emailAddresses[0].toString() && (
                                        <Button
                                            variant={'destructive'}
                                            onClick={() => { handleRemoveUser(doc.data().userId) }}
                                            disabled={isPending}
                                            size={'sm'}
                                        >
                                            {isPending
                                                ? <Loader2Icon size={32} className="animate-spin" />
                                                : <XIcon size={32} />}
                                        </Button>
                                    )
                                }
                            </div>
                        </div>
                    })}
                </div>
            </DialogContent>
        </Dialog>
    )
}
export default InviteUser