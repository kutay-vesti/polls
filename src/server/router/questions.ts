import { createRouter } from "./context";
import { z } from "zod";
import {prisma} from "../db/client"
import superjson from "superjson"

export const questionRouter = createRouter()
  .query("get-all", {
    async resolve() {
      return await prisma.pollQuestion.findMany();

    }})


