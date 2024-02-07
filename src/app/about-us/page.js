import { about_blogs, compant_mission, get_in_touch, join_the_team, meet_the_team } from "@/Assets";
import Blog_sec from "@/components/Aboutus/Blog_sec";
import ImageWithtext from "@/components/Aboutus/ImageWithtext";
import InnerBanner from "@/components/Aboutus/InnerBanner";
import Mission from "@/components/Aboutus/Mission";
import RichText from "@/components/Aboutus/RichText";
import TopImageWithText from "@/components/Aboutus/TopImageWithText";
import React from "react";

const Index = () => {
    const keypoints = [
       {
        img : meet_the_team,
        heading : "Meet the team",
        para : "From the executive leadership team to the board of directors, get to know the leadership team pioneering the way to put the world’s 1.5 billion cars to better use.",
        btn_text : "Meet the team",
        btn_link : "/",
       },
       {
        img : join_the_team,
        heading : "Join the team",
        para : "Recognized as A Great Place to Work®, Rent Eagles prides itself on creating a supportive, down-to-earth, pioneering, and efficient work environment.",
        para2 : "Review open positions and come join us!",
        btn_text : "Join the team",
        btn_link : "/",
       },
       {
        img : get_in_touch,
        heading : "Get in touch",
        para : "Reach out to the Rent Eagles newsdesk for press inquiries, the Rent Eagles press kit, influencer outreach, investor relations information, and any other corporate inquiries you may have.",
        btn_text : "Visit the newsdesk",
        btn_link : "/",
       },
    ]
  return (
    <>
      <InnerBanner />
      <RichText
        heading={"Find your drive"}
        paragraph={"Rent Eagles is the world’s largest car sharing marketplace where you can book any car you want, for whatever the occasion, from a vibrant community of trusted hosts across the US, UK, Canada, Australia, and France. Whether you're flying in from afar or looking for a car down the street, searching for a rugged truck or something smooth and swanky, guests can take the wheel of the perfect car for any occasion, while hosts can take the wheel of their futures by building an accessible, flexible, and scalable car sharing business from the ground up."}
      />
      <Mission
        img={compant_mission}
        title1={"Company mission"}
        title2={"To put the world’s 1.5 billion cars to better use"}
      />
      <ImageWithtext
        mainheading={"Want to dive deeper?"}
        keypoints = {keypoints}
      />
      <TopImageWithText/>
      <Blog_sec
        img = {about_blogs}
        heading={"Follow along on the journey"}
        para={"Cruise the Rent Eagles blog for drool-worthy cars, chronicles of adventures from the road, and the latest from the Rent Eagles newsdesk."}
     
      />
    </>
  );
};

export default Index;
