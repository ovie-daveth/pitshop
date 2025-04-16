"use client"

import { Button } from "@headlessui/react"
import type React from "react"

import { useState } from "react"
import { FiLoader } from "react-icons/fi"

export default function PasswordForm() {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const [loading, setloading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswords((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password change

    setloading(true)
    setTimeout(() => {
      setloading(false)
    }, 2000)

    console.log("Changing password")
  }

  return (
    <div className="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col gap-1">
          <label className="font-normal text-sm" htmlFor="phone">Current Password</label>
          <input id="current" name="current" type="password"  placeholder="Enter your current password" value={passwords.current} onChange={handleChange} className="border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2.5 rounded-md focus:outline-none font-light text-sm" />
      </div>
      <div className="flex flex-col gap-1">
          <label className="font-normal text-sm" htmlFor="new">New Password</label>
          <input id="new" name="new" type="password"  placeholder="Enter your new password" value={passwords.new} onChange={handleChange} className="border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2.5 rounded-md focus:outline-none font-light text-sm" />
      </div>

      <div className="flex flex-col gap-1">
          <label className="font-normal text-sm" htmlFor="confirm">Confirm New Password</label>
          <input id="confirm" name="confirm" type="password"  placeholder="Confirm your new password" value={passwords.confirm} onChange={handleChange} className="border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2.5 rounded-md focus:outline-none font-light text-sm" />
      </div>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-11 text-white rounded-md flex items-center justify-center">
          {
            loading ? <div className="flex items-center gap-2">
              <h3>Updating</h3>
              <FiLoader className="animate-spin h-5 w-5" />
            </div> : "Save"
          }
        </Button>
      </form>
    </div>
  )
}
