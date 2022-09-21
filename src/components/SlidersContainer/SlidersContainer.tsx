import Slider from "./Slider";
import { DisplayCardProps } from "../../types";

interface GridProps {
  data: {
    results: DisplayCardProps[];
  };
}

const SlidersContainer = ({ data }: GridProps) => {
  console.log(data);
  const firstTenFromData = data.results.slice(0, 10);
  const SecondTenFromData = data.results.slice(10, 20);
  return (
    <>
      <h1 style={{ fontSize: "30px", textAlign: "center" }}>
        TRENDING THIS WEEK
      </h1>

      <section>
        <Slider layout="right" data={{ results: firstTenFromData }} />
      </section>

      <br />
      <br />
      <br />
      <br />

      <section>
        <Slider layout="left" data={{ results: SecondTenFromData }} />
      </section>
    </>
  );
};

export default SlidersContainer;
