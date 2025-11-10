"use client";

import React, { useState } from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

import { Input } from "./input";
import Icon from "./icon";

interface Props<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  placeholder: string;
}

function PasswordInput<T extends FieldValues>({
  field,
  placeholder,
}: Props<T>) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="w-full h-12 relative">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className="w-full h-full rounded-lg text-base-content placeholder:text-base-content/40 border-2"
        {...field}
        name={field.name as string}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-3 right-4 cursor-pointer"
      >
        {showPassword ? (
          <Icon icon="mynaui:eye" width="24" height="24" />
        ) : (
          <Icon icon="mynaui:eye-slash" width="24" height="24" />
        )}
      </button>
    </div>
  );
}

export default PasswordInput;
