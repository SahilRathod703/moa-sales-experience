import { useState } from "react"
import DualNav from "./DualNav"
import ScrollProgress from "./ScrollProgress"

export default function AppShell({ children, navVisible = true }) {
  return (
    <div className="relative">
      <ScrollProgress />
      <DualNav visible={navVisible} />
      <main>
        {children}
      </main>
    </div>
  )
}