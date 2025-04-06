// store/useAuthFormStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FormTypeState {
  showFormType: {
    createCompany: boolean;
    addTeamMate: boolean;
  };
  setFormType: (num: number) => void;
}

export const useCreateFormStore = create<FormTypeState>()(
  persist(
    (set) => ({
      showFormType: {
        createCompany: true,
        addTeamMate: false,
      },
      setFormType: (num: number) => {
        const defaultFormType = {
          createCompany: false,
          addTeamMate: false,
        };

        const mapping: Record<number, keyof FormTypeState["showFormType"]> = {
          1: "createCompany",
          2: "addTeamMate",
        };

        const key = mapping[num];

        if (key) {
          set({
            showFormType: {
              ...defaultFormType,
              [key]: true,
            },
          });
        }
      },
    }),
    {
      name: "create-form-type", // key in localStorage
    }
  )
);
