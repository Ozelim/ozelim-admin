import { Button, Textarea } from "@mantine/core";
import React from "react";
import { getData, pb } from "shared/api";
import { Image } from "shared/ui";
import { AiFillCalendar } from "react-icons/ai";

export const News = () => {
  const [images, setImages] = React.useState({});
  const [headings, setHeadings] = React.useState({});
  const [text, setText] = React.useState({});

  const [changedImages, setChangedImages] = React.useState({});
  const [changedHeadings, setChangedHeadings] = React.useState({});
  const [changedText, setChangedText] = React.useState({});

  function handleNewsChange(val, type) {
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
  const [news, setNews] = React.useState({});
  async function saveNews() {
    console.log(news);
    for (const index in changedImages) {
      if (!isNaN(index)) {
        if (changedImages?.[index] instanceof File) {
          const formData = new FormData();
          formData.append([`${index}`], changedImages?.[index]);
          await pb
            .collection("images")
            .update(news?.images?.id, formData)
            .then((res) => {
              console.log(res);
            });
        }
      }
    }

    await pb.collection("text").update(news?.text?.id, {
      headings: changedHeadings,
      text: changedText,
    });
  }

  React.useEffect(() => {
    getData("news").then((res) => {
      setNews(res);
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

  return (
    <div className="bg-white shadow rounded-primary max-w-5xl w-full mx-auto">
      <div className="px-10 py-5 flex flex-col">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
              className="ml-10 w-14"
              label={"Аватар"}
              onChange={handleImagesChange}
              record={news?.images}
              image={changedImages?.["1"]}
              onDelete={handleImageDelete}
              index={1}
            />
            <Textarea
              label="Никнейм"
              value={changedHeadings?.name ?? ""}
              onChange={(e) => handleNewsChange(e, "heading")}
              name="name"
              autosize
            />
          </div>
          <div className="flex items-center">
            <AiFillCalendar fill="teal" className="mt-5 mr-2" size={20} />
            <Textarea
              label="дата "
              value={changedText?.date ?? ""}
              onChange={(e) => handleNewsChange(e, "text")}
              name="date"
              autosize
            />
          </div>
        </div>

        <div className="flex justify-between">
          <Textarea
            label="Заголовок"
            value={changedHeadings?.heading ?? ""}
            onChange={(e) => handleNewsChange(e, "heading")}
            name="heading"
            autosize
          />
        </div>
        <Image
          className="ml-10 w-2/4"
          label={"Картинка"}
          onChange={handleImagesChange}
          record={news?.images}
          image={changedImages?.["2"]}
          onDelete={handleImageDelete}
          index={2}
        />
        <Textarea
          label="текст"
          value={changedText?.news ?? ""}
          onChange={(e) => handleNewsChange(e, "text")}
          name="news"
          autosize
        />

        <p className="text-zinc-400 text-sm uppercase">ozelim.kz</p>
      </div>
      <Button className="mt-10" size="lg" fullWidth onClick={saveNews}>
        Сохранить
      </Button>
    </div>
  );
};
