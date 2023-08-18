import React from "react";
import { Carousel, useAnimationOffsetEffect } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { getData, pb } from "shared/api";
import { Button, Textarea } from "@mantine/core";

export const PartnersCard = ({
  setChangedImages,
  changedImages,
  setChangedHeadings,
  setPartners,
  changedHeadings,
  changedText,
  setChangedText,
  partner,
}) => {
  const [embla, setEmbla] = React.useState(null);

  const autoplay = React.useRef(Autoplay({ delay: 2000 }));

  useAnimationOffsetEffect(embla, 200);

  const [images, setImages] = React.useState({});

  const [headings, setHeadings] = React.useState({});
  const [text, setText] = React.useState({});

  function handlePartnersChange(val, type) {
    const { value, name } = val?.target;

    if (type === "heading") {
      setChangedHeadings({ ...changedHeadings, [name]: value });
      return;
    }

    setChangedText({ ...changedText, [name]: value });
    return;
  }

  function handleImagesChange(val, index) {
    setChangedImages({ ...changedImages, [`${index}`]: val });
  }

  function handleImageDelete(index) {
    setChangedImages({ ...changedImages, [index]: "" });
  }

  React.useEffect(() => {
    getData("partners").then((res) => {
      setPartners(res);
      setHeadings(res?.text?.headings);
      setText(res?.text?.text);
      setImages(res?.images);
    });
  }, []);

  React.useEffect(() => {
    setChangedHeadings(headings);
    setChangedText(text);
  }, [headings, text]);

  React.useEffect(() => {
    setChangedImages(images);
  }, [images]);

  console.log(partner);

  return (
    <div className="relative rounded-primary overflow-hidden space-y-2  w-full shadow-md pb-4">
      <Carousel
        slideSize={"100%"}
        loop
        withControls={false}
        w={"100%"}
        getEmblaApi={setEmbla}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        {Array(4)
          .fill(1)
          .map((img, i) => {
            return (
              <Carousel.Slide key={i} className={`relative `}>
                <div
                  className={
                    "flex justify-center items-center object-cover w-full h-72 text-3xl bg-slate-200"
                  }
                >
                  {i + 1}
                </div>
              </Carousel.Slide>
            );
          })}
      </Carousel>
      <h2 className="text-center font-head text-2xl px-6">{partner.name}</h2>
      <p className="px-4 text-center ">{partner.description}</p>
    </div>
  );
};
