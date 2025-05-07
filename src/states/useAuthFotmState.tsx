// store/useAuthFormStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FormTypeState {
  showFormType: {
    signup: boolean;
    login: boolean;
    forgetPassword: boolean;
    resetopt: boolean;
    resetPassword: boolean;
    createCompany: boolean;
    addTeamMate: boolean;
    verifyOtp: boolean;
  };
  setFormType: (num: number) => void;
}

export const useAuthFormStore = create<FormTypeState>()(
  persist(
    (set) => ({
      showFormType: {
        signup: false,
        login: true,
        forgetPassword: false,
        resetopt: false,
        resetPassword: false,
        createCompany: false,
        addTeamMate: false,
        verifyOtp: false,
      },
      setFormType: (num: number) => {
        const defaultFormType = {
          signup: false,
          login: false,
          forgetPassword: false,
          resetopt: false,
          resetPassword: false,
          createCompany: false,
          verifyOtp: false,
          addTeamMate: false,
        };

        const mapping: Record<number, keyof FormTypeState["showFormType"]> = {
          1: "signup",
          2: "login",
          3: "forgetPassword",
          4: "resetopt",
          5: "resetPassword",
          6: "createCompany",
          7: "verifyOtp",
          8: "addTeamMate",
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
      name: "auth-form-type", // key in localStorage
    }
  )
);
