import styled from "styled-components";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import {
  getMovieSearchResults,
  getTvSearchResults,
  IGetMovieSearch,
  IGetTvSearch,
} from "../api";
import { makeImagePath } from "../utils";
import { motion } from "framer-motion";

function Search() {
  //1.keyword에 접근한다 -> keyword를 가지고 검색을 해야하니까
  //location을 이용하면 지금 있는 곳에 관한 정보를 얻을 수 있다
  const location = useLocation();
  console.log(location);

  //2.URLSearchParameter 이용해보자. 이제 서버에 어떤 키워드를 줘야할지는 알았다.
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);

  const { data: searchMovie, isLoading: isMovieLoading } =
    useQuery<IGetMovieSearch>(["searchMovie", keyword], () =>
      getMovieSearchResults(`${keyword}`)
    );
  console.log(searchMovie);

  const { data: searchTv, isLoading: isTvLoading } = useQuery<IGetTvSearch>(
    ["searchTv", keyword],
    () => getTvSearchResults(`${keyword}`)
  );

  return (
    <Wrapper>
      <>
        <Category>{keyword}에 대한 영화 검색 결과</Category>
        {isMovieLoading || !searchMovie ? (
          <Loader>Loading...</Loader>
        ) : searchMovie?.results.length === 0 ? (
          <Loader>검색 결과가 없습니다.</Loader>
        ) : (
          <SearchBox>
            {searchMovie?.results.map((movie) => (
              <Box
                bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                key={"movie" + movie.id}
              />
            ))}
          </SearchBox>
        )}
      </>

      <>
        <Category>{keyword}에 대한 Tv Shows 검색 결과</Category>
        {isTvLoading || !searchTv ? (
          <Loader>Loading...</Loader>
        ) : searchTv?.results.length === 0 ? (
          <Loader>검색 결과가 없습니다.</Loader>
        ) : (
          <SearchBox>
            {searchTv?.results.map((tv) => (
              <Box
                bgphoto={makeImagePath(tv.backdrop_path, "w500")}
                key={"movie" + tv.id}
              />
            ))}
          </SearchBox>
        )}
      </>
    </Wrapper>
  );
}

export default Search;

const Wrapper = styled.div`
  padding: 100px 60px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  margin-top: 10vh;
`;

const Category = styled.span`
  display: block;
  font-size: 1.5rem;
  margin-top: 50px;
`;

const SearchBox = styled.div`
  display: grid;
  /* width: 100%; */
  height: 100%;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-gap: 15px;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  /* overflow: hidden; */
  grid-template-columns: 1fr 2fr 100px 25%;
  background-color: white;
  object-fit: cover;
  width: 100%;
  height: 200px;

  /* color: red; */
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => props.bgphoto});
  cursor: pointer;
`;
