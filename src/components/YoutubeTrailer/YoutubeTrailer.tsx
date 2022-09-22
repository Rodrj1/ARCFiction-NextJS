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
          transition: 0.2s ease-in-out;
          background: #571b986c;
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
          border: 1px solid white;
        }

        .btn-trailer-on:focus,
        .btn-trailer-off:focus {
          box-shadow: inset 150px 0 50px 0 hsl(246, 55%, 10%);
        }
        @media screen and (max-width: 648px) {
          .btn-trailer-off {
            align-self: center;
          }
        }
      `}</style>
    </>
  );
};

export default YoutubeTrailer;
