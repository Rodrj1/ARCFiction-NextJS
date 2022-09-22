import { DisplayCardProps } from "../../types";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Image from "next/image";
import SliderCSS from "./Slider.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface SliderProps {
  data: {
    results: DisplayCardProps[];
  };
  layout: string;
}

const Slider = ({ data, layout }: SliderProps) => {
  const router = useRouter();
  const layoutAlign =
    layout == "right"
      ? `${SliderCSS.gridItem}`
      : `${SliderCSS.gridItemVersionTwo}`;

  const weeklyTrends = data.results.map((trend) => {
    const media = trend.name != undefined ? "tv" : "movie";
    return (
      <div key={trend.id} className={SliderCSS.gridContainer}>
        <div onClick={() => router.push(`./${media}/${trend.id.toString()}`)}>
          <a>
            <div className={`${layoutAlign} next-image-trending`}>
              <motion.div
                whileHover={{
                  transition: { duration: 0.3 },
                  scale: 1.04,
                }}
              >
                <Image
                  layout="intrinsic"
                  height={500}
                  width={400}
                  objectFit="contain"
                  src={`https://image.tmdb.org/t/p/w500/${trend.poster_path}`}
                />
              </motion.div>
            </div>
          </a>
        </div>
        <div className={layoutAlign}>
          <p>{trend.overview}</p>
        </div>
      </div>
    );
  });
  return (
    <section>
      <Carousel
        autoPlay
        infiniteLoop
        interval={5000}
        showStatus={false}
        showThumbs={false}
        showArrows={false}
      >
        {weeklyTrends}
      </Carousel>
    </section>
  );
};

export default Slider;
