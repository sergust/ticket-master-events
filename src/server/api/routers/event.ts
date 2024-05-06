import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import axios from "axios";
import { format } from "date-fns";
import { type ISearchApiResponse } from "~/types/eventTypes";

const ROOT_API = "https://app.ticketmaster.com/discovery/v2/events.json";
const API_KEY = process.env.CONSUMER_KEY;

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
    .mutation(async ({ input }) => {
      const { geoHash, startDateTime, endDateTime } = input;
      const startDateFormatted = format(
        startDateTime,
        "yyyy-MM-dd'T'HH:mm:ss'Z'",
      );
      const endDateFormatted = format(endDateTime, "yyyy-MM-dd'T'HH:mm:ss'Z'");

      console.log(startDateFormatted);

      try {
        // Construct the full URL with parameters
        const response = await axios.get(ROOT_API, {
          params: {
            apikey: API_KEY,
            geoPoint: geoHash,
            startDateTime: startDateFormatted,
            endDateTime: endDateFormatted,
            size: 10,
          },
        });
        return response.data as ISearchApiResponse;
      } catch (error) {
        console.error("Failed to fetch events:", error);
        throw new Error("Failed to fetch events from Ticketmaster API");
      }
    }),
});
