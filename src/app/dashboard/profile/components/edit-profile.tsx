"use client"

import { Button, Input } from "@headlessui/react"
import type React from "react"

import { useState } from "react"
import { FiLoader } from "react-icons/fi"

export default function EditProfileForm() {
  const [user, setUser] = useState({
    firstName: "Israel",
    lastName: "Adegbulugbe",
    email: "adegbulugbeisrael@gmail.com",
    phone: "090198990",
  })

  const [loading, setloading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setloading(true)
    setTimeout(() => {
      setloading(false)
    }, 2000)
    console.log("Saving profile:", user)
  }

  return (
    <div className="max-w-md">
      <div className="flex items-start gap-8 mb-8">
        <div>
          <div className="flex items-center justify-center w-24 h-24 text-white lg:text-2xl font-medium bg-[#D90BD9] rounded-full">
            IA
          </div>
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-900">Profile photo</h2>
          <p className="text-sm text-gray-500 mb-4">You can upload images up to 512KB</p>
          <Button  className="text-[#E75937] border-[#E75937] border-2 rounded-md px-4 py-1 hover:bg-red-50 hover:text-red-600 font-light">
            Upload
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-1">
          <label className="font-normal text-sm" htmlFor="firstName">First Name</label>
          <Input
            id="firstName"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            className="border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2.5 rounded-md focus:outline-none text-sm font-light"
          />

        </div>

        <div className="flex flex-col gap-1">
          <label className="font-normal text-sm" htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" value={user.lastName} onChange={handleChange} className="border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2.5 rounded-md focus:outline-none font-light text-sm" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-normal text-sm" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={user.email} onChange={handleChange} className="border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2.5 rounded-md focus:outline-none font-light text-sm" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-normal text-sm" htmlFor="phone">Phone number</label>
          <input id="phone" name="phone" value={user.phone} onChange={handleChange} className="border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2.5 rounded-md focus:outline-none font-light text-sm" />
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
