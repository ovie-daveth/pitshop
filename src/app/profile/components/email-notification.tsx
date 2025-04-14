"use client"

import { Button, Checkbox } from "@headlessui/react"
import type React from "react"

import { useState } from "react"

export default function EmailNotifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "Payroll",
      description: "When you need to be reminded of upcoming and/or late payrolls",
      checked: true,
    },
    {
      id: 2,
      type: "Payroll",
      description: "When you need to be reminded of upcoming and/or late payrolls",
      checked: true,
    },
    {
      id: 3,
      type: "Payroll",
      description: "When you need to be reminded of upcoming and/or late payrolls",
      checked: true,
    },
    {
      id: 4,
      type: "Payroll",
      description: "When you need to be reminded of upcoming and/or late payrolls",
      checked: true,
    },
    {
      id: 5,
      type: "Payroll",
      description: "When you need to be reminded of upcoming and/or late payrolls",
      checked: true,
    },
    {
      id: 6,
      type: "Payroll",
      description: "When you need to be reminded of upcoming and/or late payrolls",
      checked: true,
    },
  ])

  const toggleNotification = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, checked: !notification.checked } : notification,
      ),
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle save notifications
    console.log("Saving notifications:", notifications)
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-medium text-gray-900 mb-2">Email notifications</h2>
      <p className="text-sm text-gray-500 mb-6">
        We will send you notifications to inform you of any updates and/or changes as events occur for you or your
        business in Pitoup. Select which notifications you want to receive below:
      </p>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{notification.type}</div>
                <div className="text-sm text-gray-500">{notification.description}</div>
              </div>
              <Checkbox
                id={`notification-${notification.id}`}
                checked={notification.checked}
                onChange={() => toggleNotification(notification.id)}
                className="h-5 w-5 border-blue-500 text-blue-600 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        <Button type="submit" className="mt-6 bg-blue-600 hover:bg-blue-700">
          Save
        </Button>
      </form>
    </div>
  )
}
