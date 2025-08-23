"use client"

import { useState } from "react"
import { Button } from "@/components/admin/ui/button"
import { Input } from "@/components/admin/ui/input"
import { Label } from "@/components/admin/ui/label"
import { Checkbox } from "@/components/admin/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/card"
import { Bus, Eye, EyeOff, User, HelpCircle, Phone } from "lucide-react"
import Link from "next/link"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg text-center py-8">
        <div className="flex justify-center mb-4">
          <div className="bg-white rounded-full p-3">
            <Bus className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">BUSMATE LK</CardTitle>
        <CardDescription className="text-blue-100">Smart Transport Management</CardDescription>
        <div className="bg-blue-800/30 rounded-full px-3 py-1 text-sm mt-2 inline-block">Admin Portal</div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600 mt-1">Sign in to access your dashboard</p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email or Username</Label>
            <div className="relative">
              <Input id="email" type="text" placeholder="Enter your email or username" className="pl-10" />
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm">
                Remember me
              </Label>
            </div>
            <Link href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
            <Link href="/admin">Sign In</Link>
          </Button>
        </form>

        <div className="flex justify-center space-x-6 mt-8 pt-6 border-t">
          <Link href="#" className="flex items-center text-gray-600 hover:text-blue-600">
            <HelpCircle className="h-4 w-4 mr-1" />
            Help
          </Link>
          <Link href="#" className="flex items-center text-gray-600 hover:text-blue-600">
            <Phone className="h-4 w-4 mr-1" />
            Support
          </Link>
        </div>

        <div className="text-center mt-6 text-xs text-gray-500">
          <p>© 2024 BUSMATE LK. Government of Sri Lanka</p>
          <div className="flex justify-center items-center space-x-4 mt-2">
            <span className="flex items-center">🔒 Secure Login</span>
            <span className="flex items-center">🇱🇰 Sri Lanka</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
