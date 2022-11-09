import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import { useNavigate, useMatch } from "react-router-dom";
import styled from "styled-components";
import { getShowDetail } from "../api";
import { makeImagePath } from "../utils";

function TvCard() {
  const bigTvMatch = useMatch(`/tv/:tvId`);
  const navigate = useNavigate();
  const onOverlayClick = () => navigate(`/tv`);

  const { data: tvDetail } = useQuery(
    ["tvsDetail", bigTvMatch?.params.tvId],
    () => getShowDetail(Number(bigTvMatch?.params.tvId))
  );
  console.log(tvDetail);

  return (
    <>
      {tvDetail ? (
        <AnimatePresence>
          <Overlay
            onClick={onOverlayClick}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <TvDetailCard
              style={{ top: 100 }}
              // layoutId={bigMovieMatch?.params.movieId}
              // layoutId={`${bigMovieMatch?.params.movieId}`}
            >
              <MovieCoverImage
                style={{
                  backgroundImage: `linear-gradient(to top, black, transparent),url(${makeImagePath(
                    tvDetail.backdrop_path,
                    "w500"
                  )})`,
                }}
              />
              <MovieInfoBox>
                <TitleBox>
                  <MovieTitle>{tvDetail.title}</MovieTitle>
                  <MovieTitleList>
                    <MovieRelase>
                      {tvDetail.first_air_date.substr(0, 4)}
                    </MovieRelase>
                    <svg
                      width="18"
                      height="auto"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="red"
                        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                      />
                    </svg>
                    <MovieRatio>{tvDetail.vote_average.toFixed(1)}</MovieRatio>
                    <MovieVote>
                      {Number(tvDetail.vote_count).toLocaleString()}명이 투표함
                    </MovieVote>
                  </MovieTitleList>
                </TitleBox>

                <Genres>
                  {tvDetail.genres.map((i: any) => (
                    <Genre key={i.id}>{i.name}</Genre>
                  ))}
                </Genres>

                <MovieStory>{tvDetail.overview}</MovieStory>
              </MovieInfoBox>
            </TvDetailCard>
          </Overlay>
        </AnimatePresence>
      ) : null}
    </>
  );
}

export default TvCard;

const TvDetailCard = styled(motion.div)`
  min-width: 403px;
  position: fixed;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: auto;
  background-color: #080808;

  ::-webkit-scrollbar {
    width: 0.5rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #4e4e4e;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: #080808;
    border-radius: 10px;
  }
`;

const MovieCoverImage = styled.div`
  width: 100%;
  height: 300px;
  /* object-fit: cover; */
  background-size: cover;
  background-position: center center;
`;

const MovieInfoBox = styled.div`
  padding: 0 3em;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
`;

const Genres = styled.ul`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 12px;
`;

const Genre = styled.li`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.5rem 0.55rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.black.lighter};
  color: ${(props) => props.theme.white.darker};
`;

const TitleBox = styled.div`
  position: relative;
  top: -80px;
`;

const MovieTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const MovieTitleList = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MovieRelase = styled.p`
  border: 1px solid ${(props) => props.theme.white.darker};
  border-radius: 3px;
  padding: 0.3rem;
`;

const MovieRatio = styled.p`
  font-weight: 600;
  margin-left: -10px;
`;

const MovieVote = styled.p`
  font-size: 0.8rem;
  font-weight: 100;
  color: ${(props) => props.theme.white.lighter};
  margin-left: auto;
`;

const MovieStory = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.white.darker};
  text-align: justify;
  line-height: 24px;
  margin-bottom: 3em;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
