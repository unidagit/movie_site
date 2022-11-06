import { motion, AnimatePresence } from "framer-motion";
import styled, { css } from "styled-components";
import { useState } from "react";
import { IMovie } from "../api";
import { makeImagePath } from "../utils";

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const offset = 6;

interface ISlider {
  data: IMovie[] | undefined;
  title: string;
}

function MovieSlider({ data }: ISlider) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (leaving) return;
    toggleLeaving();
    setIndex((prev) => prev + 1);
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);
  return (
    <Slider>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <Row
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
          key={index}
        >
          {data?.slice(offset * index, offset * index + offset).map((movie) => (
            <Box
              key={movie.id}
              bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
            >
              {movie.title}
            </Box>
          ))}
          {/* <LeftButton onClick={decraseIndex}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                fill="white"
                d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
              />
            </svg>
          </LeftButton> */}
          <RightButton onClick={increaseIndex}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                fill="white"
                d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
              />
            </svg>
          </RightButton>
        </Row>
      </AnimatePresence>
    </Slider>
  );
}

export default MovieSlider;

const Slider = styled.div`
  position: relative;
  width: 100%;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: 200px;
  color: red;
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => props.bgPhoto});
`;

const ButtonStyle = css`
  position: absolute;
  top: 0;
  height: 100%;
  z-index: 10;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  svg {
    width: 30px;
    height: 30px;
  }
  &:hover {
    background-color: gray;
    opacity: 0.5;
    svg {
      opacity: 1;
    }
  }
`;

const RightButton = styled.button`
  ${ButtonStyle}
  right: 0;
`;
