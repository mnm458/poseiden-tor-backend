import express, { NextFunction, Request, Response } from "express";
import {
  insertCountry,
  insertDisbursement,
  insertEmployee,
} from "./dbServices";
import { PrismaClient } from "@prisma/client";
import { getZetlBalance, getPoolBalance } from "./tokenServices";
import { depositFunds, withdrawFunds, wlClient } from "./pool";

const prisma = new PrismaClient();

export const app = express();

//middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

function middleware(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  req.name = "joey";
  next();
}

app.use(middleware);

app.get("/zetlmock/disbursement", (req: Request, res: Response) => {
  return res.json({
    empID: 123,
    amount: 50,
    currency: "USDC",
    PaymentDetails: {
      bank: "Bank of Malaysia",
      accountNumber: 124559693920293,
      countryCode: 234,
    },
    fee: 0.02,
  });
});

app.get("/countries", async (req: Request, res: Response) => {
  try {
    const countries = await prisma.country.findMany();
    return res.status(200).json(countries);
  } catch (error) {
    console.error("Error retrieving countries:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving countries." });
  }
});

app.get("/employees", async (req: Request, res: Response) => {
  try {
    const employees = await prisma.employee.findMany();
    return res.status(200).json(employees);
  } catch (error) {
    console.error("Error retrieving employees:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving employees." });
  }
});

app.get("/employeesByCountry/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Get the 'id' from the URL parameter

    const employees = await prisma.employee.findMany({
      where: {
        countryId: parseInt(id),
      },
    });

    return res.status(200).json(employees);
  } catch (error) {
    console.error("Error retrieving employees by country:", error);
    return res
      .status(500)
      .json({
        error: "An error occurred while retrieving employees by country.",
      });
  }
});

app.get("/zetlBalance", async (req: Request, res: Response) => {
  try {
    const balance = await getZetlBalance();

    return res.status(200).json(balance);
  } catch (error) {
    console.error("Error getting token balance:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while getting token balance." });
  }
});

app.get("/poolBalance", async (req: Request, res: Response) => {
  try {
    const balance = await getPoolBalance();

    return res.status(200).json(balance);
  } catch (error) {
    console.error("Error getting token balance:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while getting token balance." });
  }
});

// API POST endpoint to add a disbursement
app.post("/disbursement/create", async (req: Request, res: Response) => {
  try {
    const disbursementData = req.body;

    const txHash = await withdrawFunds(disbursementData.amount, disbursementData.address);
    disbursementData.txHash = txHash;

    console.log(disbursementData);

    await insertDisbursement(disbursementData, prisma);

    // Send a success response with the newly created disbursement record
    return res.status(201).json("OK");
  } catch (error) {
    // Handle any errors that might occur during the insertion process
    console.error("Error adding disbursement:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while adding disbursement data." });
  }
});

// API POST endpoint to add a deposit
app.post("/disbursement/deposit", async (req: Request, res: Response) => {
  try {
    const amount = req.body.amount;
    console.log(amount);
    const txHash = await depositFunds(amount);
    // Send a success response with the new deposit
    return res.status(201).json(`Deposited ${amount} tokens to Pool with tx hash: ${txHash}`);
  } catch (error) {
    // Handle any errors that might occur during the insertion process
    console.error("Error adding disbursement:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while adding deposit." });
  }
});

// API POST endpoint to add a deposit
app.post("/disbursement/whitelist", async (req: Request, res: Response) => {
  try {
    const client = req.body.client;
    const txHash = await wlClient(client);
    // Send a success response with the new deposit
    return res
      .status(201)
      .json(`Client ${client} whitelisted with tx hash: ${txHash}`);
  } catch (error) {
    // Handle any errors that might occur during the insertion process
    console.error("Error adding disbursement:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while adding deposit." });
  }
});

// API POST endpoint to insert country data
app.post("/country/create", async (req: Request, res: Response) => {
  try {
    const countryData = req.body; // Assuming the request body contains country data

    await insertCountry(countryData, prisma);

    // Send a success response with the newly created country record
    return res.status(201).json(`${countryData.country} added in DB`);
  } catch (error) {
    // Handle any errors that might occur during the insertion process
    console.error("Error inserting country:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while inserting country data." });
  }
});

// API POST endpoint to add an employee
app.post('/employee/create', async (req: Request, res: Response) => {
  try {
      const employeeData = req.body; // Assuming the request body contains employee data

      const createdEmployee = await insertEmployee(employeeData, prisma);

      // Send a success response with the newly created employee record
      return res.status(201).json({
          message: `${employeeData.firstName} ${employeeData.lastName} added as an employee`,
          employee: createdEmployee
      });
  } catch (error) {
      // Handle any errors that might occur during the insertion process
      console.error('Error adding employee:', error);
      return res.status(500).json({ error: 'An error occurred while adding employee data.' });
  }
});


app.listen(3000, () => {
  console.log("Application listening at http://localhost:3000");
});
