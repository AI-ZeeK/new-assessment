/*
  Warnings:

  - You are about to drop the column `friendRequests` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "RequestState" AS ENUM ('ACCEPTED', 'PENDING', 'REJECTED');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "friendRequests";

-- CreateTable
CREATE TABLE "FriendRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "FriendRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FriendRequest_userId_key" ON "FriendRequest"("userId");

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
