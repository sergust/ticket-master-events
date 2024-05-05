import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { type IEmbedded } from "~/types/eventTypes";

interface IEventCardProps {
  event: IEmbedded;
}

export default function EventCard(props: IEventCardProps) {
  return (
    <Card>
      <CardHeader>{props.event.name}</CardHeader>
      <CardContent>{props.event.info}</CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
