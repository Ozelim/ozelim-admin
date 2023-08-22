import React from "react";
import { getImageUrl } from "shared/lib";

export const TeamCard = ({ team }) => {
  return (
    <div className="relative rounded-primary overflow-hidden space-y-2 shadow-md pb-4">
      <img
        src={getImageUrl(team, team?.image)}
        alt=""
        className="w-full max-h-60 object-cover aspect-video"
      />
      <h2 className="text-center pt-2 font-head text-2xl px-6 ">{team?.name}</h2>
      <p className="px-4 text-center text">{team?.description}</p>
    </div>
  );
};
