/*
  Warnings:

  - You are about to drop the column `postlikes` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "postlikes",
ADD COLUMN     "friendRequests" TEXT[];
