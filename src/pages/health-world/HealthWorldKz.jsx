import React from 'react'
import { Accordion, Button, TextInput, Textarea } from '@mantine/core';
import { getData, pb } from 'shared/api';
import { Editor, Image } from 'shared/ui';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { openConfirmModal } from '@mantine/modals';

async function getResorts () {
  return await pb.collection('health_data').getFullList()
}

export const HealthWorldKz = () => {

  const [resort, setResort] = React.useState('')
  const [editor, setEditor] = React.useState('')

  const [resorts, setResorts] = React.useState({})

  React.useEffect(() => {
    getResorts()
    .then(res => {
      setResorts(res?.[0])
    })
  }, [])

  const [fund, setFund] = React.useState({});

  const [images, setImages] = React.useState({});
  const [headings, setHeadings] = React.useState({});
  const [text, setText] = React.useState({});
  
  
  const [changedImages, setChangedImages] = React.useState({});
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

  async function saveFund() {
    for (const index in changedImages) {
      if (!isNaN(index)) {
          const formData = new FormData();
          formData.append([`${index}`], changedImages?.[index]);
          await pb
            .collection("images")
            .update(fund?.images?.id, formData)
            .then((res) => {
              console.log(res);
            });
      }
    }

    await pb.collection("text").update(fund?.text?.id, {
      headings_kz: changedHeadings,
      text_kz: changedText,
    });
  }

  React.useEffect(() => {
    getData("health-world").then((res) => {
      setFund(res);
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

  const resetStyles = {
    all: "unset !important",
    boxSizing: "border-box",
    display: "block",
    margin: 0,
    padding: 0,
    listStyle: 'disc'
  };


  return (
    <div className='w-full space-y-10'>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <Image
            className="ml-10 w-2/4"
            label={"Картинка"}
            onChange={handleImagesChange}
            record={fund?.images}
            image={changedImages?.["1"]}
            onDelete={handleImageDelete}
            index={1}
          />
          <TextInput
            label="Заголовок"
            value={changedHeadings?.heading3 ?? ""}
            onChange={(e) => handleHealthChange(e, "heading")}
            name="heading3"
          />
          <Textarea
            label="Описание"
            value={changedText?.text1 ?? ""}
            onChange={(e) => handleHealthChange(e, "text")}
            name="text1"
            autosize
          />
          <TextInput
            label="Ссылка"
            value={changedHeadings?.link ?? ""}
            onChange={(e) => handleHealthChange(e, "heading")}
            name="link"
          />
        </div>
        <div>
          <TextInput
            label="Заголовок"
            value={changedHeadings?.heading ?? ""}
            onChange={(e) => handleHealthChange(e, "heading")}
            name="heading"
          />
          <Textarea
            label="Описание"
            value={changedText?.text2 ?? ""}
            onChange={(e) => handleHealthChange(e, "text")}
            name="text2"
            autosize
          />
          <Textarea
            label="Описание"
            value={changedText?.text3 ?? ""}
            onChange={(e) => handleHealthChange(e, "text")}
            name="text3"
            autosize
          />
          <Textarea
            label="Описание"
            value={changedText?.text4 ?? ""}
            onChange={(e) => handleHealthChange(e, "text")}
            name="text4"
            autosize
          />
          <Textarea
            label="Описание"
            value={changedText?.text5 ?? ""}
            onChange={(e) => handleHealthChange(e, "text")}
            name="text5"
            autosize
          />
        </div>
      </div>
        
      <div className='max-w-xl'>
        <TextInput
          label="Заголовок"
          value={changedHeadings?.heading4 ?? ""}
          onChange={(e) => handleHealthChange(e, "heading")}
          name="heading4"
        />
        <TextInput
          label="Подзаголовок"
          value={changedHeadings?.heading5 ?? ""}
          onChange={(e) => handleHealthChange(e, "heading")}
          name="heading5"
        />
        <div className='max-w-xl'>
          <Textarea
            label="Описание"
            value={changedText?.text6 ?? ""}
            onChange={(e) => handleHealthChange(e, "text")}
            name="text6"
            autosize
          />
          <Textarea
            label="Описание"
            value={changedText?.text7 ?? ""}
            onChange={(e) => handleHealthChange(e, "text")}
            name="text7"
            autosize
          />
          <Textarea
            label="Описание"
            value={changedText?.text8 ?? ""}
            onChange={(e) => handleHealthChange(e, "text")}
            name="text8"
            autosize
          />
          <Textarea
            label="Описание"
            value={changedText?.text9 ?? ""}
            onChange={(e) => handleHealthChange(e, "text")}
            name="text9"
            autosize
          />
        </div>

      </div>

        <div className='grid grid-cols-2 gap-4'>
          <Image
            className="ml-10 w-2/4"
            label={"Картинка"}
            onChange={handleImagesChange}
            record={fund?.images}
            image={changedImages?.["2"]}
            onDelete={handleImageDelete}
            index={2}
          />
          <div>
            <TextInput
              label="Заголовок"
              value={changedHeadings?.heading6 ?? ""}
              onChange={(e) => handleHealthChange(e, "heading")}
              name="heading6"
            />
            <Textarea
              label="Описание"
              value={changedText?.text10 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text10"
              autosize
            />
            <Textarea
              label="Описание"
              value={changedText?.text11 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text11"
              autosize
            />
            <Textarea
              label="Описание"
              value={changedText?.text12 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text12"
              autosize
            />
            <Textarea
              label="Описание"
              value={changedText?.text13 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text13"
              autosize
            />
            <Textarea
              label="Описание"
              value={changedText?.text14 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text14"
              autosize
            />
          </div>
        </div>
        <div>
          <div className='grid grid-cols-2 gap-4'>
            <Image
              className="ml-10 w-2/4"
              label={"Картинка"}
              onChange={handleImagesChange}
              record={fund?.images}
              image={changedImages?.["3"]}
              onDelete={handleImageDelete}
              index={3}
            />
            <Textarea
              label="Описание"
              value={changedText?.text15 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text15"
              autosize
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <Textarea
              label="Описание"
              value={changedText?.text16 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text16"
              autosize
            />
            <Image
              className="ml-10 w-2/4"
              label={"Картинка"}
              onChange={handleImagesChange}
              record={fund?.images}
              image={changedImages?.["4"]}
              onDelete={handleImageDelete}
              index={4}
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <Image
              className="ml-10 w-2/4"
              label={"Картинка"}
              onChange={handleImagesChange}
              record={fund?.images}
              image={changedImages?.["5"]}
              onDelete={handleImageDelete}
              index={5}
            />
            <Textarea
              label="Описание"
              value={changedText?.text17 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text17"
              autosize
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <Textarea
              label="Описание"
              value={changedText?.text18 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text18"
              autosize
            />
            <Image
              className="ml-10 w-2/4"
              label={"Картинка"}
              onChange={handleImagesChange}
              record={fund?.images}
              image={changedImages?.["6"]}
              onDelete={handleImageDelete}
              index={6}
            />
          </div>
        </div>
        
        <div className='max-w-xl'>
          <TextInput
            label="Заголовок"
            value={changedHeadings?.heading7 ?? ""}
            onChange={(e) => handleHealthChange(e, "heading")}
            name="heading7"
          />
          <Textarea
            label="Описание"
            value={changedText?.text19 ?? ""}
            onChange={(e) => handleHealthChange(e, "text")}
            name="text19"
            autosize
          />
        </div>
        <div className='flex justify-center'>
          <Button onClick={saveFund}>
            Сохранить
          </Button>
        </div>
    </div>
  )
}

