import { motion } from "framer-motion";

interface AnnouncerContainerProps {
  children: JSX.Element;
  onClick: () => void;
}

const AnnouncerContainer = ({ children, onClick }: AnnouncerContainerProps) => {
  return (
    <>
      <motion.div
        className="backdrop"
        onClick={onClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="backdrop">{children}</div>
      </motion.div>
      <style jsx>{`
        .backdrop {
          position: absolute;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100%;
          background: hsla(0, 0%, 0%, 0.242);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100000;
        }
      `}</style>
    </>
  );
};

export default AnnouncerContainer;
