import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useCompanyState } from "@/api/context/CompanyContext";
import { useRolesState } from "@/api/context/RolesContext";
import { useUserState } from "@/api/context/UserContext";
import Link from "next/link";
import { useAuthFormStore } from "@/states/useAuthFotmState";
import { useRouter } from "next/navigation";

const AddTeamMateForm = ({ handleFormChnage, isAuth }: { handleFormChnage: (num: number) => void, isAuth?: boolean }) => {
  const { company } = useCompanyState();
  const { roles: data } = useRolesState();
  const { createInviteUsers } = useUserState();

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState(data);

  const getCompanyById = async () => {
    setIsLoading(true);
    try {
      const companyId = sessionStorage.getItem("companyId");
      if (!companyId) return;

      const selectedCompany = company?.find((comp) => comp.id === parseInt(companyId));
      if (!selectedCompany) return;

      sessionStorage.setItem("public_key", selectedCompany.company?.reference);
      sessionStorage.setItem("secret_key", selectedCompany.reference);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCompanyById();
    setRoles(data);
  }, [company, data]);

  const [users, setUsers] = useState([
    { email: "", roleIds: [] }, // Changed roleId to roleIds array
    { email: "", roleIds: [] },
    { email: "", roleIds: [] },
    { email: "", roleIds: [] },
  ]);

  const addUser = () => {
    setUsers([...users, { email: "", roleIds: [] }]);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Map through each user and their roles, submitting one by one
      for (const user of users) {
        if (user.email && user.roleIds.length > 0) {
          for (const roleId of user.roleIds) {
            await createInviteUsers({
              email: user.email,
            roles: [roleId],
            })
            .then((res) => {
              if(res){
                router.push(isAuth ? "/dashboard" : "/dashboard/users")
              }
            })
          }
        }
      }
      // handleFormChnage(6); // Move to next step after successful submission
    } catch (error) {
      console.error("Error submitting invitations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen py-10 w-full overflow-y-scroll hide-sidebar">
      <div className="lg:px-20 px-10 w-full">
        <button onClick={() => handleFormChnage(6)} className="text-blue-600 mb-4">
          ← Go back
        </button>
        <h2 className="text-xl font-semibold mb-4">Invite Users to your Company</h2>
        {users.map((user, index) => (
          <div key={index} className="flex items-center gap-2 mb-2 w-full border py-1 rounded-md">
            <input
              type="email"
              placeholder="Email of teammate"
              className="flex-1 p-2 border-none rounded-md"
              value={user.email}
              onChange={(e) => {
                const updatedUsers = [...users];
                updatedUsers[index].email = e.target.value;
                setUsers(updatedUsers);
              }}
            />
            <Listbox
              as="div"
              className="relative w-full justify-end items-end flex flex-col"
              value={user.roleIds}
              multiple // Enable multiple selection
              onChange={(selectedRoleIds) => {
                const updatedUsers = [...users];
                updatedUsers[index].roleIds = selectedRoleIds;
                setUsers(updatedUsers);
              }}
            >
              {({ open }) => (
                <>
                  <Listbox.Button className="p-2 border-none rounded-md text-gray-600 flex items-center gap-1">
                    {user.roleIds.length > 0
                      ? user.roleIds
                          .map((roleId) => roles?.find((role) => role.id === roleId)?.name)
                          .join(", ")
                      : "Select roles"}
                    <ChevronDownIcon className="w-4 h-4" />
                  </Listbox.Button>
                  <Listbox.Options className="absolute -bottom-12 z-50 mt-1 w-fit p-2 bg-white border rounded-md shadow-lg">
                    {roles && roles.map((role) => (
                      <Listbox.Option
                        key={role.id}
                        value={role.id}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      >
                        {role.name.toLowerCase()}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </>
              )}
            </Listbox>
          </div>
        ))}
        <button
          onClick={addUser}
          className="text-blue-600 mb-4 flex items-center gap-1 bg-blue-50 p-2 rounded-md mt-2"
        >
          + Add more
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full p-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
        >
          {isLoading ? "Submitting..." : "Next →"}
        </button>
        <Link href={isAuth ? "/dashboard" : "/dashboard/company"} className="w-full mt-2 text-blue-600 text-center flex items-center justify-center">Skip for now</Link>
      </div>
    </div>
  );
};

export default AddTeamMateForm;