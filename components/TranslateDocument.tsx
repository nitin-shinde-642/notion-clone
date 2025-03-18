import { Language } from '@/typing'
import * as Y from 'yjs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { FormEvent, useState, useTransition } from 'react'
import { Button } from './ui/button'
import { BotIcon, LanguagesIcon, Loader2Icon } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import Markdown from 'react-markdown'
import { toast } from 'sonner'
function TranslateDocument({ doc }: { doc: Y.Doc }) {
    const languages: Language[] = [
        'english',
        'hindi',
        'spanish',
        'portuguese',
        'french',
        'german',
        'chinese',
        'arabic',
        'russian',
        'japanese',
    ]
    const [isOpen, setIsOpen] = useState(false)
    const [language, setLanguage] = useState('')
    const [summary, setSummary] = useState('')
    const [isPending, startTransition] = useTransition()
    const handleTranslate = (e: FormEvent) => {
        e.preventDefault()

        startTransition(async () => {
            const documentData = doc.get('document-store').toJSON()
            const res = await fetch(`${process.env.NEXT_PUBLIC_CF_BASE_URL}/translateDocument`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    documentData,
                    targetLang: language
                })
            })
            if (res.ok) {
                const { translated_text } = await res.json()
                setSummary(translated_text)
                toast.success('Translated Summary Successfully!')
            } else {
                toast.error('unable to get response from AI')
            }
        })
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant={'outline'}>
                <DialogTrigger> <LanguagesIcon /> Translate</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Translate the Document</DialogTitle>
                    <DialogDescription>
                        Select a Language and AI will translate a summary of the document in the selected language
                    </DialogDescription>
                    <hr className='mt-5' />
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
                <form onSubmit={handleTranslate} className='flex gap-2'>
                    <Select value={language} onValueChange={val => setLanguage(val)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Language" />
                        </SelectTrigger>
                        <SelectContent>
                            {languages.map(lang => (
                                <SelectItem key={lang} value={lang}>
                                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button type='submit' disabled={!language || isPending}>
                        {isPending ? <>Translating <Loader2Icon size={32} className="animate-spin" /></> : <>Translate</>}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default TranslateDocument