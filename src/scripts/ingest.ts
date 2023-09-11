
import { Employee, Country } from "../types/interfaces";
import { insertCountry, insertEmployee } from "../dbServices";
import employeesData from "../../data/employees.json"
import countriesData from "../../data/countries.json"; 
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function insertData() {
  // Insert countries first, as employees reference the countryId.
  for (const countryData of countriesData) {
    await insertCountry(countryData as Country, prisma);
  }

  for (const empData of employeesData) {
    const employee: Employee = {
      id: empData.empID,
      firstName: empData.empName,
      lastName: empData.empLName,
      employer: empData.employer,
      countryId: empData.countryId,
    };
    await insertEmployee(employee, prisma);
  }
}

async function main() {
  try {
    await insertData();
    console.log("Data insertion successful!");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    // Disconnect Prisma client after insertion.
    await prisma.$disconnect();
  }
}

main();
