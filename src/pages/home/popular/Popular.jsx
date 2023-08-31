import React from "react";

import ContentWrapper from "../../../component/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../component/switchTabs/SwitchTabs";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch"
import Carousel from "../../../component/carousel/Carousel";
 const Popular=()=>{

    const [endpoint,setEndPoint]=useState("movie")
    const {data,loading}=useFetch(`/${endpoint}/popular`)
    const onTabChange=(tab)=>{
        setEndPoint(tab === "Movies"?"movie":"tv");
    }
    return(
        <div className="carouselSection ">
            <ContentWrapper>
            <span className="carouselTitle">What's Popular</span>
            <SwitchTabs data={["Movies","Tv shows"]} onTabChange={onTabChange}/>
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
        </div>
    )
 }
 export default Popular;