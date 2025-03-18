import * as Y from 'yjs'
import { LiveblocksYjsProvider } from '@liveblocks/yjs'
import { BlockNoteView } from '@blocknote/shadcn'
import '@blocknote/core/fonts/inter.css'
import '@blocknote/shadcn/style.css'
import { useSelf } from '@liveblocks/react/suspense'
import { BlockNoteEditor } from '@blocknote/core'
import { useCreateBlockNote } from '@blocknote/react'
import stringToColor from '@/lib/stringToColor'

function BlockNote({ doc, provider, darkMode }: { doc: Y.Doc, provider: LiveblocksYjsProvider, darkMode: boolean }) {
    const userInfo = useSelf(me => me.info)
    const editor: BlockNoteEditor = useCreateBlockNote({
        collaboration: {
            provider,
            fragment: doc.getXmlFragment('document-store'),
            user: {
                name: userInfo?.name,
                color: stringToColor(userInfo?.email)
            }
        }
    })
    return (
        <div className='relative max-6-xl max-auto'>
            <BlockNoteView className='min-h-screen' editor={editor} theme={darkMode ? 'dark' : 'light'} />
        </div>
    )
}
export default BlockNote