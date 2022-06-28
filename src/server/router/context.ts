// // src/server/router/context.ts
// import * as trpc from "@trpc/server";
// import * as trpcNext from "@trpc/server/adapters/next";
// import { prisma } from "../db/client";

// export const createContext = ({
//   req,
//   res,
// }: trpcNext.CreateNextContextOptions) => {
//   return {
//     req,
//     res,
//     prisma,
//   };
// };

// type Context = trpc.inferAsyncReturnType<typeof createContext>;

// export const createRouter = () => trpc.router<Context>();


import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

// The app's context - is generated for each incoming request
export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  return { token: opts?.req.cookies["poll-token"], req: opts?.req };
}
type Context = trpc.inferAsyncReturnType<typeof createContext>;

// Helper function to create a router with your app's context
export function createRouter() {
  return trpc.router<Context>();
}