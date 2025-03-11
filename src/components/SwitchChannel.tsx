import { useState, useLayoutEffect } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";
import { switchToObject } from "@/api/utils/switch";
import { useCompanyState } from "@/api/context/CompanyContext";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function SwitchChannel() {
  const { company, getUserCompanies } = useCompanyState();
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<any>(
    company && company.length > 0 ? company[0] : null
  );

  useLayoutEffect(() => {
    getUserCompanies();
    // eslint-disable-next-line
  }, []);

  useLayoutEffect(() => {
    if (company && company.length > 0) {
      setSelectedPerson(company[0]);
    }
  }, [company]);

  const handleSelectionChange = (selected: any) => {
    setSelectedPerson(selected);
    switchToObject(selected.id, selected);
    // console.log(selected);
  };

  return (
    <>
      <Combobox
        as="div"
        value={selectedPerson}
        onChange={handleSelectionChange}
        className={"mx-2"}
      >
        <Combobox.Label className="block text-sm font-medium text-gray-700">
          {/* Switch to */}
        </Combobox.Label>
        <div className="relative mt-1">
          <Combobox.Input
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(company: any) =>
              company ? company.company.name : " Switch Channel"
            }
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <SelectorIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>

          {company && company.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {company.map((person) => (
                <Combobox.Option
                  key={person.id}
                  value={person}
                  className={({ active }) =>
                    classNames(
                      "relative cursor-default select-none py-2 pl-3 pr-9",
                      active ? "bg-indigo-600 text-white" : "text-gray-900"
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <div className="flex items-center">
                        <span
                          className={classNames(
                            "ml-3 truncate",
                            selected && "font-semibold"
                          )}
                        >
                          {person.company.name}
                        </span>
                      </div>

                      {selected && (
                        <span
                          className={classNames(
                            "absolute inset-y-0 right-0 flex items-center pr-4",
                            active ? "text-white" : "text-indigo-600"
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </>
  );
}
