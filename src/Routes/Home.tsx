import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, getPopularMovies, IGetMovieResult } from "../api";
import MovieSlider from "../Components/MovieSlider";
import { makeImagePath } from "../utils";

function Home() {
  const { data: nowplayingData, isLoading: isNowplayingLoading } =
    useQuery<IGetMovieResult>(["movies", "nowPlaying"], getMovies);
  console.log(nowplayingData);

  const { data: popularData, isLoading: isPopularLoading } =
    useQuery<IGetMovieResult>(["movies", "trending"], getPopularMovies);

  return (
    <Wrapper>
      {isNowplayingLoading || isPopularLoading ? (
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
          </Banner>
          <Sliders>
            <MovieSlider data={nowplayingData?.results} title="현재상영작" />
            <MovieSlider
              data={popularData?.results}
              title="오늘 대한민국의 TOP 10 시리즈"
            />
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
  justify-content: center;
  height: 70vh;
  padding: 51px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 3.8rem;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 15px;
  line-height: 23px;
  width: 50%;
`;

const Sliders = styled.div`
  /* left: 0; */
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6rem;
`;
