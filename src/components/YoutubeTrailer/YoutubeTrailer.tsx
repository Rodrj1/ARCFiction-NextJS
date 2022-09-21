import { useState } from "react";
import YouTube from "react-youtube";

interface TrailerProps {
  trailer:
    | {
        official?: boolean;
        id: number;
        key: string;
      }
    | undefined;
}

const YoutubeTrailer = ({ trailer }: TrailerProps) => {
  const [playTrailer, setPlayTrailer] = useState<boolean>(false);
  const updateTrailerState = () => {
    setPlayTrailer((play) => !play);
  };

  return (
    <>
      {trailer && playTrailer ? (
        <>
          <YouTube
            videoId={trailer.key}
            opts={{ width: "100%", height: "290px" }}
            className="youtube-trailer"
          />
          <button onClick={updateTrailerState} className="btn-trailer-on">
            <i className="fa-solid fa-circle-pause fa-2xl" /> CLOSE
          </button>
        </>
      ) : (
        <button onClick={updateTrailerState} className="btn-trailer-off">
          <i className="fa-solid fa-circle-play fa-2xl" /> Play Trailer
        </button>
      )}
      <style jsx>{`
        .youtube-trailer {
          z-index: 1000;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
        }

        .btn-trailer-off,
        .btn-trailer-on {
          font-size: 1rem;
          border-radius: 20px;
          transition: 0.3s ease-in-out;
          background: linear-gradient(
            to right,
            hsl(247, 67%, 13%),
            hsl(272, 45%, 30%)
          );
          width: 150px;
          margin: 5px 0px;
          color: white;
          border: none;
        }

        .btn-trailer-off {
          height: 40px;
        }

        .btn-trailer-on {
          position: absolute;
          z-index: 2000;
          height: 50px;
          left: 0;
          bottom: 0;
          top: 0;
          top: 60px;
        }

        .btn-trailer-on:hover,
        .btn-trailer-off:hover {
          box-shadow: inset 150px 0 50px 0 hsl(308, 35%, 26%);
          border: 1px solid white;
        }

        .btn-trailer-on:focus,
        .btn-trailer-off:focus {
          box-shadow: inset 150px 0 50px 0 hsl(246, 55%, 10%);
        }
      `}</style>
    </>
  );
};

export default YoutubeTrailer;
