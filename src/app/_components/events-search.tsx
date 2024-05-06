"use client";

import { api } from "~/trpc/react";
import { useState } from "react";
import Events from "./events";
import { type ISearchApiResponse } from "~/types/eventTypes";
import { Skeleton } from "~/components/ui/skeleton";
import EventSearchForm from "./event-search-form";
import { type FormSchema } from "~/types/formTypes";
import { type z } from "zod";

export default function EventsSearch() {
  const [events, setEvents] = useState<ISearchApiResponse>();

  const query = api.event.searchEvent.useMutation({
    onSuccess: (data) => {
      setEvents(data);
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    query.mutate(values);
  }

  return (
    <div>
      <EventSearchForm onSubmit={onSubmit} isPending={query.isPending} />

      {query.isPending && (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      )}

      {events && <Events events={events} />}
    </div>
  );
}
