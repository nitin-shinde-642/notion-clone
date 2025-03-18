import LiveBlocksProvider from "@/components/LiveBlocksProvider"
import { ReactNode } from "react"

function docLayout({ children }: { children: ReactNode }) {
  return (
    <LiveBlocksProvider>{children}</LiveBlocksProvider>
  )
}
export default docLayout