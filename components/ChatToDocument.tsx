import * as Y from 'yjs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { FormEvent, useState, useTransition } from 'react'
import { Button } from './ui/button'
import { BotIcon,  Loader2Icon, MessageCircleCodeIcon } from 'lucide-react'
import Markdown from 'react-markdown'
import { toast } from 'sonner'
import { Input } from './ui/input'
function ChatToDocument({ doc }: { doc: Y.Doc }) {
    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState('')
    const [summary, setSummary] = useState('')
    const [question, setQuestion] = useState('')
    const [isPending, startTransition] = useTransition()
    const handleChatToDocument = (e: FormEvent) => {
        e.preventDefault()
        setQuestion(input)
        setInput('')
        startTransition(async () => {
            const documentData = doc.get('document-store').toJSON()
            const res = await fetch(`${process.env.NEXT_PUBLIC_CF_BASE_URL}/chatToDocument`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    documentData,
                    question
                })
            })
            if (res.ok) {
                const { message } = await res.json()
                setSummary(message.response)
                toast.success('ChatGPT replied Successfully!')
            } else {
                toast.error('unable to get response from AI')
            }
        })
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant={'outline'}>
                <DialogTrigger> <MessageCircleCodeIcon /> Chat to Document</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chat to the Document!</DialogTitle>
                    <DialogDescription>
                        Ask a question and chat to the document with AI
                    </DialogDescription>
                    <hr className='mt-5' />
                    {question && (
                        <p className="mt-5 text-gray-700 dark:text-gray-300">Q: {question}</p>
                    )}
                </DialogHeader>
                {
                    summary && (
                        <div className='flex flex-col items-start max-h-96 overflow-y-auto  rounded-md gap-2 p-5 bg-gray-100 dark:bg-gray-800'>
                            <div className="flex">
                                <BotIcon className='w-10 flex-shrink-0' />
                                <div>
                                    <p className="font-bold">
                                        GPT {isPending ? 'is thinking...' : 'Says:'}
                                    </p>
                                    <div>{isPending ? 'Thinking' : <Markdown>{summary}</Markdown>}</div>
                                </div>
                            </div>
                        </div>
                    )
                }
                <form onSubmit={handleChatToDocument} className='flex gap-2'>
                    <Input
                        type='text'
                        placeholder='i.e. what is this about?'
                        className='w-full'
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <Button type='submit' disabled={!input || isPending}>
                        {isPending ? <>Asking <Loader2Icon size={32} className="animate-spin" /></> : <>Ask</>}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default ChatToDocument