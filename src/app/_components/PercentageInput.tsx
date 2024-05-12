import { NumberInput, TextInput } from "@tremor/react";
import { formatAsPercentage, parsePercentage } from "@/lib/utils";
import React, { SetStateAction, Dispatch } from "react";
import { Percent } from "lucide-react";

export default function PercentageInput({
  name,
  label,
  value,
  onChange,
}: Readonly<{
  name: string;
  label: string;
  value: number;
  onChange: Dispatch<SetStateAction<number>>;
}>) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <NumberInput
        id={name}
        name={name}
        placeholder="10%"
        value={value}
        onValueChange={(value) => onChange(value)}
        enableStepper={false}
      />
    </>
  );
}
