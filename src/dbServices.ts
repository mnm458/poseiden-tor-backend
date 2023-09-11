import { PrismaClient } from '@prisma/client';
import { Country, Disbursements, Employee } from "./types/interfaces";
import { timeStamp } from "console";



export async function insertEmployee(empData: Employee, prisma: PrismaClient) {
    const createdEmployee = await prisma.employee.create({
        data: {
            id: empData.id,
            firstName: empData.firstName,
            lastName: empData.lastName,
            employer: empData.employer,
            countryId: empData.countryId,
        },
    });
    return createdEmployee;
}


export async function insertCountry(countryData: Country, prisma: PrismaClient) {
    const country = await prisma.country.create({
        data: {
            country: countryData.country,
            currency: countryData.currency
        }
    })
}


export async function insertDisbursement(disbData: Disbursements, prisma: PrismaClient) {
    const disbursment = await prisma.disbursements.create({
        data: {
            empId: disbData.empId,
            amount: disbData.amount,
            timestamp: new Date(),
            txHash: disbData.txHash

        }
    })

    return true;

}





