'use client'

import { FormEvent, useState, useTransition } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { Loader2Icon } from "lucide-react"
import { useRoom } from "@liveblocks/react/suspense"
import { inviteUserToRoom } from "@/actions"
import { toast } from "sonner"
import { Input } from "./ui/input"

function InviteUser() {
    const [isOpen, setIsOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [isPending, startTransition] = useTransition()
    const room = useRoom()
    const handleInvite = (e: FormEvent) => {
        e.preventDefault()
        if (!room.id || !email) return;
        startTransition(async () => {
            const { success } = await inviteUserToRoom(email, room.id)
            if (success) {
                setIsOpen(false)
                setEmail('')
                toast.success('User Added successfully!')
            } else {
                toast.error('Failed to add User!')
            }
        })
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant={'outline'}>
                <DialogTrigger>Invite</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite a user to Collaborate</DialogTitle>
                    <DialogDescription>
                        Enter the email of the user you want to invite
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleInvite} className="flex gap-2">
                    <Input
                        type="email"
                        placeholder="Email"
                        className="w-full"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Button type="submit" disabled={!email || isPending}>
                        {isPending ? <>Inviting <Loader2Icon size={32} className="animate-spin" /></> : 'Invite'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default InviteUser