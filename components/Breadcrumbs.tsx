import { usePathname } from "next/navigation"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import { Fragment } from "react";
import Link from "next/link";

function Breadcrumbs() {
    const pathname = usePathname()
    const segments = pathname.split('/').filter(e => e)
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild><Link href="/">Home</Link></BreadcrumbLink>
                </BreadcrumbItem>
                {
                    segments.map((segment, index) => {
                        if (!segment) return null;
                        const href = `/${segments.slice(0, index + 1).join('/')}`
                        const isLast = index == segments.length - 1;
                        return (
                            <Fragment key={segment}>
                                <BreadcrumbSeparator />
                                {isLast ? (
                                    <BreadcrumbPage>{segment}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbItem >
                                        <BreadcrumbLink asChild><Link href={href}>{segment}</Link></BreadcrumbLink>
                                    </BreadcrumbItem>
                                )}
                            </Fragment>
                        )
                    })
                }
            </BreadcrumbList >
        </Breadcrumb >
    )
}
export default Breadcrumbs