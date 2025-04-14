"use client"

import { Button, Input, Label } from "@headlessui/react"
import type React from "react"

import { useState } from "react"

export default function PasswordForm() {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswords((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password change
    console.log("Changing password")
  }

  return (
    <div className="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="current">Current Password</Label>
          <Input
            id="current"
            name="current"
            type="password"
            value={passwords.current}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="new">New Password</Label>
          <Input id="new" name="new" type="password" value={passwords.new} onChange={handleChange} className="mt-1" />
        </div>

        <div>
          <Label htmlFor="confirm">Confirm New Password</Label>
          <Input
            id="confirm"
            name="confirm"
            type="password"
            value={passwords.confirm}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Save
        </Button>
      </form>
    </div>
  )
}
