import { Suspense } from "react";
import { ListLength, Point, CardType } from "./constant";
import Loading from "../Loading";

const Card = ({
  item,
  i,
  cardSize,
}: {
  item: CardType & Point;
  i: number;
  cardSize: number;
}) => {
  return (
    <Suspense fallback={<Loading />}>
      <div
        key={item.name}
        className="absolute rounded-[2rem] flex items-center justify-center"
        style={{
          width: cardSize,
          height: cardSize,
          left: item.x - cardSize / 2,
          top: item.y - cardSize / 2,
          transform: `rotate(${(360 / ListLength) * i + 90}deg)`,
          background: "conic-gradient(#f0f0f0, #ffffff)",
        }}
      >
        {item.image}
      </div>
    </Suspense>
  );
};

export default Card;
