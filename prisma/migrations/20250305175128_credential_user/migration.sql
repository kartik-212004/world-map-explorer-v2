-- CreateTable
CREATE TABLE "CredentialUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CredentialUser_id_key" ON "CredentialUser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CredentialUser_email_key" ON "CredentialUser"("email");
