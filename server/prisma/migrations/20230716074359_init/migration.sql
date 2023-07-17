/*
  Warnings:

  - Made the column `userId` on table `FriendRequest` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "FriendRequest" DROP CONSTRAINT "FriendRequest_userId_fkey";

-- AlterTable
ALTER TABLE "FriendRequest" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
