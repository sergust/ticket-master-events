import { z } from "zod";

export const FormSchema = z.object({
  startDateTime: z.date(),
  endDateTime: z.date(),
  geoHash: z.string(),
});
