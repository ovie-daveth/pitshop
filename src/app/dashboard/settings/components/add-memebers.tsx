"use client";

import { useRef, useState, type KeyboardEvent, Fragment, Dispatch, SetStateAction } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiOutlineChevronDown, HiOutlineTrash } from "react-icons/hi2";
import { useUserState } from "@/api/context/UserContext";
import { useRolesState } from "@/api/context/RolesContext";
import { IRoles } from "@/api/types";

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

type PendingInvite = {
  id: string;
  email: string;
};

const AddMmebers = ({ pendingInvites, setPendingInvites, roles, rolesLoading, rolesError }: { pendingInvites: PendingInvite[], setPendingInvites: Dispatch<SetStateAction<PendingInvite[]>> , roles: IRoles[], rolesLoading: boolean, rolesError: any}) => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const { createInviteUsers, createMultipleInviteUsers } = useUserState();


  const [currentEmail, setCurrentEmail] = useState("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false)

  if (rolesLoading) return <div>Loading roles...</div>;
  if (rolesError) return <div>Error loading roles: {rolesError}</div>;
  if (!roles || roles.length === 0) return <div>No roles available</div>;

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentEmail.trim() !== "") {
      e.preventDefault();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(currentEmail)) {
        alert("Please enter a valid email address");
        return;
      }

      const defaultRole = roles.find((role) => role.name.toLowerCase() === "collaborator") || roles[2] || roles[0];
      const newMember: TeamMember = {
        id: Date.now().toString(),
        name: currentEmail
          .split("@")[0]
          .split(".")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" "),
        email: currentEmail,
        role: defaultRole,
      };

      setTeamMembers([...teamMembers, newMember]);
      setCurrentEmail("");
    }
  };

  const removeTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id));
  };

  const updateMemberRole = (memberId: string, role: TeamMember["role"]) => {
    setTeamMembers(
      teamMembers.map((member) =>
        member.id === memberId ? { ...member, role } : member
      )
    );
  };

  const inviteUsers = async () => {
    if (teamMembers.length === 0) return;
    setLoading(true)
    //Step 1: Prepare invite data
    const inviteData = teamMembers.map((member) => ({
      email: member.email,
      roles: [member.role.id],
    }));

    await createMultipleInviteUsers({invitedUserDtos: inviteData})
    .then((res) => {
      console.log("created", res)
        // Step 2: Update UI immediately with pending invites
      const newPendingInvites = teamMembers.map((member) => ({
        id: member.id,
        email: member.email,
      }));
      setLoading(false)
      setPendingInvites([...pendingInvites, ...newPendingInvites]);
      setTeamMembers([]); // Clear team members immediately
    })
    .catch((err) => {
      console.log(err)
    })

      // Check if all invites were created successfull

}

  return (
    <div className="flex flex-col md:flex-row items-start justify-between">
      <div className="md:w-[40%] w-full">
        <h2 className="lg:text-2xl text-lg font-medium text-gray-800 mb-2">Members</h2>
        <p className="text-gray-500 mb-6 font-light sm:text-sm text-xs">
          Type an email of the teammate you want to invite, manage user permissions, remove users.
        </p>
      </div>
      <div className="mb-12 md:w-[55%] w-full flex flex-col justify-end gap-3">
        <div className="flex justify-between mb-2">
          <div className="relative w-full mr-4">
            <div className="flex items-center border rounded-md p-2 bg-white">
              <input
                ref={emailInputRef}
                type="email"
                value={currentEmail}
                onChange={(e) => setCurrentEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type email and press Enter"
                className="flex-1 outline-none sm:text-sm text-xs"
              />
            </div>
          </div>
        </div>

        {teamMembers.length > 0 && (
          <div className="border rounded-lg shadow-sm min-w-fit max-w-full">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex flex-col sm:flex-row sm:gap-[] gap-5 items-center justify-between p-4 border-b last:border-b-0"
              >
                <div className="sm:w-[] w-full">
                  <div className="font-medium text-gray-800 sm:text-md text-sm">{member.name}</div>
                  <div className="text-gray-500 sm:text-sm text-xs">{member.email}</div>
                </div>
                <div className="flex items-center sm:w-[] w-full sm:justify-[] justify-between">
                  <Listbox value={member.role} onChange={(role) => updateMemberRole(member.id, role)}>
                    <div className="relative w-40 mr-4 cursor-pointer">
                      <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border rounded-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 sm:text-sm">
                        <span className="block truncate sm:text-sm text-xs">{member.role.name}</span>
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
                              value={role}
                            >
                              {({ selected, active }) => (
                                <span className={`${selected ? "font-medium" : "font-normal"} block truncate sm:text-sm text-xs`}>
                                  {role.name}
                                </span>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                  <button
                    onClick={() => removeTeamMember(member.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <HiOutlineTrash className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-end">
          <button
            onClick={inviteUsers}
            disabled={teamMembers.length === 0}
            className={`bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors sm:text-md text-sm ${
              teamMembers.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
           {
            loading ? "Inviting users..." : "Invite Users"
           }
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMmebers;