import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getMovies,
  getPopularMovies,
  IGetMovieResult,
  getTopRated,
} from "../api";
import MovieSlider from "../Components/MovieSlider";
import { makeImagePath } from "../utils";

function Home() {
  const { data: nowplayingData, isLoading: isNowplayingLoading } =
    useQuery<IGetMovieResult>(["movies", "nowPlaying"], getMovies);
  console.log(nowplayingData);

  const { data: popularData, isLoading: isPopularLoading } =
    useQuery<IGetMovieResult>(["movies", "trending"], getPopularMovies);

  const { data: topRated, isLoading: isTopRatedLoading } =
    useQuery<IGetMovieResult>(["movies", "topRating"], getTopRated);

  return (
    <Wrapper>
      {isNowplayingLoading || isPopularLoading || isTopRatedLoading ? (
        <Loader>loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              nowplayingData?.results[11].backdrop_path || ""
            )}
          >
            <Title>{nowplayingData?.results[11].title}</Title>
            <Overview>{nowplayingData?.results[11].overview}</Overview>
            <BannerButton>상세정보</BannerButton>
          </Banner>
          <Sliders>
            <MovieSlider data={nowplayingData?.results} title="현재상영작" />
            <MovieSlider
              data={popularData?.results}
              title="오늘 대한민국의 TOP 10 시리즈"
            />
            <MovieSlider data={topRated?.results} title="인기순위 영화" />
          </Sliders>
        </>
      )}
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  display: flex;
  flex-direction: column;
  justify-content: end;
  height: 70vh;
  padding: 51px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 3.8rem;
  margin-bottom: 20px;
  min-width: 280px;
`;

const Overview = styled.p`
  font-size: 15px;
  line-height: 23px;
  min-width: 280px;
  width: 30%;
  word-break: keep-all;
`;

const BannerButton = styled.button`
  width: 150px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 400;
  border-radius: 0.75rem;
  background-color: #505257;
  margin-top: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.white.lighter};
  &:hover {
    background-color: #434344;
  }
`;

const Sliders = styled.div`
  /* left: 0; */
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6rem;
`;
