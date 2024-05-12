export const FREQUENCY_OPTIONS: string[] = [
  "Daily",
  "Weekly",
  "Fortnightly",
  "Monthly",
  "Quarterly",
  "Half-Yearly",
  "Yearly",
];

export function formatAsCurrency(
  value: number,
  includeCents: boolean = false,
  includeSymbol: boolean = false
): string {
  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: includeCents ? 2 : 0,
    maximumFractionDigits: includeCents ? 2 : 0,
    style: includeSymbol ? "currency" : "decimal",
    currency: includeSymbol ? "USD" : undefined,
  };

  if (isNaN(value)) {
    value = 0.0;
  }

  return new Intl.NumberFormat("en-US", options).format(value);
}

export function formatAsPercentage(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  }).format(value);
}

export function parseCurrency(value: string): number {
  // Remove all characters except digits and decimal points
  const numericValue = parseFloat(value.replace(/[^\d.]/g, ""));

  if (isNaN(numericValue)) {
    return 0;
  }

  return numericValue * 100;
}

export function parsePercentage(value: string): number {
  const numericValue = parseFloat(value.replace(/[^\d.]/g, "")) / 100;

  return numericValue;
}

export function frequencyTotal(frequency: string, value: number): number {
  switch (frequency) {
    case "Daily":
      return value * 365;
    case "Weekly":
      return value * 52;
    case "Fortnightly":
      return value * 26;
    case "Monthly":
      return value * 12;
    case "Quarterly":
      return value * 4;
    case "Half-Yearly":
      return value * 2;
    case "Yearly":
      return value;
    default:
      throw new Error("Invalid value frequency");
  }
}

export function calculateCompoundInterest(
  principal: number = 0,
  interestRate: number = 0,
  years: number = 0,
  contributionAmount: number = 0,
  adminPercentage: number = 0,
  adminDollar: number = 0,
  investmentPercentage: number = 0,
  feeCap: number = 0
) {
  let totalValue = principal;
  let totalInterest = 0;
  let totalContributions = 0;
  let totalFees = 0;

  const interestByYear: number[] = [];
  const contributionsByYear: number[] = [];
  const chartYears: number[] = [];
  const startingByYear: number[] = [];
  const cumulatedFees: number[] = [];
  let feeData: any[] = [];
  let growthData: any[] = [];

  for (let i = 0; i < years; i++) {
    let adminFee = feeCap ? Math.min(adminDollar, feeCap) : adminDollar;
    // Calculate fees
    const fees = calculateFees(
      totalValue,
      adminPercentage,
      adminFee,
      investmentPercentage
    );
    totalFees += fees;
    cumulatedFees.push(parseFloat(totalFees.toFixed(2)));

    // Storing the starting value for the year
    startingByYear.push(parseFloat(principal.toFixed(2)));

    // Calculating yearly interest
    const yearlyInterest = totalValue * (interestRate / 100);
    totalInterest += yearlyInterest;
    interestByYear.push(parseFloat(totalInterest.toFixed(2)));

    // Calculating yearly contributions
    const yearlyContribution = contributionAmount;
    totalContributions += yearlyContribution;
    contributionsByYear.push(parseFloat(totalContributions.toFixed(2)));

    // Update the total value with yearly interest and contribution
    totalValue += yearlyInterest + yearlyContribution;

    chartYears.push(i + 1);

    growthData.push({
      year: i + 1,
      balance: totalValue - totalFees,
    });

    feeData.push({
      year: i + 1,
      fees: totalFees,
    });
  }

  return {
    growthData,
    feeData,
  };
}

export function calculateFees(
  balance: number,
  adminPercentage: number,
  adminDollar: number,
  investmentPercentage: number
) {
  const adminFee = balance * (adminPercentage / 100) + adminDollar;
  const investmentFee = balance * (investmentPercentage / 100);
  const totalFees = adminFee + investmentFee;
  return totalFees;
}
