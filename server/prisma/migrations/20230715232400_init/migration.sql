/*
  Warnings:

  - Added the required column `requestState` to the `FriendRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FriendRequest" ADD COLUMN     "requestState" "RequestState" NOT NULL;
