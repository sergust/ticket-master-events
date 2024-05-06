import { type ISearchApiResponse } from "~/types/eventTypes";
import EventCard from "./event-card";

interface EventsProps {
  events: ISearchApiResponse;
}

/**
 * Renders a component that displays a list of events.
 *
 * @param props - The component props containing the events data.
 * @returns The rendered component.
 */
export default function Events(props: EventsProps) {
  return (
    <div>
      <h2 className="my-4 text-3xl font-semibold">Found events</h2>
      <div className="flex flex-col gap-4">
        {props.events._embedded.events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
