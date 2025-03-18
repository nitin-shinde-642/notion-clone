'use client'
import { db } from "@/firebase"
import { cn } from "@/lib/utils"
import { doc } from "firebase/firestore"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useDocumentData } from "react-firebase-hooks/firestore"

function MenuItem({ id }: {
    id: string
}) {
    const [data] = useDocumentData(doc(db, 'documents', id))
    const params = useParams();
    if (!data) return;
    const docId = params?.id;
    const isActive = docId === id;
    return (
        <Link
            href={`/doc/${id}`}
            className={cn(
                'border p-2 rounded-md block my-2',
                isActive
                    ? 'bg-gray-300 dark:bg-gray-800 border-gray-800 dark:border-gray-200'
                    : 'bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-800'
            )}
        >
            <p className="truncate">{data.title}    </p>
        </Link>
    )
}
export default MenuItem
