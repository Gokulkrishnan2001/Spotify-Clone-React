import React from "react";
import Navbar from "./Navbar";
import { albumsData } from "../assets/assets";
import { songsData } from "../assets/assets";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
const DisplayHome = () => {
  return (
    <>
      <Navbar />
      <div className="mb-4 ">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albumsData.map((items, index) => (
            <AlbumItem
              key={index}
              name={items.name}
              desc={items.desc}
              id={items.id}
              image={items.image}
            />
          ))}
        </div>
      </div>
      <div className=" mb-4 ">
        <h1 className="my-5 font-bold text-2xl">Today's Hits</h1>
        <div className="flex overflow-auto TOP_HITS">
          {songsData.map((item, index) => (
            <SongItem
              key={index}
              name={item.name}
              desc={item.desc}
              image={item.image}
              id={item.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
