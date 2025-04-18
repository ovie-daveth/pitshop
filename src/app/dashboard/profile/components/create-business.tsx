"use client"

import { Button, Listbox } from "@headlessui/react"
import { ArrowLeftIcon, CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import { Fragment, useState } from "react"
import { FiLoader } from "react-icons/fi"

interface CreateBusinessFormProps {
  onBack: () => void,
  isEdit?: boolean,
  business?: { id: number; name: string }
}

const countries = [
  { id: 1, name: "United States", value: "us" },
  { id: 2, name: "Canada", value: "ca" },
  { id: 3, name: "United Kingdom", value: "uk" },
]

const states = [
  { id: 1, name: "California", value: "ca" },
  { id: 2, name: "New York", value: "ny" },
  { id: 3, name: "Texas", value: "tx" },
]

const timezones = [
  { id: 1, name: "Pacific Time (PST)", value: "pst" },
  { id: 2, name: "Eastern Time (EST)", value: "est" },
  { id: 3, name: "Coordinated Universal Time (UTC)", value: "utc" },
]

interface FormData {
  companyName: string
  addressLine1: string
  addressLine2: string
  city: string
  postalCode: string
  phoneNumber: string
  website: string
}

export default function CreateBusinessForm({ onBack, isEdit, business }: CreateBusinessFormProps) {
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [selectedState, setSelectedState] = useState(states[0])
  const [selectedTimezone, setSelectedTimezone] = useState(timezones[0])  
  const [loading, setloading] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    companyName: isEdit && business ? business.name : "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
    website: "",
  })
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setloading(true)
    setTimeout(() => {
      setloading(false)
    }, 2000)

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }
  

  const renderListbox = (label: string, selected: any, setSelected: any, options: any[]) => (
    <div className="w-full">
      <label className="block mb-1 text-sm font-normal">{label}</label>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg border py-2 pl-3 pr-10 text-left bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm">
            <span className="block truncate text-sm font-light text-gray-500">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon className="h-5 w-5 text-gray-400" />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-auto ring-1 ring-black ring-opacity-5 focus:outline-none text-sm">
            {options.map((option) => (
              <Listbox.Option
                key={option.id}
                className={({ active }) =>
                  `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                    active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                      {option.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                        <CheckIcon className="w-5 h-5" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  )

  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-2 mb-6">
        <button onClick={onBack} className="text-blue-600 hover:text-blue-800 flex items-center">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
        </button>
        <h2 className="lg:text-xl sm:text-lg text-sm font-medium text-gray-900">{isEdit ? "Edit Business" : "Create New Business"}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-sm font-normal" htmlFor="companyName">Company Name</label>
          <input  value={formData.companyName}
  onChange={handleChange} id="companyName" className="mt-1 w-full border rounded px-3 text-sm font-light py-2" placeholder="Enter company name" />
        </div>

        <div>
          <label className="text-sm font-normal" htmlFor="addressLine1">Address Line 1</label>
          <input  value={formData.addressLine1}
  onChange={handleChange} id="addressLine1" className="mt-1 w-full border rounded px-3 text-sm font-light py-2" placeholder="Street address, P.O. box, etc." />
        </div>

        <div>
          <label className="text-sm font-normal" htmlFor="addressLine2">Address Line 2</label>
          <input  value={formData.addressLine2}
  onChange={handleChange} id="addressLine2" className="mt-1 w-full border rounded px-3 text-sm font-light py-2" placeholder="Apartment, suite, unit, building, floor, etc." />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {renderListbox("Country", selectedCountry, setSelectedCountry, countries)}
          <div>
            <label className="text-sm font-normal" htmlFor="city">City</label>
            <input  value={formData.city}
  onChange={handleChange} id="city" className="mt-1 w-full border rounded px-3 text-sm font-light py-2" placeholder="Enter city name" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {renderListbox("Province/State", selectedState, setSelectedState, states)}
          <div>
            <label className="text-sm font-normal" htmlFor="postalCode">Postal/Zip Code</label>
            <input  value={formData.postalCode}
  onChange={handleChange} id="postalCode" className="mt-1 w-full border rounded px-3 text-sm font-light py-2" placeholder="Enter ZIP or postal code" />
          </div>
        </div>

        {renderListbox("Timezone", selectedTimezone, setSelectedTimezone, timezones)}

        <div>
          <label className="text-sm font-normal" htmlFor="phoneNumber">Phone Number</label>
          <input  value={formData.phoneNumber}
  onChange={handleChange} id="phoneNumber" className="mt-1 w-full border rounded px-3 text-sm font-light py-2" placeholder="e.g. +1 234 567 8900" />
        </div>

        <div>
          <label className="text-sm font-normal" htmlFor="website">Website</label>
          <input  value={formData.website}
  onChange={handleChange} id="website" className="mt-1 w-full border rounded px-3 text-sm font-light py-2" placeholder="https://yourbusiness.com" />
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
