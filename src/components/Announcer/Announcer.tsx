import { motion } from "framer-motion";
import AnnouncerContainer from "../AnnouncerContainer/AnnouncerContainer";

interface AnnouncerProps {
  handleAnnouncer: () => void;
  announcerMessage: string;
}

const Announcer = ({ handleAnnouncer, announcerMessage }: AnnouncerProps) => {
  const variants = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };
  return (
    <>
      <AnnouncerContainer onClick={handleAnnouncer}>
        <motion.div variants={variants} onClick={(e) => e.stopPropagation}>
          <div className="announcer">
            <p>{announcerMessage.toUpperCase()}</p>
          </div>
        </motion.div>
      </AnnouncerContainer>
      <style jsx>{`
        .announcer {
          width: 300px;
          height: 200px;
          border-radius: 5px;
          margin: auto;
          padding: 0 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgb(70, 13, 131);
        }

        .announcer p {
          font-size: 1.2rem;
          font-weight: 500;
          height: 90%;
          width: 100%;
          padding: 5px;
          overflow-y: auto;
          overflow-x: hidden;
        }
      `}</style>
    </>
  );
};

export default Announcer;
