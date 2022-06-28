import { createRouter } from "./context";
import { z } from "zod";
import {prisma} from "../db/client"

export const exampleRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.pollQuestion.findMany();
    },
  })
  .query("getAllQuestions", {
    async resolve() {
      return await prisma.pollQuestion.findMany();

    }})


