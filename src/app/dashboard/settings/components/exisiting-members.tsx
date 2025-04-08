import { IRoles } from "@/api/types";
import { Listbox, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { HiRefresh } from "react-icons/hi";
import { HiCheck, HiOutlineChevronDown, HiOutlineTrash } from "react-icons/hi2";

type ExistingMember = {
    id: string;
    name: string;
    email: string;
    roleId: string;
    username?: string;
  };

  type TeamMember = {
    id: string;
    name: string;
    email: string;
    role: {
      id: string;
      name: string;
      description: string;
      permissions: string[];
      external: boolean;
      type: string;
      createdAt: string;
      updatedAt: string;
    };
  };
  
  

const ExistingMembersContainer = ({ roles}: {roles: IRoles[]}) => {

    const [existingMembers, setExistingMembers] = useState<ExistingMember[]>([]);
    const [membersLoading, setMembersLoading] = useState(true);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [openDialogId, setOpenDialogId] = useState<string | null>(null);


    
  useEffect(() => {
    const fetchMembers = async () => {
      setMembersLoading(true);
      try {
        const mockMembers = [
          {
            id: "1",
            name: "John Doe",
            email: "john.doe@example.com",
            roleId: roles[0]?.id || "",
            username: "johndoe",
          },
          {
            id: "2",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            roleId: roles[1]?.id || "",
            username: "janesmith",
          },
        ];
        setExistingMembers(mockMembers);
      } catch (error) {
        console.error("Failed to fetch team members:", error);
      } finally {
        setMembersLoading(false);
      }
    };

    if (roles && roles.length > 0) {
      fetchMembers();
    }
  }, [roles]);

//   const updateMemberRole = (memberId: string, role: TeamMember["role"]) => {
//     setTeamMembers(
//       teamMembers.map((member) =>
//         member.id === memberId ? { ...member, role } : member
//       )
//     );
//   };

  const handleRemoveExistingMember = async (memberId: string) => {
    setActionLoading(memberId);
    try {
      setExistingMembers(existingMembers.filter((member) => member.id !== memberId));
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error("Failed to remove member:", error);
    } finally {
      setActionLoading(null);
    }
  };

    const getRoleNameById = (roleId: string) => {
        const role = roles.find((r) => r.id === roleId);
        return role ? role.name : "Unknown Role";
      };
      
      const getInitials = (name: string) => {
        return name
          .split(" ")
          .map((part) => part.charAt(0))
          .join("")
          .toUpperCase();
      };

      const handleUpdateExistingMemberRole = async (memberId: string, roleId: string) => {
        setActionLoading(memberId);
        try {
          setExistingMembers(existingMembers.map((member) => (member.id === memberId ? { ...member, roleId } : member)));
          await new Promise((resolve) => setTimeout(resolve, 500));
        } catch (error) {
          console.error("Failed to update member role:", error);
        } finally {
          setActionLoading(null);
        }
      };
      
    return (
        <>
         {membersLoading ? (
              <div className="flex justify-center items-center py-8">
                <HiRefresh className="h-8 w-8 animate-spin text-blue-600" />
              </div>
         ) : (
            existingMembers.length < 1 ?
            <div className="border rounded-lg shadow-sm overflow-hidden">
                { existingMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex flex-col sm:flex-row items-center justify-between p-4 border-b last:border-b-0"
                  >
                    <div className="sm:w-auto w-full flex items-center gap-3">
                      <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 font-medium">{getInitials(member.name)}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 sm:text-md text-sm flex items-center gap-2">
                          {member.name}
                          {member.username && (
                            <span className="ml-2 text-xs px-2 py-1 bg-gray-100 border rounded-md">
                              @{member.username}
                            </span>
                          )}
                        </div>
                        <div className="text-gray-500 sm:text-sm text-xs break-words sm:break-normal">
                          {member.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center sm:w-auto w-full sm:justify-end justify-between mt-3 sm:mt-0">
                      <Listbox
                        value={member.roleId}
                        onChange={(roleId) => handleUpdateExistingMemberRole(member.id, roleId)}
                        disabled={actionLoading === member.id}
                      >
                        <div className="relative w-40 mr-4 cursor-pointer">
                          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border rounded-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 sm:text-sm">
                            <span className="block truncate sm:text-sm text-xs">
                              {actionLoading === member.id ? (
                                <span className="flex items-center">
                                  <HiRefresh className="mr-1 h-3 w-3 animate-spin" />
                                  Updating...
                                </span>
                              ) : (
                                getRoleNameById(member.roleId)
                              )}
                            </span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <HiOutlineChevronDown className="w-5 h-5 text-gray-400" aria-hidden="true" />
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute cursor-pointer z-10 w-full py-1 mt-1 text-base bg-white rounded-md shadow-lg max-h-60 overflow-auto ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {roles.map((role) => (
                                <Listbox.Option
                                  key={role.id}
                                  className={({ active }) =>
                                    `${active ? "text-white bg-blue-600" : "text-gray-900"} cursor-default select-none relative py-2 pl-3 pr-4`
                                  }
                                  value={role.id}
                                >
                                  {({ selected, active }) => (
                                    <span
                                      className={`${selected ? "font-medium" : "font-normal"} block truncate sm:text-sm text-xs flex items-center`}
                                    >
                                      {role.name}
                                      {selected && <HiCheck className="ml-auto h-4 w-4" />}
                                    </span>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                      <button
                        className="text-gray-500 hover:text-red-600 transition-colors"
                        disabled={actionLoading === member.id}
                        onClick={() => setOpenDialogId(member.id)}
                        >
                        {actionLoading === member.id ? (
                            <HiRefresh className="h-5 w-5 animate-spin text-gray-400" />
                        ) : (
                            <HiOutlineTrash className="h-5 w-5" />
                        )}
                        </button>

                        {openDialogId === member.id && (
                            <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
                                <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                                <h3 className="text-lg font-medium text-gray-800">Remove Team Member</h3>
                                <p className="text-gray-500 mt-2">
                                    Are you sure you want to remove {member.name} from your team? This action cannot be undone.
                                </p>
                                <div className="mt-4 flex justify-end gap-2">
                                    <button
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                                    onClick={() => setOpenDialogId(null)}
                                    >
                                    Cancel
                                    </button>
                                    <button
                                    className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md"
                                    onClick={() => {
                                        handleRemoveExistingMember(member.id);
                                        setOpenDialogId(null);
                                    }}
                                    >
                                    Remove
                                    </button>
                                </div>
                                </div>
                            </div>
                            )}
                    </div>
                  </div>
                ))}
      </div>

                : <div className="ml-2">
                <h1>This team is empty</h1>
                </div>
        
         )
        }
        </>
    )
}

export default ExistingMembersContainer