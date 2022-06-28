import { createRouter } from "./context";
import { z } from "zod";
import {prisma} from "../db/client"
import superjson from "superjson"

export const exampleRouter = createRouter()
  .query("getAllQuestions", {
    async resolve() {
      return await prisma.pollQuestion.findMany();

    }})


