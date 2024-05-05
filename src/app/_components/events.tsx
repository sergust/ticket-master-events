import { type ISearchApiResponse } from "~/types/eventTypes";

interface EventsProps {
  events: ISearchApiResponse;
}

export default function Events(props: EventsProps) {
  return (
    <div>
      <h2>Found events</h2>
      <ul>
        {props.events._embedded.events.map((event) => (
          <li key={event.id}>
            <h3>{event.name}</h3>
            <p>{event.info}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
