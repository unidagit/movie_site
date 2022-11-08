import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { IMovie } from "../api";
import { makeImagePath } from "../utils";
import { useMatch, useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import styled from "styled-components";

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

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: "tween",
    },
  },
};

const offset = 6;

interface ISlider {
  data: IMovie[] | undefined;
  title: string;
}

function MovieSlider({ data, title }: ISlider) {
  const bigMovieMatch = useMatch(`/movies/:movieId`);
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isBack, setIsBack] = useState(true);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(false);
      const totalMovies = data.length;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(true);
      const totalMovies = data.length;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const onBoxClicked = (movieId: number) => {
    //내가 클릭하고 있는 영화의 id
    navigate(`/movies/${movieId}`);
  };

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.find((movie) => movie.id + "" === bigMovieMatch.params.movieId);
  console.log(clickedMovie);

  return (
    <>
      {data && (
        <Wrapper>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <SliderTitle>{title}</SliderTitle>
              <Row
                custom={isBack}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data
                  ?.slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      key={movie.id}
                      bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                      initial="normal"
                      whileHover="hover"
                      variants={boxVariants}
                      onClick={() => onBoxClicked(movie.id)}
                      transition={{ type: "tween" }}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
                <LeftButton onClick={decraseIndex}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                      fill="white"
                      d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
                    />
                  </svg>
                </LeftButton>
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
          {/* {bigMovieMatch ? <MovieCard clickedMovie={clickedMovie} /> : null} */}
          {bigMovieMatch ? <MovieCard clickedMovie={clickedMovie} /> : null}
        </Wrapper>
      )}
    </>
  );
}

export default MovieSlider;

const Wrapper = styled.div`
  max-height: fit-content;
  width: 100%;
`;

const Slider = styled.div`
  position: relative;
  width: 95vw;
  padding: 51px;
`;

const SliderTitle = styled.h3`
  font-size: 1.4vw;
  margin-bottom: 12px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, minmax(100px, 1fr));
  gap: 5px;
  position: absolute;
  width: 100%;
  height: 150px;
  /* top: -60px; */
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  overflow: hidden;
  background-color: white;
  object-fit: cover;
  width: 100%;
  height: auto;

  /* color: red; */
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => props.bgphoto});
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  &:hover {
    z-index: 99;
  }
`;

const LeftButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 150px;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    svg {
      fill: rgba(255, 255, 255, 0.2);
    }
  }
`;

const RightButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 152px;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    svg {
      fill: rgba(255, 255, 255, 0.2);
    }
  }
`;

const Info = styled(motion.div)`
  position: absolute;
  width: 100%;
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  bottom: 0;
  h4 {
    font-size: 0.8rem;
  }
`;
