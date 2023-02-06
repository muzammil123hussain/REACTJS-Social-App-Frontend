import React from "react";
import PlaceList from "../components/PlaceList";


const UserPlaces = () => {
  const PLACES = [
    {
      id: "p1",
      image:
      "https://en.wikishia.net/images/thumb/b/b0/The_aerial_view_of_the_holy_shrine_of_Imam_Ali.jpg/800px-The_aerial_view_of_the_holy_shrine_of_Imam_Ali.jpg",
      title: "NAJAF",
      description: "Best place on earth",
      address: "Najaf,Iraq",
      location: {
        lat: 32.0217066,
        lang: 44.3294907,
      },
      creator: "u1",
    },
    {
      id: "p2",
      image:
        "https://en.wikishia.net/images/thumb/b/b0/The_aerial_view_of_the_holy_shrine_of_Imam_Ali.jpg/800px-The_aerial_view_of_the_holy_shrine_of_Imam_Ali.jpg",
      title: "NAJAF",
      description: "Best place on earth",
      address: "Najaf,Iraq",
      location: {
        lat: 32.0217066,
        lang: 44.3294907,
      },
      creator: "u2",
    },
  ];

  return <PlaceList items={PLACES} />;
};

export default UserPlaces;
