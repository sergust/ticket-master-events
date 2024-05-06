import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import axios from "axios";
import { format } from "date-fns";
import { type ISearchApiResponse } from "~/types/eventTypes";

const ROOT_API = "https://app.ticketmaster.com/discovery/v2/events.json";
const API_KEY = process.env.CONSUMER_KEY;
const DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss'Z'";

/**
 * Router for handling event-related API requests.
 */
export const eventRouter = createTRPCRouter({
  /**
   * Searches for events based on the provided criteria.
   * @param input - The input parameters for the search.
   * @returns A promise that resolves to the search results.
   */
  searchEvent: publicProcedure
    .input(
      z.object({
        geoHash: z.string(), // geoHash
        startDateTime: z.date(),
        endDateTime: z.date(),
      }),
    )
    .mutation(async ({ input }) => {
      const { geoHash, startDateTime, endDateTime } = input;
      const startDateFormatted = format(startDateTime, DATE_FORMAT);
      const endDateFormatted = format(endDateTime, DATE_FORMAT);

      try {
        // Construct the full URL with parameters
        const response = await axios.get(ROOT_API, {
          params: {
            apikey: API_KEY,
            geoPoint: geoHash,
            startDateTime: startDateFormatted,
            endDateTime: endDateFormatted,
            size: 10, // Limit the number of results
          },
        });
        return response.data as ISearchApiResponse;
      } catch (error) {
        console.error("Failed to fetch events:", error);
        throw new Error("Failed to fetch events from Ticketmaster API");
      }
    }),
});
