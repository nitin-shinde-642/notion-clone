'use client'
import { FormEvent, useEffect, useState, useTransition } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Loader2Icon } from "lucide-react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useDocumentData } from "react-firebase-hooks/firestore"
import useOwner from "@/lib/useOwner"
import DeleteDocument from "./DeleteDocument"
import InviteUser from "./InviteUser"

function UpdateTitle({ id }: { id: string }) {
    const [data] = useDocumentData(doc(db, "documents", id))
    const [input, setInput] = useState('')
    const [isUpdating, startTransition] = useTransition()
    const isOwner = useOwner()
    console.log(isOwner);
    useEffect(() => {
        if (data) {
            setInput(data.title)
        }
    }, [data])
    const updateTitle = (e: FormEvent) => {
        e.preventDefault()
        if (input.trim()) {
            startTransition(async () => {
                await updateDoc(doc(db, "documents", id), {
                    title: input
                })
            })
        }
    }
    return (
        <form onSubmit={updateTitle} className="flex space-x-2 items-center w-full">
            <Input
                value={input}
                onChange={e => setInput(e.target.value)}
            />
            <Button disabled={isUpdating}>
                {isUpdating ? <>Updating <Loader2Icon className="animate-spin" size={32} /> </> : 'Update'}
            </Button>

            {isOwner && (
                <>
                <InviteUser />
                <DeleteDocument />
                </>
            )}
        </form>
    )
}
export default UpdateTitle