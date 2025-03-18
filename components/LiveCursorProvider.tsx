'use client'
import { useMyPresence, useOthers } from "@liveblocks/react/suspense"
import { PointerEvent, ReactNode } from "react"
import FollowPointer from "./FollowPointer"

function LiveCursorProvider({ children }: { children: ReactNode }) {
    const [myPresence, updateMyPresence] = useMyPresence() // eslint-disable-line no-unused-vars
    const others = useOthers()
    const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
        const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) }
        updateMyPresence({ cursor })
    }
    const handlePointerLeave = () => {
        updateMyPresence({ cursor: null })
    }
    return (
        <div onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
            {others
                .filter(other => other.presence.cursor)
                .map(({ connectionId, presence, info }) => (
                    <FollowPointer
                        key={connectionId}
                        info={info}
                        x={presence.cursor!.x}
                        y={presence.cursor!.y}
                    />))}
            {children}
        </div>
    )
}
export default LiveCursorProvider