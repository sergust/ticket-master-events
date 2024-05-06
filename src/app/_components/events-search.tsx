"use client";

import { api } from "~/trpc/react";
import { useState } from "react";
import Events from "./events";
import { type ISearchApiResponse } from "~/types/eventTypes";
import EventSearchForm from "./event-search-form";
import { type FormSchema } from "~/types/formTypes";
import { type z } from "zod";
import EventCardSkeleton from "./event-card-skeleton";

/**
 * Renders the EventsSearch component.
 * This component displays a search form, event card skeletons, and a list of events.
 */
export default function EventsSearch() {
  const [events, setEvents] = useState<ISearchApiResponse>();

  const query = api.event.searchEvent.useMutation({
    onSuccess: (data) => {
      setEvents(data);
    },
  });

  /**
   * Handles form submission.
   * @param values - The form values.
   */
  async function onSubmit(values: z.infer<typeof FormSchema>) {
    query.mutate(values);
  }

  return (
    <div>
      <EventSearchForm onSubmit={onSubmit} isPending={query.isPending} />

      {query.isPending && <EventCardSkeleton />}

      {events && <Events events={events} />}
    </div>
  );
}
