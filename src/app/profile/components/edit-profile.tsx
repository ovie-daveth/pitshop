"use client"

import { Button, Input, Label } from "@headlessui/react"
import type React from "react"

import { useState } from "react"

export default function EditProfileForm() {
  const [user, setUser] = useState({
    firstName: "Israel",
    lastName: "Adegbulugbe",
    email: "adegbulugbeisrael@gmail.com",
    phone: "090198990",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Saving profile:", user)
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-start gap-8 mb-8">
        <div>
          <div className="flex items-center justify-center w-24 h-24 text-white text-2xl font-medium bg-purple-500 rounded-full">
            IA
          </div>
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-900">Profile photo</h2>
          <p className="text-sm text-gray-500 mb-4">You can upload images up to 512KB</p>
          <Button  className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
            Upload
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" name="firstName" value={user.firstName} onChange={handleChange} className="mt-1" />
        </div>

        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" name="lastName" value={user.lastName} onChange={handleChange} className="mt-1" />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={user.email} onChange={handleChange} className="mt-1" />
        </div>

        <div>
          <Label htmlFor="phone">Phone number</Label>
          <Input id="phone" name="phone" value={user.phone} onChange={handleChange} className="mt-1" />
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Save
        </Button>
      </form>
    </div>
  )
}
