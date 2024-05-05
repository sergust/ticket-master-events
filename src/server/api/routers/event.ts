import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const ROOT_API = "https://app.ticketmaster.com/discovery/v2/events.json?";
const URL = new URL(ROOT_API);
URL.searchParams.append("apikey", process.env.CONSUMER_KEY as string);

export const eventRouter = createTRPCRouter({
  searchEvent: publicProcedure
    .input(
      z.object({
        geoPoint: z.string(), // geoHash
        radius: z.string(),
        startDateTime: z.string(),
        endDateTime: z.string(),
      }),
    )
    .query(async (ctx) => {
      return {
        result: "check",
      };
    }),
});
