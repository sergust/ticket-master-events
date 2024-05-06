import { z } from "zod";

/**
 * Represents the form schema for a ticket master event.
 */
export const FormSchema = z.object({
  startDateTime: z.date(),
  endDateTime: z.date(),
  geoHash: z.string(),
});
