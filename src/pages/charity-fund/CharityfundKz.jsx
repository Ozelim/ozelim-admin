import React from "react";
import { Button, TextInput, Textarea } from "@mantine/core";
import { getData, pb } from "shared/api";
import { Image } from "shared/ui";

export const CharityFundKz = () => {
  const [charity, setCharity] = React.useState({});

  const [images, setImages] = React.useState({});
  const [changedImages, setChangedImages] = React.useState({});

  const [headings, setHeadings] = React.useState({});
  const [text, setText] = React.useState({});

  const [changedHeadings, setChangedHeadings] = React.useState({});
  const [changedText, setChangedText] = React.useState({});

  function handleCharityChange(val, type) {
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

  async function saveCharity() {
    console.log(charity);
    for (const index in changedImages) {
      if (!isNaN(index)) {
        if (changedImages?.[index] instanceof File) {
          const formData = new FormData();
          formData.append([`${index}`], changedImages?.[index]);
          await pb
            .collection("images")
            .update(charity?.images?.id, formData)
            .then((res) => {
              console.log(res);
            });
        }
      }
    }

    await pb.collection("text").update(charity?.text?.id, {
      headings_kz: changedHeadings,
      text_kz: changedText,
    });
  }

  React.useEffect(() => {
    getData("charity").then((res) => {
      setCharity(res);
      setHeadings(res?.text?.headings_kz);
      setText(res?.text?.text_kz);
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
    <div className="w-full">
      <section>
        <div className="flex">
          <div className="w-2/4">
            <TextInput
              label="Главный заголовок"
              value={changedHeadings?.main ?? ""}
              onChange={(e) => handleCharityChange(e, "heading")}
              name="main"
            />
            <Textarea
              label="Под заголовок"
              value={changedHeadings?.submain ?? ""}
              onChange={(e) => handleCharityChange(e, "heading")}
              name="submain"
              autosize
            />
          </div>
          <Image
            className="ml-10 w-2/4"
            label={"Картинка"}
            onChange={handleImagesChange}
            record={charity?.images}
            image={changedImages?.["1"]}
            onDelete={handleImageDelete}
            index={1}
          />
        </div>

      </section>
      <TextInput
        label="Заголовок"
        value={changedHeadings?.grid ?? ""}
        onChange={(e) => handleCharityChange(e, "heading")}
        name="grid"
      />
      <section className="mt-10 grid grid-cols-2 gap-x-10 gap-y-16">
        <div>
          <TextInput
            label="Заголовок"
            value={changedHeadings?.card1 ?? ""}
            onChange={(e) => handleCharityChange(e, "heading")}
            name="card1"
          />
          <Textarea
            label="Описание"
            value={changedText?.card1 ?? ""}
            onChange={(e) => handleCharityChange(e, "text")}
            name="card1"
            autosize
          />
        </div>
        <div>
          <TextInput
            label="Заголовок"
            value={changedHeadings?.card2 ?? ""}
            onChange={(e) => handleCharityChange(e, "heading")}
            name="card2"
          />
          <Textarea
            label="Описание"
            value={changedText?.card2 ?? ""}
            onChange={(e) => handleCharityChange(e, "text")}
            name="card2"
            autosize
          />
        </div>
        <div>
          <TextInput
            label="Заголовок"
            value={changedHeadings?.card3 ?? ""}
            onChange={(e) => handleCharityChange(e, "heading")}
            name="card3"
          />
          <Textarea
            label="Описание"
            value={changedText?.card3 ?? ""}
            onChange={(e) => handleCharityChange(e, "text")}
            name="card3"
            autosize
          />
        </div>
        <div>
          <TextInput
            label="Заголовок"
            value={changedHeadings?.card4 ?? ""}
            onChange={(e) => handleCharityChange(e, "heading")}
            name="card4"
          />
          <Textarea
            label="Описание"
            value={changedText?.card4 ?? ""}
            onChange={(e) => handleCharityChange(e, "text")}
            name="card4"
            autosize
          />
        </div>
      </section>
      <section className="flex mt-10">
        <Image
          label={"Картинка"}
          onChange={handleImagesChange}
          record={charity?.images}
          image={changedImages?.["5"]}
          onDelete={handleImageDelete}
          index={5}
        />
        <div className="w-2/3">
          <Textarea
            label="Заголовок"
            value={changedHeadings?.help ?? ""}
            onChange={(e) => handleCharityChange(e, "heading")}
            name="help"
            autosize
          />
          <Textarea
            label="Описание"
            value={changedText?.help ?? ""}
            onChange={(e) => handleCharityChange(e, "text")}
            name="help"
            autosize
          />
        </div>
      </section>
      <Textarea
        label="Заголовок"
        value={changedHeadings?.history ?? ""}
        onChange={(e) => handleCharityChange(e, "heading")}
        name="history"
        autosize
        className="m-auto w-2/4"
      />
      <div className="grid grid-cols-3 gap-4 my-10">
        <div>
          <Image
            label={"Картинка"}
            onChange={handleImagesChange}
            record={charity?.slider?.image}
            image={changedImages?.["2"]}
            onDelete={handleImageDelete}
            index={2}
          />
          <TextInput
            label="Описание"
            value={changedText?.h1 ?? ""}
            onChange={(e) => handleCharityChange(e, "text")}
            name="h1"
            autosize
          />
        </div>
        <div>
          <Image
            label={"Картинка"}
            onChange={handleImagesChange}
            record={charity?.slider?.image}
            image={changedImages?.["3"]}
            onDelete={handleImageDelete}
            index={3}
          />
          <TextInput
            label="Описание"
            value={changedText?.h2 ?? ""}
            onChange={(e) => handleCharityChange(e, "text")}
            name="h2"
            autosize
          />
        </div>
        <div>
          <Image
            label={"Картинка"}
            onChange={handleImagesChange}
            record={charity?.slider?.image}
            image={changedImages?.["4"]}
            onDelete={handleImageDelete}
            index={4}
          />
          <TextInput
            label="Описание"
            value={changedText?.h3 ?? ""}
            onChange={(e) => handleCharityChange(e, "text")}
            name="h3"
            autosize
          />
        </div>
      </div>
      <div  className="flex justify-center mt-10">
        <Button className="mt-10"  onClick={saveCharity}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};
