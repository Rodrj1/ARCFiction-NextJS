import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToList } from "../../feature/list-slice";
import { v4 as uuid } from "uuid";
import { List, MediaProps } from "../../types";
import { useEffect, useState } from "react";
import NextLink from "../NextLink/NextLink";
import YoutubeTrailer from "../YoutubeTrailer/YoutubeTrailer";
import MediaCSS from "./media.module.css";
import Announcer from "../Announcer/Announcer";

interface DetailsProps {
  media: MediaProps["media"];
  TV_TRAILER:
    | {
        official?: boolean | undefined;
        id: number;
        key: string;
      }
    | undefined;
  similar: JSX.Element[];
  genres: string[];
  cast: (JSX.Element | undefined)[];
  images: (JSX.Element | undefined)[];
  id: string;
}

const MediaDetailsContainer = ({
  media,
  TV_TRAILER,
  similar,
  genres,
  cast,
  images,
  id,
}: DetailsProps) => {
  const [showListAnnouncer, setShowListAnnouncer] = useState<boolean>(false);
  const [announcerMessage, setAnnouncerMessage] = useState<string>("");

  const dispatch = useAppDispatch();
  const getCurrentLists = useAppSelector((state) => state.lists.currentLists);

  const handleAnnouncer = () => {
    setShowListAnnouncer((show) => !show);
  };

  const handleAddToList = (listId: string, listName: string) => {
    const findList = getCurrentLists.find((list: List) => list.id === listId);
    if (findList) {
      window.scrollTo(0, 0);
      window.onscroll = function () {
        window.scrollTo(0, 0);
      };

      const listIndex = getCurrentLists.indexOf(findList);
      handleAnnouncer();
      const mediaIsInList = getCurrentLists[listIndex].items.find(
        (listMedia) => listMedia.id === id
      );

      if (!mediaIsInList) {
        setAnnouncerMessage(
          `${
            media.name ? media.name : media.title
          } succesfully listed in ${listName} list!`
        );
        dispatch(
          addToList({
            media: {
              name: media.name,
              title: media.title,
              poster_path: media.poster_path,
              id,
              uuid: uuid(),
            },
            listIndex,
          })
        );
      } else {
        setAnnouncerMessage(
          `${
            media.name ? media.name : media.title
          } is already listed in ${listName} list!`
        );
      }
    }
  };

  useEffect(() => {
    if (showListAnnouncer == false) {
      window.onscroll = function () {};
    }
  }, [showListAnnouncer]);

  const displayCurrentLists = getCurrentLists.map((list) => (
    <div
      className={MediaCSS.userLists}
      key={list.id}
      onClick={() => handleAddToList(list.id, list.name)}
    >
      {list.name}
    </div>
  ));

  return (
    <>
      <motion.div
        initial={{ x: -400, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        exit={{ x: -400, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={MediaCSS.details}>
          <div className={`${MediaCSS.detailsItem} ${MediaCSS.description}`}>
            <h1>
              {media.original_name
                ? media.name.toUpperCase()
                : media.title.toUpperCase()}
            </h1>
            <h3 style={{ color: "hsl(272, 88%, 62%)" }}>
              What's this all about?
            </h3>
            <p>
              {media.overview
                ? media.overview
                : "It does not have a description yet."}
            </p>
            <button className={MediaCSS.dropdown}>
              <i className="fa-solid fa-list fa-xl" /> Add to Lists
              <div className={MediaCSS.dropdownContent}>
                {getCurrentLists.length > 0 ? (
                  <>
                    <NextLink href="/lists">
                      <div className={MediaCSS.userLists}>
                        <i className="fa-solid fa-plus" /> Create New List
                      </div>
                    </NextLink>
                    {displayCurrentLists}
                  </>
                ) : (
                  <NextLink href="/lists">
                    <div className={MediaCSS.userLists}>
                      <i className="fa-solid fa-plus" /> Create New List
                    </div>
                  </NextLink>
                )}
              </div>
            </button>
          </div>

          <div className={MediaCSS.detailsItem}>
            <img
              loading="lazy"
              src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
              alt={media.original_title}
            />
          </div>

          <div className={`${MediaCSS.detailsItem} ${MediaCSS.description}`}>
            <a
              title="Visit Homepage"
              href={media.homepage}
              rel="noreferrer"
              target="_blank"
            >
              <h1>VISIT OFFICIAL WEBSITE</h1>
            </a>
            <p>{genres}</p>
            {media.first_air_date ? (
              <>
                <h3>{media.first_air_date}: First aired</h3>
                <h3>{media.last_air_date}: Last aired</h3>
              </>
            ) : (
              <>
                <h3>Release Date: {media.release_date}</h3>
                <h3>Runtime: {media.runtime}</h3>
              </>
            )}

            <h3>
              <i className="fa-solid fa-star" />
              {media.rating}
            </h3>

            <YoutubeTrailer trailer={TV_TRAILER} />
          </div>
        </div>

        <div className={MediaCSS.gridContainer}>
          <div className={MediaCSS.container}>
            <h1>If you liked it, then you might like this</h1>
            <div className={MediaCSS.innerContainer}>{similar}</div>
          </div>

          <div className={MediaCSS.container}>
            <h1>Top Cast</h1>
            <div className={MediaCSS.innerContainer}>{cast}</div>
          </div>
        </div>

        <br />
        <br />

        <div className={MediaCSS.container} style={{ width: "90%" }}>
          <h1>Best images</h1>
          <div className={MediaCSS.imageContainer}>{images}</div>
        </div>
      </motion.div>

      {showListAnnouncer && (
        <Announcer
          handleAnnouncer={handleAnnouncer}
          announcerMessage={announcerMessage}
        />
      )}
    </>
  );
};

export default MediaDetailsContainer;
