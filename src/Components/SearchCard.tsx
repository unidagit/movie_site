import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
// import { useQuery } from "react-query";

import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getDetailsMovies } from "../api";
// import { getMovieSearchResults } from "../api";
// import { IGetMovieSearch } from "../api";
import { makeImagePath } from "../utils";

// interface ISearch {
//   data: IMovie[] | undefined;
// }

function SearchCard() {
  const searchMovieMatch = useMatch(`/search/movie/:movieId`);
  const navigate = useNavigate();
  const onOverlayClick = () => navigate(`/search`);
  // console.log(searchMovie);

  // const { data: searchMovie } = useQuery(
  //   ["searchMovie", searchMatch?.params.searchId],
  //   () => getMovieSearchResults(searchMatch?.params.searchId + "")
  // );
  // console.log(searchMovie);

  // const { data: tvDetail } = useQuery(
  //   ["tvsDetail", bigTvMatch?.params.tvId],
  //   () => getShowDetail(Number(bigTvMatch?.params.tvId))
  // );

  const { data: movieDetail } = useQuery(
    ["moviesDetail", searchMovieMatch?.params.movieId],
    () => getDetailsMovies(Number(searchMovieMatch?.params.movieId))
  );

  return (
    <>
      {movieDetail ? (
        <AnimatePresence>
          <Overlay
            onClick={onOverlayClick}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <TvDetailCard>
              <MovieCoverImage
                style={{
                  backgroundImage: `linear-gradient(to top, black, transparent),url(${makeImagePath(
                    movieDetail.backdrop_path,
                    "w500"
                  )})`,
                }}
              />

              <CloseButton onClick={onOverlayClick}>
                <CloseIcon
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                </CloseIcon>
              </CloseButton>
              <MovieInfoBox>
                <TitleBox>
                  <MovieTitle>{movieDetail.name}</MovieTitle>
                  <MovieTitleList>
                    {/* <MovieRelase>
                      {data.first_air_date.substr(0, 4)}
                    </MovieRelase> */}
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
                    <MovieRatio>
                      {movieDetail.vote_average.toFixed(1)}
                    </MovieRatio>
                    <MovieVote>
                      {Number(movieDetail.vote_count).toLocaleString()}명이
                      투표함
                    </MovieVote>
                  </MovieTitleList>
                </TitleBox>

                <Genres>
                  {movieDetail.genres.map((i: any) => (
                    <Genre key={i.id}>{i.name}</Genre>
                  ))}
                </Genres>

                <MovieStory>{movieDetail.overview}</MovieStory>
              </MovieInfoBox>
            </TvDetailCard>
          </Overlay>
        </AnimatePresence>
      ) : null}
    </>
  );
}

export default SearchCard;

const TvDetailCard = styled(motion.div)`
  top: 100;
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

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 8px;
  border-radius: 0.5rem;
  z-index: 1;
  color: ${(props) => props.theme.white.lighter};
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const CloseIcon = styled.svg`
  height: 30px;
  fill: ${(props) => props.theme.black};
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

// const MovieRelase = styled.p`
//   border: 1px solid ${(props) => props.theme.white.darker};
//   border-radius: 3px;
//   padding: 0.3rem;
// `;

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
