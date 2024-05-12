"use client";
import { useState, useEffect } from "react";
import {
  FREQUENCY_OPTIONS,
  formatAsCurrency,
  frequencyTotal,
  calculateCompoundInterest,
} from "@/lib/utils";
import {
  Card,
  Divider,
  LineChart,
  Select,
  SelectItem,
  BarChart,
} from "@tremor/react";
import CurrencyInput from "./_components/CurrencyInput";
import PercentageInput from "./_components/PercentageInput";

export default function Home() {
  const [balance, setBalance] = useState(100000);
  const [contributions, setContributions] = useState(5000);
  const [adminPercentage, setAdminPercentage] = useState(0.23);
  const [adminDollar, setAdminDollar] = useState(1);
  const [investmentPercentage, setInvestmentPercentage] = useState(0.12);
  const [frequency, setFrequency] = useState("Weekly");
  const [feeCap, setFeeCap] = useState(0);
  const [totalFees, setTotalFees] = useState(0);
  const [chartData, setChartData] = useState<any>([]);
  const [barData, setBarData] = useState<any>([]);

  const years = 10;
  const growthRate = 0.07;

  useEffect(() => {
    setChartData([]);
    setBarData([]);
    const fixedAdmin = frequencyTotal(frequency, adminDollar);

    const { feeData, growthData } = calculateCompoundInterest(
      balance,
      growthRate,
      years,
      contributions,
      adminPercentage,
      fixedAdmin,
      investmentPercentage
    );

    setChartData(feeData);
    setBarData(growthData);
  }, [balance, adminPercentage, adminDollar, investmentPercentage, frequency]);

  return (
    <main className="bg-tremor-background-muted grow">
      <div className="container py-4 flex flex-wrap gap-4">
        <Card className=" min-w-[250px] lg:max-w-[400px]">
          <h2 className="mb-1 text-slate-900 text-lg col-span-2">Superfund</h2>

          <div className="grid gap-2 grid-cols-2">
            <div className="col-span-1">
              <CurrencyInput
                name={"balance"}
                label={"Balance ($)"}
                value={balance}
                onChange={setBalance}
              />
            </div>
            <div className="col-span-1">
              <CurrencyInput
                name={"contributions"}
                label={"Contributions ($ pa)"}
                value={contributions}
                onChange={setContributions}
              />
            </div>
          </div>

          <Divider className="col-span-2" />
          <h2 className="mb-1 text-slate-900 text-lg col-span-2">Fees</h2>
          <div className="grid gap-2 grid-cols-2">
            <div className=" col-span-2">
              <PercentageInput
                name={"admin-percentage"}
                label={"Admin Fee (%)"}
                value={adminPercentage}
                onChange={setAdminPercentage}
              />
            </div>
            <div className="col-span-1">
              <CurrencyInput
                name={"admin-dollar"}
                label={"Admin Fee ($)"}
                value={adminDollar}
                onChange={setAdminDollar}
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="frequency">Frequency</label>
              <Select
                id="frequency"
                name="frequency"
                value={frequency}
                onValueChange={setFrequency}
              >
                {FREQUENCY_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className=" col-span-2">
              <PercentageInput
                name={"investment-fee"}
                label={"Investment Fee (%)"}
                value={investmentPercentage}
                onChange={setInvestmentPercentage}
              />
            </div>
          </div>
        </Card>

        <div className="grow space-y-4 min-w-[400px]">
          <Card>
            <h2 className="mb-2 text-slate-900 text-xl">Fees Paid</h2>
            <LineChart
              className="h-64 w-full"
              data={chartData}
              index="year"
              categories={["fees"]}
              colors={["red"]}
              valueFormatter={formatAsCurrency}
            />
          </Card>

          <Card>
            <h2 className="mb-2 text-slate-900 text-xl">Balance</h2>
            <BarChart
              className="h-64 w-full"
              data={barData}
              index="year"
              categories={["balance"]}
              colors={["green"]}
              valueFormatter={formatAsCurrency}
            />
          </Card>
        </div>
      </div>
    </main>
  );
}
