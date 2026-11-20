-- CreateEnum
CREATE TYPE "GoingToSchoolTime" AS ENUM ('morning', 'night');

-- CreateEnum
CREATE TYPE "UserConstitution" AS ENUM ('normal', 'cold', 'hot');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "password" VARCHAR(256) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSetting" (
    "userId" INTEGER NOT NULL,
    "goingToSchoolTime" "GoingToSchoolTime" NOT NULL,
    "constitution" "UserConstitution" NOT NULL,

    CONSTRAINT "UserSetting_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- AddForeignKey
ALTER TABLE "UserSetting" ADD CONSTRAINT "UserSetting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
