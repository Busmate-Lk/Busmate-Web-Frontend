"use client"

import { useState, createContext, useContext } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

interface LayoutContextType {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export function useLayout() {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider")
  }
  return context
}

interface TimeKeeperLayoutProps {
  children: React.ReactNode
  activeItem?: string
  pageTitle?: string
  pageDescription?: string
}

export function TimeKeeperLayout({ children, activeItem = "dashboard", pageTitle, pageDescription }: TimeKeeperLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <LayoutContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      <div className="min-h-screen bg-slate-100">
        <Sidebar activeItem={activeItem} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        
        <div className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'ml-16' : 'ml-64'} min-h-screen`}>
          <Header pageTitle={pageTitle} pageDescription={pageDescription} />
          
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </LayoutContext.Provider>
  )
}
