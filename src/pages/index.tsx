import { DisplayCardProps } from "../types";
import { requests } from "../data/requests";
import type { NextPage } from "next";
import SlidersContainer from "../components/SlidersContainer/SlidersContainer";
import Categorizer from "../components/Categorizer/Categorizer";
import AnimatedMotionDiv from "../components/AnimatedMotionDiv/AnimatedMotionDiv";

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

      <AnimatedMotionDiv>
        <SlidersContainer data={weekly} />
      </AnimatedMotionDiv>

      <br />

      <AnimatedMotionDiv>
        <Categorizer name="What's Popular?" data={popular} />
      </AnimatedMotionDiv>

      <br />
      <AnimatedMotionDiv>
        <Categorizer name="Upcoming" data={upcoming} />
      </AnimatedMotionDiv>

      <br />

      <AnimatedMotionDiv>
        <Categorizer name="Top Rated" data={topRated} />
      </AnimatedMotionDiv>

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
