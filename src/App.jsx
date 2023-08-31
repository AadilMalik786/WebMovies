import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { fetchDataFromApi } from "./utils/api"
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration,getGeneres } from './store/homeSlice'


import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import Home from "./pages/home/Home"
import Details from "./pages/details/Details";
import PageNotFound from "./pages/404/PageNotFound";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";


function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) =>
    state.home
  );
  // console.log(url);
  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res);
      const url={
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    })

  }
  const genresCall=async ()=>{
    let promises=[];
    let endpoints=["tv","movie"]
    let allGenres={}; 

    endpoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data =await Promise.all(promises)
    console.log(data);
    data.map(({genres})=>{
      return genres.map((item)=>(allGenres[item.id ]=item))
    })
    dispatch(getGeneres(allGenres))
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Details />} />
        <Route path='/search/:query' element={<SearchResult />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
