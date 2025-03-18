'use client'

import { useRoom } from "@liveblocks/react/suspense"
import { LiveblocksYjsProvider } from '@liveblocks/yjs'
import { useEffect, useState } from "react"
import * as Y from 'yjs'
import { Button } from "./ui/button"
import { MoonIcon, SunIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import BlockNote from "./BlockNote"
import { useTheme } from "next-themes"
import TranslateDocument from "./TranslateDocument"
import ChatToDocument from "./ChatToDocument"

function Editor() {
    const room = useRoom()
    const [doc, setDoc] = useState<Y.Doc>()
    const { theme } = useTheme()
    const [provider, setProvider] = useState<LiveblocksYjsProvider>()
    const [darkMode, setDarkMode] = useState(theme == 'dark' ? true : false)

    useEffect(() => {
        const yDoc = new Y.Doc()
        const yProvider = new LiveblocksYjsProvider(room, yDoc)
        setDoc(yDoc)
        setProvider(yProvider)
        return () => {
            yDoc?.destroy()
            yProvider?.destroy()
        }
    }, [room])
    if (!doc || !provider) return null
    return (
        <div className="max-w-6xl mx-auto w-full">
            <div className="flex items-center gap-2 justify-end mb-10">
                <TranslateDocument doc={doc} />
                <ChatToDocument doc={doc} />
                <Button
                    className={cn('hover:text-white',
                        darkMode
                            ? 'text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700'
                            : 'text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700'
                    )}
                    onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? <SunIcon /> : <MoonIcon />}
                </Button>
            </div>
            <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
        </div>
    )
}
export default Editor