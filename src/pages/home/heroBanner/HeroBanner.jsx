import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import "./style.scss"
import Img from "../../../component/lazyLoadImage/Img";
import ContentWrapper from "../../../component/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
const HeroBanner=()=>{
    const[background,setBackground]=useState("");
    const[query,setQuery]=useState("");
    const navigate=useNavigate();
    const {url}=useSelector((state)=>state.home)

    const {data,loading}=useFetch("/movie/upcoming");
    useEffect(()=>{
        const bg =url.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
        setBackground(bg);
    },[data]);
    const searchQueryHandler=(event)=>{
        if(event.key ==="Enter" && query.length>0){
                navigate(`/search/${query}`)
        }
    }
    
    const searchButtonHandler = () => {
        if (query.length > 0) {
            navigate(`/search/${query}`);
        }
    };
    return(
        <div className="heroBanner">
            {!loading && <div className="backdrop-image">
                <Img src={background}/>
            </div>}

            <div className="opacity-layer"></div>
        <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">nabbu biryani</span>
                    <span className="subTitle">Millions of movies, TV shows and people to discover. Explore now.</span>
                    <div className="searchInput">
                        
                        <input type="text" placeholder="Search for movie and tv shows..." onKeyUp={searchQueryHandler} onChange={(e)=>setQuery(e.target.value)} />
                        <button onClick={searchButtonHandler}  >search</button>
                        
                    </div>
                </div>
        </ContentWrapper>
        </div>
    )

}
export default HeroBanner;