-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "lastName" VARCHAR NOT NULL,
    "gender" VARCHAR NOT NULL,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);
