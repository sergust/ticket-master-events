"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { Calendar } from "~/components/ui/calendar";
import LocationPicker from "./map-picker";
import { FormSchema } from "~/types/formTypes";
import { type z } from "zod";

/**
 * Renders a form for searching events.
 *
 * @param onSubmit - The callback function to be called when the form is submitted.
 * @param isPending - A boolean indicating whether the form is currently pending.
 */
export default function EventSearchForm({
  onSubmit,
  isPending,
}: {
  onSubmit: (values: z.infer<typeof FormSchema>) => void;
  isPending: boolean;
}) {
  // Initialize the form using react-hook-form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-my-8 my-8 ">
        <div className="flex flex-wrap gap-4">
          <div className="flex w-full flex-wrap gap-4">
            {/* Start Date Field */}
            <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start date</FormLabel>
                  {/* Popover for selecting start date */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    {/* Calendar component for selecting start date */}
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Start date of the event</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* End Date Field */}
            <FormField
              control={form.control}
              name="endDateTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End date</FormLabel>
                  {/* Popover for selecting end date */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    {/* Calendar component for selecting end date */}
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>End date of the event</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Location Field */}
          <div className="w-full">
            <FormField
              control={form.control}
              name="geoHash"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Select a location</FormLabel>
                  <FormControl>
                    <LocationPicker {...field} />
                  </FormControl>
                  <FormDescription>
                    Select a location of the event
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* Submit Button */}
        <Button type="submit" className="mt-2" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
