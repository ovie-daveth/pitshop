import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useCompanyState } from "@/api/context/CompanyContext";
import { useRolesState } from "@/api/context/RolesContext";

const AddTeamMateForm = ({ handleFormChnage }: { handleFormChnage: (num: number) => void }) => {
  const { company } = useCompanyState();
  const { roles: data } = useRolesState();

  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState(data);

  const getCompanyById = async () => {
    setIsLoading(true);
    try {
      const companyId = sessionStorage.getItem("companyId") as string;
      if (!companyId) return;

      const selectedCompany = company?.find((comp) => comp.id === parseInt(companyId));
      if (!selectedCompany) return;

      sessionStorage.setItem("public_key", selectedCompany.company?.reference);
      sessionStorage.setItem("secret_key", selectedCompany.reference);
      setIsLoading(false);
    } catch (err: any) {
      // Handle error if needed
    }
  };

  useEffect(() => {
    getCompanyById();
    setRoles(data);
  }, [company]);

  const [users, setUsers] = useState([
    { email: "", roleId: roles ? roles[0]?.id : "" },
    { email: "", roleId: roles ? roles[0]?.id : "" },
    { email: "", roleId: roles ? roles[0]?.id : "" },
    { email: "", roleId: roles ? roles[0]?.id : "" },
  ]);

  const addUser = () => {
    setUsers([...users, { email: "", roleId: roles ? roles[0]?.id : "" }]);
  };

  return (
    <div className="flex justify-center items-center h-screen py-10 w-full overflow-y-scroll hide-sidebar">
      <div className="lg:px-20 px-10 w-full">
        <button onClick={() => handleFormChnage(6)} className="text-blue-600 mb-4">&larr; Go back</button>
        <h2 className="text-xl font-semibold mb-4">Invite Users to your Company</h2>
        {users.map((user, index) => (
          <div key={index} className="flex items-center gap-2 mb-2 w-full border py-1 rounded-md">
            <input
              type="email"
              placeholder="Email of teammate"
              className="flex-1 p-2 border-none rounded-md"
            />
            <Listbox
              as="div"
              className="relative"
              value={user.roleId} // Store roleId instead of role name
              onChange={(roleId) => {
                const updatedUsers = [...users];
                updatedUsers[index].roleId = roleId; // Update to selected role's ID
                setUsers(updatedUsers);
              }}
            >
              {({ open }) => (
                <>
                  <Listbox.Button className="p-2 border-none rounded-md text-gray-600 flex items-center gap-1">
                    {/* Render the role name based on selected roleId */}
                    {roles && roles?.find((role) => role.id === user.roleId)?.name || "Select role"}
                    <ChevronDownIcon className="w-4 h-4" />
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 mt-1 w-fit p-2 bg-white border rounded-md shadow-lg">
                    {roles && roles.map((role) => (
                      <Listbox.Option
                        key={role.id}
                        value={role.id}  // Pass the role ID as the value
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      >
                        {role.name}  {/* Display the role name in the dropdown */}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </>
              )}
            </Listbox>
          </div>
        ))}
        <button onClick={addUser} className="text-blue-600 mb-4 flex items-center gap-1 bg-blue-50 p-2 rounded-md mt-2">
          + Add more
        </button>
        <button className="w-full p-2 bg-blue-600 text-white rounded-md">Next &rarr;</button>
        <button className="w-full mt-2 text-blue-600">Skip for now</button>
      </div>
    </div>
  );
};

export default AddTeamMateForm;
