import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getAiringTodayTv,
  getPopularShows,
  getTopRatedShows,
  IGetTvResult,
} from "../api";
import TvSlider from "../Components/TvSlider";
import { makeImagePath } from "../utils";

function Tv() {
  const { data: nowplayingDataTv, isLoading: isNowplayingLoadingaTv } =
    useQuery<IGetTvResult>(["tvs", "nowPlaying"], getAiringTodayTv);
  console.log(nowplayingDataTv);

  const { data: topRatedTv, isLoading: isTopRatedLoadingaTv } =
    useQuery<IGetTvResult>(["tvs", "topRated"], getTopRatedShows);

  const { data: popularTv, isLoading: isPopularLoadingTv } =
    useQuery<IGetTvResult>(["tvs", "popularTv"], getPopularShows);

  return (
    <Wrapper>
      {isNowplayingLoadingaTv || isTopRatedLoadingaTv || isPopularLoadingTv ? (
        <Loader>loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              nowplayingDataTv?.results[1].backdrop_path || ""
            )}
          >
            <Title>{nowplayingDataTv?.results[1].name}</Title>
            <Overview>{nowplayingDataTv?.results[1].overview}</Overview>
            <BannerButton>상세정보</BannerButton>
          </Banner>
          <Sliders>
            <TvSlider data={nowplayingDataTv?.results} title="현재상영작" />
            <TvSlider
              data={topRatedTv?.results}
              title="오늘 대한민국의 TOP 10 시리즈"
            />
            <TvSlider data={popularTv?.results} title="인기순위 영화" />
          </Sliders>
        </>
      )}
    </Wrapper>
  );
}

export default Tv;

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
