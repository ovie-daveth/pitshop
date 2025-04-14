"use client"

import { Input, Label } from "@headlessui/react"
import { Listbox } from "@headlessui/react"
import { ArrowLeftIcon } from "@heroicons/react/solid"
import { Fragment, useState } from "react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"

interface CreateBusinessFormProps {
  onBack: () => void
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

export default function CreateBusinessForm({ onBack }: CreateBusinessFormProps) {
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [selectedState, setSelectedState] = useState(states[0])
  const [selectedTimezone, setSelectedTimezone] = useState(timezones[0])

  const renderListbox = (label: string, selected: any, setSelected: any, options: any[]) => (
    <div className="w-full">
      <Label className="block mb-1">{label}</Label>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg border py-2 pl-3 pr-10 text-left bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
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
    <div className="max-w-2xl">
      <div className="flex items-center gap-2 mb-6">
        <button onClick={onBack} className="text-blue-600 hover:text-blue-800 flex items-center">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
        </button>
        <h2 className="text-xl font-medium text-gray-900">Create New Business</h2>
      </div>

      <form className="space-y-6">
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input id="companyName" className="mt-1" />
        </div>

        <div>
          <Label htmlFor="addressLine1">Address Line 1</Label>
          <Input id="addressLine1" className="mt-1" />
        </div>

        <div>
          <Label htmlFor="addressLine2">Address Line 2</Label>
          <Input id="addressLine2" className="mt-1" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {renderListbox("Country", selectedCountry, setSelectedCountry, countries)}
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" className="mt-1" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {renderListbox("Province/State", selectedState, setSelectedState, states)}
          <div>
            <Label htmlFor="postalCode">Postal/Zip Code</Label>
            <Input id="postalCode" className="mt-1" />
          </div>
        </div>

        {renderListbox("Timezone", selectedTimezone, setSelectedTimezone, timezones)}

        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input id="phoneNumber" className="mt-1" />
        </div>

        <div>
          <Label htmlFor="website">Website</Label>
          <Input id="website" className="mt-1" />
        </div>
      </form>
    </div>
  )
}
