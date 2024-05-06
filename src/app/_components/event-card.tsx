import Image from "next/image";
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
      <CardHeader>
        <h3 className="font-semibold">{props.event.name}</h3>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <Image
            src={props.event.images[0]!.url}
            width="1024"
            height="683"
            alt=""
            className="self-center"
          />
          <span>{props.event.info}</span>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
