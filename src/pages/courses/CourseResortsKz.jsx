import React from "react";
import { Button, TextInput, Textarea } from "@mantine/core";
import { getData, pb } from "shared/api";
import { Image } from "shared/ui";
import ReactQuill from "react-quill";

export const CoursesResortsKz = () => {

  const [course, setCourse] = React.useState({});

  const [images, setImages] = React.useState({});
  const [changedImages, setChangedImages] = React.useState({});

  const [headings, setHeadings] = React.useState({});
  const [text, setText] = React.useState({});

  const [changedHeadings, setChangedHeadings] = React.useState({});
  const [changedText, setChangedText] = React.useState({});

  function handleCourseChange(val, type) {
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

  console.log(changedImages, 'changed images');

  async function saveCourses() {
    console.log(course);
    for (const index in changedImages) {
      if (!isNaN(index)) {
          const formData = new FormData();
          formData.append([`${index}`], changedImages?.[index]);
          await pb
            .collection("images")
            .update(course?.images?.id, formData)
            .then((res) => {
              console.log(res);
            });
      }
    }

    await pb.collection("text").update(course?.text?.id, {
      headings_kz: changedHeadings,
      text_kz: changedText,
    });
  }

  React.useEffect(() => {
    getData("course_resorts").then((res) => {
      setCourse(res);
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
              onChange={(e) => handleCourseChange(e, "heading")}
              name="main"
            />
            <Textarea
              label="Под заголовок"
              value={changedHeadings?.submain ?? ""}
              onChange={(e) => handleCourseChange(e, "heading")}
              name="submain"
              autosize
            />
          </div>
          <Image
            className="ml-10 w-2/4 rounded-primary"
            label={"Картинка"}
            onChange={handleImagesChange}
            record={course?.images}
            image={changedImages?.["1"]}
            onDelete={handleImageDelete}
            index={1}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 w-2/4">
          <div>
            <Textarea
              label="Под заголовок"
              value={changedHeadings?.start1 ?? ""}
              onChange={(e) => handleCourseChange(e, "heading")}
              name="start1"
              autosize
            />
            <Textarea
              label="Число"
              value={changedText?.date1 ?? ""}
              onChange={(e) => handleCourseChange(e, "text")}
              name="date1"
              autosize
            />
          </div>
          <div>
            <Textarea
              label="Под заголовок"
              value={changedHeadings?.start2 ?? ""}
              onChange={(e) => handleCourseChange(e, "heading")}
              name="start2"
              autosize
            />
            <Textarea
              label="Число"
              value={changedText?.date2 ?? ""}
              onChange={(e) => handleCourseChange(e, "text")}
              name="date2"
              autosize
            />
          </div>
          <div>
            <Textarea
              label="Под заголовок"
              value={changedHeadings?.start3 ?? ""}
              onChange={(e) => handleCourseChange(e, "heading")}
              name="start3"
              autosize
            />
            <Textarea
              label="Число"
              value={changedText?.date3 ?? ""}
              onChange={(e) => handleCourseChange(e, "text")}
              name="date3"
              autosize
            />
          </div>
          <div>
            <Textarea
              label="Ссылка на видео"
              value={changedText?.link ?? ""}
              onChange={(e) => handleCourseChange(e, "text")}
              name="link"
              autosize
            />
          </div>
          <div>
            <Textarea
              label="Ссылка на видео 2"
              value={changedText?.link2 ?? ""}
              onChange={(e) => handleCourseChange(e, "text")}
              name="link2"
              autosize
            />
          </div>
          <div>
            <Textarea
              label="Ссылка на видео 3"
              value={changedText?.link3 ?? ""}
              onChange={(e) => handleCourseChange(e, "text")}
              name="link3"
              autosize
            />
          </div>
          <div>
            <Textarea
              label="Ссылка на видео 4"
              value={changedText?.link4 ?? ""}
              onChange={(e) => handleCourseChange(e, "text")}
              name="link4"
              autosize
            />
          </div>
        </div>
      </section>
      <div className="grid grid-cols-3 gap-4 my-10">
        <div>
          <Textarea
            label="Заголовок"
            value={changedHeadings?.card_head1 ?? ""}
            onChange={(e) => handleCourseChange(e, "heading")}
            name="card_head1"
            autosize
          />
          <Textarea
            label="текст"
            value={changedText?.card_p1 ?? ""}
            onChange={(e) => handleCourseChange(e, "text")}
            name="card_p1"
            autosize
          />
        </div>
        <div>
          <Textarea
            label="Заголовок"
            value={changedHeadings?.card_head2 ?? ""}
            onChange={(e) => handleCourseChange(e, "heading")}
            name="card_head2"
            autosize
          />
          <Textarea
            label="текст"
            value={changedText?.card_p2 ?? ""}
            onChange={(e) => handleCourseChange(e, "text")}
            name="card_p2"
            autosize
          />
        </div>
        <div>
          <Textarea
            label="Заголовок"
            value={changedHeadings?.card_head3 ?? ""}
            onChange={(e) => handleCourseChange(e, "heading")}
            name="card_head3"
            autosize
          />
          <Textarea
            label="текст"
            value={changedText?.card_p3 ?? ""}
            onChange={(e) => handleCourseChange(e, "text")}
            name="card_p3"
            autosize
          />
        </div>
      </div>
      <Textarea
        label="Заголовок блока"
        value={changedHeadings?.grid_main ?? ""}
        onChange={(e) => handleCourseChange(e, "heading")}
        name="grid_main"
        autosize
      />
      <section className="mt-10 ">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <TextInput
              label="Заголовок"
              value={changedHeadings?.grid_head1 ?? ""}
              onChange={(e) => handleCourseChange(e, "heading")}
              name="grid_head1"
            />
            <Textarea
              label="Описание"
              value={changedText?.grid_p1 ?? ""}
              onChange={(e) => handleCourseChange(e, "text")}
              name="grid_p1"
              autosize
            />
          </div>
          <div>
            <TextInput
              label="Заголовок"
              value={changedHeadings?.grid_head2 ?? ""}
              onChange={(e) => handleCourseChange(e, "heading")}
              name="grid_head2"
            />
            <Textarea
              label="Описание"
              value={changedText?.grid_p2 ?? ""}
              onChange={(e) => handleCourseChange(e, "text")}
              name="grid_p2"
              autosize
            />
          </div>
          <div>
            <TextInput
              label="Заголовок"
              value={changedHeadings?.grid_head3 ?? ""}
              onChange={(e) => handleCourseChange(e, "heading")}
              name="grid_head3"
            />
            <Textarea
              label="Описание"
              value={changedText?.grid_p3 ?? ""}
              onChange={(e) => handleCourseChange(e, "text")}
              name="grid_p3"
              autosize
            />
          </div>
        </div>
        <div className="mt-10">
          <Textarea
            label="Заголовок"
            value={changedText?.grid_head4 ?? ""}
            onChange={(e) => handleCourseChange(e, "text")}
            name="grid_head4"
            autosize
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Textarea
              label="Описание"
              value={changedText?.grid_p4 ?? ""}
              onChange={(e) => handleCourseChange(e, "text")}
              name="grid_p4"
              autosize
            />
          </div>
          <div>
            <Textarea
              label="Описание"
              value={changedText?.grid_p5 ?? ""}
              onChange={(e) => handleCourseChange(e, "text")}
              name="grid_p5"
              autosize
            />
          </div>
          <div>
            <Textarea
              label="Описание"
              value={changedText?.grid_p6 ?? ""}
              onChange={(e) => handleCourseChange(e, "text")}
              name="grid_p6"
              autosize
            />
          </div>
        </div>
      </section>
      <section className="grid grid-cols-3 gap-4 mt-20">
        <Image
          className="rounded-primary"
          label={"Картинка"}
          onChange={handleImagesChange}
          record={course?.images}
          image={changedImages?.["2"]}
          onDelete={handleImageDelete}
          index={2}
        />
        <Image
          className="rounded-primary"
          label={"Картинка"}
          onChange={handleImagesChange}
          record={course?.images}
          image={changedImages?.["3"]}
          onDelete={handleImageDelete}
          index={3}
        />
        <Image
          className="rounded-primary"
          label={"Картинка"}
          onChange={handleImagesChange}
          record={course?.images}
          image={changedImages?.["4"]}
          onDelete={handleImageDelete}npm run 
          index={4}
        />
      </section>
      <div className="mt-20">
        <Textarea
          label="Заголовок"
          value={changedHeadings?.grid2_main ?? ""}
          onChange={(e) => handleCourseChange(e, "heading")}
          name="grid2_main"
          autosize
        /> 
      </div>
      <section className="mt-10 grid grid-cols-3 gap-x-10 gap-y-16">
        <div>
          <Textarea
            label="Описание"
            value={changedText?.grid2_p1 ?? ""}
            onChange={(e) => handleCourseChange(e, "text")}
            name="grid2_p1"
            autosize
          />
        </div>
        <div>
          <Textarea
            label="Описание"
            value={changedText?.grid2_p2 ?? ""}
            onChange={(e) => handleCourseChange(e, "text")}
            name="grid2_p2"
            autosize
          />
        </div>
        <div>
          <Textarea
            label="Описание"
            value={changedText?.grid2_p3 ?? ""}
            onChange={(e) => handleCourseChange(e, "text")}
            name="grid2_p3"
            autosize
          />
        </div>
      </section>
      <div className="grid grid-cols-3 gap-8">
        <Textarea
          label="Описание"
          value={changedText?.grid2_p4 ?? ""}
          onChange={(e) => handleCourseChange(e, "text")}
          name="grid2_p4"
          autosize
        />
        <Textarea
          label="Описание"
          value={changedText?.grid2_p5 ?? ""}
          onChange={(e) => handleCourseChange(e, "text")}
          name="grid2_p5"
          autosize
        />
        <Textarea
          label="Описание"
          value={changedText?.grid2_p6 ?? ""}
          onChange={(e) => handleCourseChange(e, "text")}
          name="grid2_p6"
          autosize
        />
      </div>
      <div className="flex justify-center mt-10">
        <Button onClick={saveCourses}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};