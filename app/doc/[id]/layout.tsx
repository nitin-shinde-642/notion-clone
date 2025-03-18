import RoomProvider from "@/components/RoomProvider"
import { auth } from "@clerk/nextjs/server"
import { ReactNode } from "react"

async function DocumentLayout({ children, params }: { children: ReactNode, params: Promise<{ id: string }> }) {
    auth.protect()
    const { id } = await params
    return (
        <RoomProvider roomId={id}>{children}</RoomProvider>
    )
}
export default DocumentLayout