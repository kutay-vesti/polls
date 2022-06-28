import { createRouter } from "./context";
import { z } from "zod";
import {prisma} from "../db/client"
import superjson from "superjson"

export const questionRouter = createRouter()
  .query("get-all", {
    async resolve() {
      return await prisma.pollQuestion.findMany();
    }}).mutation("create", {
        input: z.object({
            question: z.string().min(5).max(600),
        }),
        async resolve({input}){
            const newQuestion = await prisma.pollQuestion.create({
                data:{

                    question:input.question,
                }
            })
        }
    })


