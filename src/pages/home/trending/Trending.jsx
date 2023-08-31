import React from "react";

import ContentWrapper from "../../../component/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../component/switchTabs/SwitchTabs";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch"
import Carousel from "../../../component/carousel/Carousel";
 const Trending=()=>{

    const [endpoint,setEndPoint]=useState("day")
    const {data,loading}=useFetch(`/trending/all/${endpoint}`)
    const onTabChange=(tab)=>{
        setEndPoint(tab === "Day"?"day":"week");
    }
    return(
        <div className="carouselSection ">
            <ContentWrapper>
            <span className="carouselTitle">Trending</span>
            <SwitchTabs data={["Day","Week"]} onTabChange={onTabChange}/>
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading}/>
        </div>
    )
 }
 export default Trending;