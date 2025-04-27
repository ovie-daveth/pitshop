import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useCompanyState } from "@/api/context/CompanyContext";
import { useRolesState } from "@/api/context/RolesContext";
import { useUserState } from "@/api/context/UserContext";
import { useRouter } from "next/navigation";
import { Step } from "../type";
import AuthButton from "./auth-button";
import { SuccessModal } from "./submitModal";
import { LoaderIcon } from "react-hot-toast";

const AddTeamMateForm = ({ setStepIndex, setCurrentStep, isSignUP }: { setStepIndex: Dispatch<SetStateAction<number>>, setCurrentStep: Dispatch<SetStateAction<Step>>, isSignUP: boolean }) => {
  const { company } = useCompanyState();
  const { roles: data, loading } = useRolesState();
  const { createInviteUsers } = useUserState();

  const router = useRouter();
  const [modalPopUp, setModalPopUp] = useState(false);
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
    { email: "", roleIds: [] },
    { email: "", roleIds: [] },
    { email: "", roleIds: [] }
  ]);

  // Validate if at least one user has both email and at least one role
  const isFormValid = users.some(user => user.email.trim() !== "" && user.roleIds.length > 0);

  const addUser = () => {
    setUsers([...users, { email: "", roleIds: [] }]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    // Filter valid users (non-empty email and at least one role)
    const validUsers = users.filter(user => user.email.trim() !== "" && user.roleIds.length > 0);
    console.log("Submitting valid users:", validUsers);

    try {
      for (const user of validUsers) {
        for (const roleId of user.roleIds) {
          await createInviteUsers({
            email: user.email,
            roles: [roleId],
          }).then((res) => {
            if (res) {
              setModalPopUp(true);
            }
          });
        }
      }
    } catch (error) {
      console.error("Error submitting invitations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetStarted = () => {
    localStorage.removeItem("stepIndex");
    localStorage.removeItem("currentStep");
    setModalPopUp(false);
    router.push(isSignUP ? "/dashboard" : "/dashboard/users");
  };

  const handleSkip = () => {
    localStorage.removeItem("stepIndex");
    localStorage.removeItem("currentStep");
    router.push("/dashboard");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="text-left mb-8 mt-20">
          <h1 className="lg:text-3xl text-xl font-bold">Invite users to your company</h1>
          <p className="mt-2 text-gray-600 text-sm lg:text-base">
            Invite users to your team by email
          </p>
        </div>
        <div className="space-y-6 mb-6">
          {users.map((user, index) => (
            <div key={index} className="flex items-center gap-2 mb-2 w-full border py-1 rounded-xl">
              <input
                type="email"
                placeholder="Email of teammate"
                className="flex-1 px-2 py-3 border-none rounded-xl text-sm focus:outline-none focus:ring-0"
                value={user.email}
                onChange={(e) => {
                  const updatedUsers = [...users];
                  updatedUsers[index].email = e.target.value;
                  setUsers(updatedUsers);
                }}
              />
              {
                loading ? <div className="mr-3">
                  <LoaderIcon className="animate-spin h-8 w-8" />
                </div> : <Listbox
                as="div"
                className="relative w-full justify-end items-end flex flex-col"
                value={user.roleIds}
                multiple
                onChange={(selectedRoleIds) => {
                  const updatedUsers = [...users];
                  updatedUsers[index].roleIds = selectedRoleIds;
                  setUsers(updatedUsers);
                }}
              >
                {({ open }) => (
                  <>
                    <Listbox.Button className="p-2 border-none rounded-md text-gray-600 flex items-center gap-1 text-sm">
                      {user.roleIds.length > 0
                        ? user.roleIds
                            .map((roleId) => roles?.find((role) => role.id === roleId)?.name)
                            .filter(Boolean)
                            .join(", ")
                        : "Select roles"}
                      <ChevronDownIcon className="w-4 h-4" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute -bottom-12 z-50 mt-1 w-fit p-2 bg-white border rounded-md shadow-lg text-sm">
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
              }
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addUser}
          className="text-green-700 bg-green-50 mb-4 flex items-center gap-1 py-3 px-5 rounded-full mt-2 gap-1 items-center text-xs"
        >
          <span className="text-sm -mt-1">+</span>
          <span>Add more</span>
        </button>
        <div className="flex flex-col w-full gap-4 mt-8">
          <AuthButton
            title="Complete setup"
            isLoading={isLoading}
            disabled={!isFormValid}
          />
          <button type="button" onClick={handleSkip} className="text-green-800 hover:text-green-700">Skip for now</button>
        </div>
      </form>
      <SuccessModal isOpen={modalPopUp} onClose={() => setModalPopUp(false)} onGetStarted={handleGetStarted} />
    </div>
  );
};

export default AddTeamMateForm;