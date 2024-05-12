import { NumberInput, TextInput } from "@tremor/react";
import { formatAsCurrency, parseCurrency } from "@/lib/utils";
import React, { SetStateAction, Dispatch } from "react";
import { DollarSign } from "lucide-react";
import { parse } from "path";
export default function CurrencyInput({
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
        placeholder="$0.00"
        value={value}
        onValueChange={(value) => onChange(value)}
        enableStepper={false}
      />
    </>
  );
}
