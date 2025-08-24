// templates.js
export const templates = [
  {
    id: 1,
    name: "Lease Agreement",
    fields: ["Owner Name", "Tenant Name", "Start Date", "End Date", "Monthly Rent", "Terms"],
    content: `
      LEASE AGREEMENT

      This lease agreement is made between {Owner Name} and {Tenant Name} starting from {Start Date} to {End Date}.
      The monthly rent is {Monthly Rent}.

      Terms:
      {Terms}
    `
  },
  {
    id: 2,
    name: "Loan Agreement",
    fields: ["Lender", "Borrower", "Amount", "Due Date", "Interest Rate", "Terms"],
    content: `
      LOAN AGREEMENT

      This loan agreement is made between {Lender} and {Borrower}.
      Loan Amount: {Amount}
      Due Date: {Due Date}
      Interest Rate: {Interest Rate}

      Terms:
      {Terms}
    `
  }
];
