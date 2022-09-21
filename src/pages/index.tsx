import { motion } from "framer-motion";
import { DisplayCardProps } from "../types";
import { requests } from "../data/requests";
import type { NextPage } from "next";
import SlidersContainer from "../components/SlidersContainer/SlidersContainer";
import Categorizer from "../components/Categorizer/Categorizer";

interface HomeProps {
  weekly: {
    results: DisplayCardProps[];
  };
  popular: {
    results: DisplayCardProps[];
  };
  upcoming: {
    results: DisplayCardProps[];
  };
  topRated: {
    results: DisplayCardProps[];
  };
}

const Home: NextPage<HomeProps> = ({ weekly, popular, upcoming, topRated }) => {
  return (
    <>
      <div className="welcomeDiv">
        <h1 className="welcomeh1">
          Hi! <br />
          NextJS version of Movies and TV-Shows
        </h1>
      </div>

      <br />

      <motion.div
        initial={{ x: -400, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        exit={{ x: -400, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SlidersContainer data={weekly} />
      </motion.div>

      <br />

      <motion.div
        initial={{ x: -400, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        exit={{ x: -400, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="popularAndTrending"
      >
        <Categorizer name="What's Popular?" data={popular} />
      </motion.div>

      <br />

      <motion.div
        initial={{ x: -400, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        exit={{ x: -400, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Categorizer name="Upcoming" data={upcoming} />

        <br />

        <Categorizer name="Top Rated" data={topRated} />
      </motion.div>

      <br />
    </>
  );
};

export const getServerSideProps = async () => {
  try {
    const [fetchWeekly, fetchPopular, fetchUpcoming, fetchTopRated] =
      await Promise.all([
        fetch(requests.fetchWeekly),
        fetch(requests.fetchPopular),
        fetch(requests.fetchUpcoming),
        fetch(requests.fetchTopRated),
      ]);

    const [weekly, popular, upcoming, topRated] = await Promise.all([
      fetchWeekly.json(),
      fetchPopular.json(),
      fetchUpcoming.json(),
      fetchTopRated.json(),
    ]);

    return {
      props: {
        weekly,
        popular,
        upcoming,
        topRated,
      },
    };
  } catch (e) {
    console.log(e);
  }
};
export default Home;
