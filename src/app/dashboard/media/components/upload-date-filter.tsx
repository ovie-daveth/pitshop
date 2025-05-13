"use client";

import React, { useState, useRef } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, CalendarIcon } from "@heroicons/react/solid";
import DatePicker from "react-date-picker";

interface UploadDateFilterProps {
  uploadDate: string;
  customDateRange: { from: Date | null; to: Date | null };
  onChange: (value: string, customRange?: { from: Date | null; to: Date | null }) => void;
}

export default function UploadDateFilter({ uploadDate, customDateRange, onChange }: UploadDateFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showFromCalendar, setShowFromCalendar] = useState(false);
  const [showToCalendar, setShowToCalendar] = useState(false);
  const fromCalendarRef = useRef<HTMLDivElement>(null);
  const toCalendarRef = useRef<HTMLDivElement>(null);

  const handleDateChange = (value: string) => {
    onChange(value);
    if (value !== "Custom") {
      setShowFromCalendar(false);
      setShowToCalendar(false);
    }
  };

  const handleCustomDateChange = (type: "from" | "to", date: Date | null) => {
    const newRange = { ...customDateRange, [type]: date };
    onChange("Custom", newRange);
    if (type === "from") setShowFromCalendar(false);
    if (type === "to") setShowToCalendar(false);
  };

  // Close calendars when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      fromCalendarRef.current &&
      !fromCalendarRef.current.contains(event.target as Node) &&
      toCalendarRef.current &&
      !toCalendarRef.current.contains(event.target as Node)
    ) {
      setShowFromCalendar(false);
      setShowToCalendar(false);
    }
  };

  // Add event listener for outside clicks
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button as="div" onClick={() => setIsOpen(!isOpen)}>
        <button className="inline-flex justify-center w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none">
          Upload date
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </button>
      </Menu.Button>
      <Transition
        as="div"
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 w-52 mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="px-1 py-1">
            <div className="flex flex-col">
              <label className="flex items-center px-2 py-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="uploadDate"
                  value="Today"
                  checked={uploadDate === "Today"}
                  onChange={() => handleDateChange("Today")}
                  className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span className="ml-2">Today</span>
              </label>
              <label className="flex items-center px-2 py-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="uploadDate"
                  value="Last 7 Days"
                  checked={uploadDate === "Last 7 Days"}
                  onChange={() => handleDateChange("Last 7 Days")}
                  className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span className="ml-2">Last 7 Days</span>
              </label>
              <label className="flex items-center px-2 py-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="uploadDate"
                  value="Last 30 Days"
                  checked={uploadDate === "Last 30 Days"}
                  onChange={() => handleDateChange("Last 30 Days")}
                  className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span className="ml-2">Last 30 Days</span>
              </label>
              <label className="flex items-center px-2 py-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="uploadDate"
                  value="Last 90 Days"
                  checked={uploadDate === "Last 90 Days"}
                  onChange={() => handleDateChange("Last 90 Days")}
                  className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span className="ml-2">Last 90 Days</span>
              </label>
              <label className="flex items-center px-2 py-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="uploadDate"
                  value="This Year"
                  checked={uploadDate === "This Year"}
                  onChange={() => handleDateChange("This Year")}
                  className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span className="ml-2">This Year</span>
              </label>
              <label className="flex items-center px-2 py-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="uploadDate"
                  value="Custom"
                  checked={uploadDate === "Custom"}
                  onChange={() => handleDateChange("Custom")}
                  className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span className="ml-2">Custom</span>
              </label>

              {/* Custom Date Range Inputs */}
              {uploadDate === "Custom" && (
                <div className="px-2 py-2 flex items-center justify-between gap-5 space-y-2">
                 <div className="relative flex items-center gap-3 w-[45%] p-2 border rounded-md">
  <label className="block text-xs text-gray-500">From</label>
  <div ref={fromCalendarRef}>
    <DatePicker
      onChange={(value) => {
        if (value instanceof Date) {
          handleCustomDateChange("from", value);
        }
      }}
      value={customDateRange.from}
      maxDate={customDateRange.to || new Date()}
      calendarIcon={<CalendarIcon className="h-5 w-5 text-gray-500 cursor-pointer" />}
      clearIcon={null}
      format="y-MM-dd"
      className="invisible absolute w-0 h-0"
      onCalendarOpen={() => setShowFromCalendar(true)}
      onCalendarClose={() => setShowFromCalendar(false)}
    />
    <button
      type="button"
      onClick={() => {
        const input = fromCalendarRef.current?.querySelector('input');
        input?.focus();
      }}
      className="absolute top-2 right-2"
    >
      <CalendarIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
    </button>
  </div>
</div>

{/* To Date */}
<div className="relative flex items-center gap-3 w-[45%] p-2 border rounded-md">
  <label className="block text-xs text-gray-500">To</label>
  <div ref={toCalendarRef}>
    <DatePicker
      onChange={(value) => {
        if (value instanceof Date) {
          handleCustomDateChange("to", value);
        }
      }}
      value={customDateRange.to}
      minDate={customDateRange.from || undefined}
      maxDate={new Date()}
      calendarIcon={<CalendarIcon className="h-5 w-5 text-gray-500 cursor-pointer" />}
      clearIcon={null}
      format="y-MM-dd"
      className="invisible absolute w-0 h-0"
      onCalendarOpen={() => setShowToCalendar(true)}
      onCalendarClose={() => setShowToCalendar(false)}
    />
    <button
      type="button"
      onClick={() => {
        const input = toCalendarRef.current?.querySelector('input');
        input?.focus();
      }}
      className="absolute top-2 right-2"
    >
      <CalendarIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
    </button>
  </div>
</div>
                </div>
              )}
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}