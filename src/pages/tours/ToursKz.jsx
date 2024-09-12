import React from 'react'
import { Button, FileButton, Tabs, TextInput, Textarea } from '@mantine/core';
import { getData, pb } from 'shared/api';
import { Image } from 'shared/ui';
import { openConfirmModal } from '@mantine/modals';
import { getImageUrl } from 'shared/lib';

async function getResorts () {
  return await pb.collection('resorts_data').getFullList()
}

export const ToursKz = () => {

  const [fund, setFund] = React.useState({});

  const [images, setImages] = React.useState({});
  const [headings, setHeadings] = React.useState({});
  const [text, setText] = React.useState({});
  
  
  const [changedImages, setChangedImages] = React.useState({});
  const [changedHeadings, setChangedHeadings] = React.useState({});
  const [changedText, setChangedText] = React.useState({});

  const [resorts, setResorts] = React.useState([])

  const [cards, setCards] = React.useState([])

  const [resort, setResort] = React.useState({
    name: '',
    description: '',
    image: null
  })

  React.useEffect(() => {
    getResorts()
    .then(res => {
      setResorts(res?.filter(q => !q?.card))
      setCards(res?.filter(q => q?.card))
    })

    pb.collection('resorts_data').subscribe('*', () => {
      getResorts()
      .then(res => {
        setResorts(res?.filter(q => !q?.card))
        setCards(res?.filter(q => q?.card))
      })
    })
  }, [])

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
    getData("tours").then((res) => {
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

  return (
    <div>
      <div className='max-w-xl'>
        <Image
          className="w-2/4"
          label={"Картинка"}
          onChange={handleImagesChange}
          record={fund?.images}
          image={changedImages?.["1"]}
          onDelete={handleImageDelete}
          index={1}
        />
        <TextInput
          label="Заголовок"
          value={changedHeadings?.heading1 ?? ""}
          onChange={(e) => handleHealthChange(e, "heading")}
          name="heading1"
        />
        <Textarea
          label="Описание"
          value={changedText?.text2 ?? ""}
          onChange={(e) => handleHealthChange(e, "text")}
          name="text2"
          autosize
        />
      </div>
      <div className='max-w-xl'>
          <Image
            className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0 rounded-primary max-h-96 object-cover"
            label={"Картинка"}
            onChange={handleImagesChange}
            record={fund?.images}
            image={changedImages?.["9"]}
            onDelete={handleImageDelete}
            index={9}
          />
          <TextInput
            label="Заголовок"
            value={changedHeadings?.headingx ?? ""}
            onChange={(e) => handleHealthChange(e, "heading")}
            name="headingx"
          />
          <Textarea
            label="Описание"
            value={changedText?.textx ?? ""}
            onChange={(e) => handleHealthChange(e, "text")}
            name="textx"
            autosize
          />
        </div>
      <div className='mt-8 max-w-xl'>
        <TextInput
          label="Заголовок"
          value={changedHeadings?.heading2 ?? ""}
          onChange={(e) => handleHealthChange(e, "heading")}
          name="heading2"
        />
        {/* <Image
          className="ml-10 w-2/4"
          label={"Картинка"}
          onChange={handleImagesChange}
          record={fund?.images}
          image={changedImages?.["2"]}
          onDelete={handleImageDelete}
          index={2}
        /> */}
      </div>
      <div className='flex justify-center mt-4'>
        <Button onClick={saveFund}>
          Сохранить
        </Button>
      </div>
    </div>
  )
}