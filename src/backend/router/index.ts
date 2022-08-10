import * as trpc from "@trpc/server"
import { z } from "zod"
import { prisma } from "@/backend/utils/prisma"

export const appRouter = trpc
  .router()
  .query("get-collection", {
    async resolve() {
      const collection = await prisma.book.findMany({})
      const interactions = await prisma.interaction.findMany({})

      return { collection, interactions }
    }
  })
  .mutation("move-shelf", {
    input: z.object({
      shelf: z.string()
    }),
    async resolve({ input }) {
      const interactionInDb = await prisma.interaction.create({
        data: {
          shelf: input.shelf
        }
      })
      return { success: true, interaction: interactionInDb }
    }
  })

// export type definition of API
export type AppRouter = typeof appRouter
