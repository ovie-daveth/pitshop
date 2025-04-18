"use client";

import { forwardRef } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

const MenuButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => (
  <button
    ref={ref}
    type="button"
    className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100"
    {...props}
  >
    <FiMoreHorizontal className="h-5 w-5 text-gray-500" />
  </button>
));
MenuButton.displayName = "MenuButton";

export default MenuButton;