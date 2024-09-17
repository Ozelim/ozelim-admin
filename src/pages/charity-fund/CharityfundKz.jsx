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

    await pb.collection("text").update(charity?.text?.id, {
      headings: changedHeadings,
      text: changedText,
    });
  }

  React.useEffect(() => {
    getData("insurance").then((res) => {
      setCharity(res);
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
            label="Пункт 1"
            value={changedText?.card3 ?? ""}
            onChange={(e) => handleCharityChange(e, "text")}
            name="card3"
            autosize
          />
          <Textarea
            label="Пункт 2"
            value={changedText?.card31 ?? ""}
            onChange={(e) => handleCharityChange(e, "text")}
            name="card31"
            autosize
          />
          <Textarea
            label="Пункт 3"
            value={changedText?.card32 ?? ""}
            onChange={(e) => handleCharityChange(e, "text")}
            name="card32"
            autosize
          />
          <Textarea
            label="Пункт 4"
            value={changedText?.card33 ?? ""}
            onChange={(e) => handleCharityChange(e, "text")}
            name="card33"
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
          <Textarea
            label="Пункт 1"
            value={changedText?.card41 ?? ""}
            onChange={(e) => handleCharityChange(e, "text")}
            name="card41"
            autosize
          />
          <Textarea
            label="Пункт 2"
            value={changedText?.card42 ?? ""}
            onChange={(e) => handleCharityChange(e, "text")}
            name="card42"
            autosize
          />
          <Textarea
            label="Пункт 3"
            value={changedText?.card43 ?? ""}
            onChange={(e) => handleCharityChange(e, "text")}
            name="card43"
            autosize
          />
          <Textarea
            label="Пункт 4"
            value={changedText?.card44 ?? ""}
            onChange={(e) => handleCharityChange(e, "text")}
            name="card44"
            autosize
          />
          <Textarea
            label="Пункт 5"
            value={changedText?.card45 ?? ""}
            onChange={(e) => handleCharityChange(e, "text")}
            name="card45"
            autosize
          />
          <Textarea
            label="Описание"
            value={changedText?.card46 ?? ""}
            onChange={(e) => handleCharityChange(e, "text")}
            name="card46"
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
      <div className="max-w-xl">
        <TextInput
          label="Заголовок"
          value={changedHeadings?.q ?? ""}
          onChange={(e) => handleCharityChange(e, "heading")}
          name="q"
        />
        <TextInput
          label="Подзаголовок"
          value={changedHeadings?.w ?? ""}
          onChange={(e) => handleCharityChange(e, "heading")}
          name="w"
        />
        <Textarea
          label="Описание"
          value={changedText?.e ?? ""}
          onChange={(e) => handleCharityChange(e, "text")}
          name="e"
          autosize
        />
        <TextInput
          label="Подзаголовок"
          value={changedHeadings?.r ?? ""}
          onChange={(e) => handleCharityChange(e, "heading")}
          name="r"
        />
        <Textarea
          label="Описание"
          value={changedText?.t ?? ""}
          onChange={(e) => handleCharityChange(e, "text")}
          name="t"
          autosize
        />
        <Image
          label={"Картинка"}
          onChange={handleImagesChange}
          record={charity?.images}
          image={changedImages?.["6"]}
          onDelete={handleImageDelete}
          index={6}
        />
        <TextInput
          label="Подзаголовок"
          value={changedHeadings?.y ?? ""}
          onChange={(e) => handleCharityChange(e, "heading")}
          name="y"
        />
        <Textarea
          label="Описание"
          value={changedText?.u ?? ""}
          onChange={(e) => handleCharityChange(e, "text")}
          name="u"
          autosize
        />
        <TextInput
          label="Подзаголовок"
          value={changedHeadings?.i ?? ""}
          onChange={(e) => handleCharityChange(e, "heading")}
          name="i"
        />
        <TextInput
          label="Заголовок"
          value={changedHeadings?.o ?? ""}
          onChange={(e) => handleCharityChange(e, "heading")}
          name="o"
        />
        <Image
          label={"Картинка"}
          onChange={handleImagesChange}
          record={charity?.images}
          image={changedImages?.["7"]}
          onDelete={handleImageDelete}
          index={7}
        />
        <TextInput
          label="Подзаголовок"
          value={changedHeadings?.p ?? ""}
          onChange={(e) => handleCharityChange(e, "heading")}
          name="p"
        />

        <Textarea
          label="Описание"
          value={changedText?.a ?? ""}
          onChange={(e) => handleCharityChange(e, "text")}
          name="a"
          autosize
        />
        <Textarea
          label="Описание"
          value={changedText?.s ?? ""}
          onChange={(e) => handleCharityChange(e, "text")}
          name="s"
          autosize
        />
        <Textarea
          label="Описание"
          value={changedText?.d ?? ""}
          onChange={(e) => handleCharityChange(e, "text")}
          name="d"
          autosize
        />
        <Textarea
          label="Описание"
          value={changedText?.f ?? ""}
          onChange={(e) => handleCharityChange(e, "text")}
          name="f"
          autosize
        />
      </div>
      <div className="max-w-xl">
        <TextInput
          label="Заголовок"
          value={changedHeadings?.zz ?? ""}
          onChange={(e) => handleCharityChange(e, "heading")}
          name="zz"
        />
        <Textarea
          label="Описание"
          value={changedText?.zz ?? ""}
          onChange={(e) => handleCharityChange(e, "text")}
          name="zz"
          autosize
        />
        <Image
          label={"Картинка"}
          onChange={handleImagesChange}
          record={charity?.images}
          image={changedImages?.["8"]}
          onDelete={handleImageDelete}
          index={8}
        />
      </div>
      <div  className="flex justify-center mt-10">
        <Button className="mt-10"  onClick={saveCharity}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};