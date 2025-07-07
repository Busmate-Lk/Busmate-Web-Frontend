import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Admin Login - BUSMATE LK",
    description: "Secure admin login for BUSMATE LK transportation system",
}

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative">
            {/* Background pattern using CSS custom properties */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                }}
            />

            {/* Main content */}
            <div className="relative z-10">
                {children}
            </div>

            {/* Footer */}
            <footer className="absolute bottom-0 left-0 right-0 text-center py-4 text-sm text-gray-500">
                <p>Ministry of Transport - Government of Sri Lanka</p>
            </footer>
        </div>
    )
}