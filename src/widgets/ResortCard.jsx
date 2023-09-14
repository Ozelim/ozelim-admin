import React from "react";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

import { LiaCalendarAlt, LiaConciergeBellSolid } from "react-icons/lia";
import { CiPlane } from "react-icons/ci";
import { formatNumber, getImageUrl } from "shared/lib";

export const Card = ({ resort, deleteBtn, editBtn, handleDelete }) => {
  const [image, setImage] = React.useState(null);

  React.useEffect(() => {
    if (resort?.[1] instanceof File) {
      setImage(URL.createObjectURL(resort?.[1]));
    } else {
      setImage(getImageUrl(resort, resort?.[1]));
    }
  }, [resort]);

  return (
    <div className="flex flex-col shadow-md h-full rounded-primary overflow-hidden max-w-[300px]">
      {image ? (
        <img src={image} alt="" className="object-cover h-48 aspect-video" />
      ) : (
        <div className="bg-slate-100 object-cover h-48 aspect-video"></div>
      )}
      <div className="p-4">
        <Link to={`/resort/${resort?.id}`}>
          <span className="text-lg font-head text-primary-600">
            {resort?.title}
          </span>
        </Link>
        <p className="mt-1">{resort?.region}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          <p className="text text-">Направление: </p>
          {resort?.diseas && resort?.diseas?.map((q, i) => {
            return (
              <p key={i} className="text-blue-900">
                {q}
              </p>
            ) 
          })}
        </div>
        {/* <ul className="mt-4">
          <li className="flex items-center gap-2">
            <span className="text">
              {resort?.duration}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text">{resort?.diet}</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text">{resort?.from}</span>
          </li>
        </ul> */}
        {/* <div className="mt-4">
          <span className="text-xl text-primary-600">
            {formatNumber(resort?.cost)} ₸
          </span>
        </div> */}
        <div className="mt-4 flex flex-col gap-2">
          {/* <Button>Подробнее</Button> */}
          {deleteBtn}
          {editBtn}
        </div>
      </div>
    </div>
  );
};
