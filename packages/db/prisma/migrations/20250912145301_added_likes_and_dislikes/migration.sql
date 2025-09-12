/*
  Warnings:

  - Added the required column `Dislikes` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Likes` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Type` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Made the column `ImageUrl` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `dislikes` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likes` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "Dislikes" INTEGER NOT NULL,
ADD COLUMN     "Likes" INTEGER NOT NULL,
ADD COLUMN     "Type" TEXT NOT NULL,
ALTER COLUMN "ImageUrl" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dislikes" INTEGER NOT NULL,
ADD COLUMN     "likes" INTEGER NOT NULL;
