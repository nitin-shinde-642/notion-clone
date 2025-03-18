'use client'
import { JSX, ReactNode, useState } from "react"
import { ClientSideSuspense, RoomProvider as RoomProviderWrapper, useErrorListener } from "@liveblocks/react/suspense"
import { Loader2Icon } from "lucide-react"
import LiveCursorProvider from "./LiveCursorProvider"

function RoomProvider({ roomId, children }: { roomId: string, children: ReactNode }) {
    const [loadingFragment, setLoadingFragment] = useState<JSX.Element>(<Loader2Icon size={50} className="animate-spin" />)

    useErrorListener(() => {
        setLoadingFragment(<h2 className="text-3xl text-red-600">Your not in this Room</h2>)
    })

    return (
        <RoomProviderWrapper
            id={roomId}
            initialPresence={{ cursor: null }}
        >
            <ClientSideSuspense fallback={<div className="flex justify-center items-center mt-10">
                {loadingFragment}
            </div>}>
                <LiveCursorProvider>{children}</LiveCursorProvider>
            </ClientSideSuspense>
        </RoomProviderWrapper >
    )
}
export default RoomProvider