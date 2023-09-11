import React from "react";
import { Button, TextInput, Textarea } from "@mantine/core";
import { getData, pb } from "shared/api";
import { Image } from "shared/ui";

export const Program = () => {
  const [program, setProgram] = React.useState({});

  const [images, setImages] = React.useState({});
  const [changedImages, setChangedImages] = React.useState({});

  const [headings, setHeadings] = React.useState({});
  const [text, setText] = React.useState({});

  const [changedHeadings, setChangedHeadings] = React.useState({});
  const [changedText, setChangedText] = React.useState({});

  function handleProgramChange(val, type) {
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

  async function saveProgram() {
    console.log(program);
    for (const index in changedImages) {
      if (!isNaN(index)) {
        if (changedImages?.[index] instanceof File) {
          const formData = new FormData();
          formData.append([`${index}`], changedImages?.[index]);
          await pb
            .collection("images")
            .update(program?.images?.id, formData)
            .then((res) => {
              console.log(res);
            });
        }
      }
    }

    await pb.collection("text").update(program?.text?.id, {
      headings: changedHeadings,
      text: changedText,
    });
  }

  React.useEffect(() => {
    getData("program").then((res) => {
      setProgram(res);
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
              onChange={(e) => handleProgramChange(e, "heading")}
              name="main"
            />
            <Textarea
              label="Под заголовок"
              value={changedHeadings?.submain ?? ""}
              onChange={(e) => handleProgramChange(e, "heading")}
              name="submain"
              autosize
            />
          </div>
          <Image
            className="ml-10 w-2/4"
            label={"Картинка"}
            onChange={handleImagesChange}
            record={program?.images}
            image={changedImages?.["1"]}
            onDelete={handleImageDelete}
            index={1}
          />
        </div>
        <div className="my-10">
          <Image
            className="ml-10 w-2/4"
            label={"Картинка"}
            onChange={handleImagesChange}
            record={program?.images}
            image={changedImages?.["2"]}
            onDelete={handleImageDelete}
            index={2}
          />
          <div className="max-w-lg">
            <TextInput
              label="Заголовок"
              value={changedHeadings?.fck_heading ?? ""}
              onChange={(e) => handleProgramChange(e, "heading")}
              name="fck_heading"
              autosize
            />
            <Textarea
              label="текст"
              value={changedText?.fck1 ?? ""}
              onChange={(e) => handleProgramChange(e, "text")}
              name="fck1"
              autosize
            />
            <Textarea
              label="текст"
              value={changedText?.fck2 ?? ""}
              onChange={(e) => handleProgramChange(e, "text")}
              name="fck2"
              autosize
            />
          </div>

        </div>
        <div className="grid grid-cols-3 gap-4 w-2/4">
          <div>
            <Textarea
              label="текст"
              value={changedText?.card1 ?? ""}
              onChange={(e) => handleProgramChange(e, "text")}
              name="card1"
              autosize
            />
          </div>
          <div>
            <Textarea
              label="текст"
              value={changedText?.card2 ?? ""}
              onChange={(e) => handleProgramChange(e, "text")}
              name="card2"
              autosize
            />
          </div>
          <div>
            <Textarea
              label="текст"
              value={changedText?.card3 ?? ""}
              onChange={(e) => handleProgramChange(e, "text")}
              name="card3"
              autosize
            />
          </div>
        </div>
      </section>

      <section className="border-t-2 mt-10">
        <Textarea
          label="Заголовок"
          value={changedHeadings?.list_head ?? ""}
          onChange={(e) => handleProgramChange(e, "heading")}
          name="list_head"
          autosize
        />
        <div className="grid grid-cols-2 gap-4 my-10">
          <div>
            <Textarea
              label="Текст"
              value={changedText?.list1 ?? ""}
              onChange={(e) => handleProgramChange(e, "text")}
              name="list1"
              autosize
            />
          </div>
          <div>
            <Textarea
              label="Текст"
              value={changedText?.list2 ?? ""}
              onChange={(e) => handleProgramChange(e, "text")}
              name="list2"
              autosize
            />
          </div>
          <div>
            <Textarea
              label="Текст"
              value={changedText?.list3 ?? ""}
              onChange={(e) => handleProgramChange(e, "text")}
              name="list3"
              autosize
            />
          </div>
          <div>
            <Textarea
              label="Текст"
              value={changedText?.list4 ?? ""}
              onChange={(e) => handleProgramChange(e, "text")}
              name="list4"
              autosize
            />
          </div>
          <div>
            <Textarea
              label="Текст"
              value={changedText?.list5 ?? ""}
              onChange={(e) => handleProgramChange(e, "text")}
              name="list5"
              autosize
            />
          </div>
          <div>
            <Textarea
              label="Текст"
              value={changedText?.list6 ?? ""}
              onChange={(e) => handleProgramChange(e, "text")}
              name="list6"
              autosize
            />
          </div>
        </div>
      </section>
      <section className="border-t-2">
        <div className="flex gap-5">
          <Textarea
            label="Заголовок"
            value={changedHeadings?.text_head ?? ""}
            onChange={(e) => handleProgramChange(e, "heading")}
            name="text_head"
            autosize
            className="w-full"
          />
          <div className="w-full">
            <Textarea
              label="Под заголовок"
              value={changedHeadings?.text1 ?? ""}
              onChange={(e) => handleProgramChange(e, "heading")}
              name="text1"
              autosize
            />
            <Textarea
              label="Текст"
              value={changedText?.text2 ?? ""}
              onChange={(e) => handleProgramChange(e, "text")}
              name="text2"
              autosize
            />
            <div>
              <Textarea
                label="Под заголовок"
                value={changedText?.text3 ?? ""}
                onChange={(e) => handleProgramChange(e, "text")}
                name="text3"
                autosize
              />
              <Textarea
                label="Текст"
                value={changedText?.text4 ?? ""}
                onChange={(e) => handleProgramChange(e, "text")}
                name="text4"
                autosize
              />
            </div>
          </div>
        </div>
      </section>
      <section className="flex items-center gap-5 mt-10 border-t-2">
        <div className="w-full">
          <Textarea
            label="Заголовок"
            value={changedHeadings?.text2_head ?? ""}
            onChange={(e) => handleProgramChange(e, "heading")}
            name="text2_head"
            autosize
          />
          <Textarea
            label="Текст"
            value={changedText?.text5 ?? ""}
            onChange={(e) => handleProgramChange(e, "text")}
            name="text5"
            autosize
          />
          <Textarea
            label="Текст"
            value={changedText?.text6 ?? ""}
            onChange={(e) => handleProgramChange(e, "text")}
            name="text6"
            autosize
          />
        </div>
        <Textarea
          label="Текст"
          value={changedText?.text7 ?? ""}
          onChange={(e) => handleProgramChange(e, "text")}
          name="text7"
          autosize
          className="w-full"
        />
      </section>

      <div className="flex justify-center">
        <Button className="mt-10" onClick={saveProgram}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};
