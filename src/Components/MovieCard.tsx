import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useMatch } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "../utils";

function MovieCard({ clickedMovie }: any) {
  const bigMovieMatch = useMatch(`/movies/:movieId`);
  console.log(clickedMovie);
  const navigate = useNavigate();
  const onOverlayClick = () => navigate(`/`);
  return (
    <>
      <AnimatePresence>
        <Overlay
          onClick={onOverlayClick}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <MovieDetailCard
            style={{ top: 100 }}
            layoutId={bigMovieMatch?.params.movieId}
          >
            {clickedMovie && (
              <>
                <MovieCoverImage
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent),url(${makeImagePath(
                      clickedMovie.backdrop_path,
                      "w500"
                    )})`,
                  }}
                />
                <MovieTitle>{clickedMovie.title}</MovieTitle>
                <MovieStory>{clickedMovie.overview}</MovieStory>
              </>
            )}
          </MovieDetailCard>
        </Overlay>
      </AnimatePresence>
    </>
  );
}

export default MovieCard;

const MovieDetailCard = styled(motion.div)`
  position: fixed;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: #080808;
`;

const MovieCoverImage = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
`;

const MovieTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 2rem;
  padding: 20px;
  position: relative;
  top: -80px;
`;

const MovieStory = styled.p`
  font-size: 16px;
  padding: 20px;
  color: ${(props) => props.theme.white.darker};
  text-align: justify;
  line-height: 24px;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
