import { motion } from "framer-motion";
import { useGetCurrentWidth } from "../../hooks/useGetCurrentWidth";

interface MotionDivProps {
  children: JSX.Element;
}

const AnimatedMotionDiv = ({ children }: MotionDivProps) => {
  const { width } = useGetCurrentWidth();
  return (
    <>
      {width > 670 ? (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default AnimatedMotionDiv;
