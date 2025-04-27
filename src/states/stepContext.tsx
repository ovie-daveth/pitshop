// context/StepContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

type Step = "welcome" | "personal-info" | "verify-email" | "set-password" | "create-company" | "invite-user" | "complete";

interface StepContextType {
  currentStep: Step;
  setCurrentStep: (step: Step) => void;
  stepIndex: number;
  totalSteps: number;
}

const StepContext = createContext<StepContextType | undefined>(undefined);

export function StepProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState<Step>("welcome");

  const stepOrder: Step[] = [
    "welcome",
    "personal-info",
    "verify-email",
    "set-password",
    "create-company",
    "invite-user",
    "complete",
  ];
  const totalSteps = stepOrder.length;
  const stepIndex = stepOrder.indexOf(currentStep) + 1; // 1-based index

  return (
    <StepContext.Provider value={{ currentStep, setCurrentStep, stepIndex, totalSteps }}>
      {children}
    </StepContext.Provider>
  );
}

export function useStep() {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error("useStep must be used within a StepProvider");
  }
  return context;
}