import React from "react";
import { Button, TextInput, Textarea } from "@mantine/core";
import { getData, pb } from "shared/api";
import { Image } from "shared/ui";

export const Health = () => {
  const [health, setHealth] = React.useState({});

  const [images, setImages] = React.useState({});
  const [changedImages, setChangedImages] = React.useState({});

  const [headings, setHeadings] = React.useState({});
  const [text, setText] = React.useState({});

  const [changedHeadings, setChangedHeadings] = React.useState({});
  const [changedText, setChangedText] = React.useState({});

  function handleHealthChange(val, type) {
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

  async function saveHealth() {
    console.log(health);
    for (const index in changedImages) {
      if (!isNaN(index)) {
        if (changedImages?.[index] instanceof File) {
          const formData = new FormData();
          formData.append([`${index}`], changedImages?.[index]);
          await pb
            .collection("images")
            .update(health?.images?.id, formData)
            .then((res) => {
              console.log(res);
            });
        }
      }
    }

    await pb.collection("text").update(health?.text?.id, {
      headings: changedHeadings,
      text: changedText,
    });
  }

  React.useEffect(() => {
    getData("health").then((res) => {
      setHealth(res);
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
    <div className="w-full">
      <section>
        <TextInput
          label="Главный заголовок"
          value={changedHeadings?.heading ?? ""}
          onChange={(e) => handleHealthChange(e, "heading")}
          name="heading"
        />
        <div className="flex">
          <Image
            className="ml-10 w-2/4"
            label={"Картинка"}
            onChange={handleImagesChange}
            record={health?.images}
            image={changedImages?.["1"]}
            onDelete={handleImageDelete}
            index={1}
          />
          <div className="w-2/4 ml-auto">
            <TextInput
              label="Заголовок"
              value={changedHeadings?.main ?? ""}
              onChange={(e) => handleHealthChange(e, "heading")}
              name="main"
            />
            <Textarea
              label="Под заголовок"
              value={changedHeadings?.submain ?? ""}
              onChange={(e) => handleHealthChange(e, "heading")}
              name="submain"
              autosize
            />
            <Textarea
              label="текст"
              value={changedText?.text1 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text1"
              autosize
            />
            <Textarea
              label="текст"
              value={changedText?.text2 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text2"
              autosize
            />
            <Textarea
              label="текст"
              value={changedText?.text3 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text3"
              autosize
            />
            <Textarea
              label="текст"
              value={changedText?.text4 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text4"
              autosize
            />
            <Textarea
              label="текст"
              value={changedText?.text5 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text5"
              autosize
            />
            <Textarea
              label="текст"
              value={changedText?.text6 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text6"
              autosize
            />
          </div>
        </div>
      </section>
      <section className="mt-10 border-t-2">
        <div className="flex">
          <Image
            className="ml-10 w-2/4"
            label={"Картинка"}
            onChange={handleImagesChange}
            record={health?.images}
            image={changedImages?.["2"]}
            onDelete={handleImageDelete}
            index={2}
          />
          <div className="w-2/4 ml-auto">
            <TextInput
              label="Заголовок"
              value={changedHeadings?.card_head ?? ""}
              onChange={(e) => handleHealthChange(e, "heading")}
              name="card_head"
            />
            <Textarea
              label="текст"
              value={changedText?.list1 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="list1"
              autosize
            />
            <Textarea
              label="текст"
              value={changedText?.list2 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="list2"
              autosize
            />
            <Textarea
              label="текст"
              value={changedText?.list3 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="list3"
              autosize
            />
            <Textarea
              label="текст"
              value={changedText?.list4 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="list4"
              autosize
            />
            <Textarea
              label="текст"
              value={changedText?.list5 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="list5"
              autosize
            />
          </div>
        </div>
      </section>
      <section className="mt-10 border-t-2">
        <div className="flex mt-5 items-center p-5 border-gray-500 border border-solid max-w-2xl m-auto rounded-primary">
          <Image
            className="ml-10 max-w-xs"
            label={"Картинка"}
            onChange={handleImagesChange}
            record={health?.images}
            image={changedImages?.["3"]}
            onDelete={handleImageDelete}
            index={3}
          />
          <Textarea
            label="текст"
            value={changedText?.flow1 ?? ""}
            onChange={(e) => handleHealthChange(e, "text")}
            name="flow1"
            autosize
            className="ml-auto w-full"
          />
        </div>
        <div className="flex mt-5 items-center p-5 border-gray-500 border border-solid max-w-2xl m-auto rounded-primary">
          <Textarea
            label="текст"
            value={changedText?.flow2 ?? ""}
            onChange={(e) => handleHealthChange(e, "text")}
            name="flow2"
            autosize
            className="ml-auto w-full"
          />
          <Image
            className="ml-10 max-w-xs"
            label={"Картинка"}
            onChange={handleImagesChange}
            record={health?.images}
            image={changedImages?.["4"]}
            onDelete={handleImageDelete}
            index={4}
          />
        </div>
        <div className="flex mt-5 items-center p-5 border-gray-500 border border-solid max-w-2xl m-auto rounded-primary">
          <Image
            className="ml-10 max-w-xs"
            label={"Картинка"}
            onChange={handleImagesChange}
            record={health?.images}
            image={changedImages?.["5"]}
            onDelete={handleImageDelete}
            index={5}
          />
          <Textarea
            label="текст"
            value={changedText?.flow3 ?? ""}
            onChange={(e) => handleHealthChange(e, "text")}
            name="flow3"
            autosize
            className="ml-auto w-full"
          />
        </div>
        <div className="flex mt-5 items-center p-5 border-gray-500 border border-solid max-w-2xl m-auto rounded-primary">
          <Textarea
            label="текст"
            value={changedText?.flow4 ?? ""}
            onChange={(e) => handleHealthChange(e, "text")}
            name="flow4"
            autosize
            className="ml-auto w-full"
          />
          <Image
            className="ml-10 max-w-xs"
            label={"Картинка"}
            onChange={handleImagesChange}
            record={health?.images}
            image={changedImages?.["6"]}
            onDelete={handleImageDelete}
            index={6}
          />
        </div>
      </section>
      <Button className="mt-10" size="lg" fullWidth onClick={saveHealth}>
        Сохранить
      </Button>
    </div>
  );
};
