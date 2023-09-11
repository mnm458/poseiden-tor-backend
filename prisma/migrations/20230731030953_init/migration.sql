-- CreateTable
CREATE TABLE "Employee" (
    "id" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "employer" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "currency" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disbursements" (
    "id" SERIAL NOT NULL,
    "empId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "txHash" TEXT NOT NULL,

    CONSTRAINT "Disbursements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_id_key" ON "Employee"("id");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disbursements" ADD CONSTRAINT "Disbursements_empId_fkey" FOREIGN KEY ("empId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
