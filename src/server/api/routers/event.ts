import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

// const ROOT_API = "https://app.ticketmaster.com/discovery/v2/events.json?";
// const URL = new URL(ROOT_API);
// URL.searchParams.append("apikey", process.env.CONSUMER_KEY as string);

export const eventRouter = createTRPCRouter({
  searchEvent: publicProcedure
    .input(
      z.object({
        geoHash: z.string(), // geoHash
        // radius: z.string(),
        startDateTime: z.date(),
        endDateTime: z.date(),
      }),
    )
    .mutation(async (ctx) => {
      console.log(ctx.input);
      return {
        result: "check",
      };
    }),
});
