import React from 'react'
import { Button, TextInput, Textarea } from '@mantine/core';
import { getData, pb } from 'shared/api';
import { Image } from 'shared/ui';
import { openConfirmModal } from '@mantine/modals';

async function getTypes() {
  return await pb.collection('fund_data').getFullList()
}

export const Fund = () => {

  const [type, setType] = React.useState('')
  const [types, setTypes] = React.useState([])

  React.useEffect(() => {
    getTypes()
    .then(res => {
      setTypes(res?.[0])
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
      headings: changedHeadings,
      text: changedText,
    });
  }

  React.useEffect(() => {
    getData("fund").then((res) => {
      setFund(res);
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
    <>
      <div>
        <div className='grid grid-cols-2'>
          <Image
            className="ml-10 w-2/4"
            label={"Картинка"}
            onChange={handleImagesChange}
            record={fund?.images}
            image={changedImages?.["1"]}
            onDelete={handleImageDelete}
            index={1}
          />
          <Textarea
            label="Описание"
            value={changedText?.text1 ?? ""}
            onChange={(e) => handleHealthChange(e, "text")}
            name="text1"
            autosize
          />
        </div>
        <div className='mt-8'>
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
        <div className='mt-8'>
          <TextInput
            label="Заголовок"
            value={changedHeadings?.heading2 ?? ""}
            onChange={(e) => handleHealthChange(e, "heading")}
            name="heading2"
          />
          <Textarea
            label="Описание"
            value={changedText?.text3 ?? ""}
            onChange={(e) => handleHealthChange(e, "text")}
            name="text3"
            autosize
          />
        </div>
        <div className='grid grid-cols-3 gap-4 mt-8'>
          <Image
            className="ml-10 w-2/4"
            label={"Картинка"}
            onChange={handleImagesChange}
            record={fund?.images}
            image={changedImages?.["2"]}
            onDelete={handleImageDelete}
            index={2}
          />
          <Image
            className="ml-10 w-2/4"
            label={"Картинка"}
            onChange={handleImagesChange}
            record={fund?.images}
            image={changedImages?.["3"]}
            onDelete={handleImageDelete}
            index={3}
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
        <div className='mt-8'>
          <TextInput
            label="Заголовок"
            value={changedHeadings?.heading4 ?? ""}
            onChange={(e) => handleHealthChange(e, "heading")}
            name="heading4"
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
        </div>
        <div className='mt-8'>
          <TextInput
            label="Заголовок"
            value={changedHeadings?.heading5 ?? ""}
            onChange={(e) => handleHealthChange(e, "heading")}
            name="heading5"
          />
          <div className='grid gap-4 grid-cols-3'>
            <div>
              <TextInput
                label="Под заголовок"
                value={changedHeadings?.heading6 ?? ""}
                onChange={(e) => handleHealthChange(e, "heading")}
                name="heading6"
              />
              <Textarea
                label="Описание"
                value={changedText?.text8 ?? ""}
                onChange={(e) => handleHealthChange(e, "text")}
                name="text8"
                autosize
              />
            </div>
            <div>
              <TextInput
                label="Под заголовок"
                value={changedHeadings?.heading7 ?? ""}
                onChange={(e) => handleHealthChange(e, "heading")}
                name="heading7"
              />
              <Textarea
                label="Описание"
                value={changedText?.text9 ?? ""}
                onChange={(e) => handleHealthChange(e, "text")}
                name="text9"
                autosize
              />
            </div>
            <div>
              <TextInput
                label="Под заголовок"
                value={changedHeadings?.heading8 ?? ""}
                onChange={(e) => handleHealthChange(e, "heading")}
                name="heading8"
              />
              <Textarea
                label="Описание"
                value={changedText?.text10 ?? ""}
                onChange={(e) => handleHealthChange(e, "text")}
                name="text10"
                autosize
              />
            </div>
          </div>
        </div>
        <div className='mt-8'>
          <TextInput
            label="Заголовок"
            value={changedHeadings?.heading9 ?? ""}
            onChange={(e) => handleHealthChange(e, "heading")}
            name="heading9"
          />
          <div className='grid grid-cols-2 mt-3'>
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
              value={changedText?.text11 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text11"
              autosize
            />
          </div>
        </div>

        <div className='mt-8 max-w-xl'>
          <TextInput
            label="Заголовок"
            value={changedHeadings?.heading99 ?? ""}
            onChange={(e) => handleHealthChange(e, "heading")}
            name="heading99"
          />
          <Textarea
            label="Описание"
            value={changedText?.text991 ?? ""}
            onChange={(e) => handleHealthChange(e, "text")}
            name="text991"
            autosize
          />
          <Textarea
            label="Описание"
            value={changedText?.text992 ?? ""}
            onChange={(e) => handleHealthChange(e, "text")}
            name="text992"
            autosize
          />
          <Textarea
            label="Описание"
            value={changedText?.text993 ?? ""}
            onChange={(e) => handleHealthChange(e, "text")}
            name="text993"
            autosize
          />
          <Textarea
            label="Описание"
            value={changedText?.text994 ?? ""}
            onChange={(e) => handleHealthChange(e, "text")}
            name="text994"
            autosize
          />
          <Textarea
            label="Описание"
            value={changedText?.text995 ?? ""}
            onChange={(e) => handleHealthChange(e, "text")}
            name="text995"
            autosize
          />
          <Textarea
            label="Описание"
            value={changedText?.text996 ?? ""}
            onChange={(e) => handleHealthChange(e, "text")}
            name="text996"
            autosize
          />
          <Textarea
            label="Описание"
            value={changedText?.text997 ?? ""}
            onChange={(e) => handleHealthChange(e, "text")}
            name="text997"
            autosize
          />
          <Textarea
            label="Описание"
            value={changedText?.text998 ?? ""}
            onChange={(e) => handleHealthChange(e, "text")}
            name="text998"
            autosize
          />
        </div>

        <div className='mt-8'>
          <TextInput
            label="Заголовок"
            value={changedHeadings?.heading10 ?? ""}
            onChange={(e) => handleHealthChange(e, "heading")}
            name="heading10"
          />
          <div className='grid grid-cols-2 mt-3'>
            <Image
              className="ml-10 w-2/4"
              label={"Картинка"}
              onChange={handleImagesChange}
              record={fund?.images}
              image={changedImages?.["6"]}
              onDelete={handleImageDelete}
              index={6}
            />
            <div>
              <TextInput
                label="Заголовок"
                value={changedHeadings?.heading11 ?? ""}
                onChange={(e) => handleHealthChange(e, "heading")}
                name="heading11"
              />
              <Textarea
                label="Описание"
                value={changedText?.text12 ?? ""}
                onChange={(e) => handleHealthChange(e, "text")}
                name="text12"
                autosize
              />
            </div>
          </div>
        </div>
        <div className='flex justify-center mt-8'>
          <Button onClick={saveFund}>
            Сохранить
          </Button>
        </div>
      </div>
      {types?.services?.map((q, i) => {
        return (
          <>
            <p className='text-lg'>{q}</p>
            <Button
              variant='subtle'
              onClick={() => {
                openConfirmModal({
                  centered: true,
                  labels: {confirm: 'Удалить', cancel: 'Отмена'},
                  onConfirm: async () => {
                    const newTypes = types?.types?.filter(w => w !== q)
                    await pb.collection('fund_data').update(types?.id, {
                      services: [...newTypes]
                    })
                    .then(res => {
                      getTypes()
                      .then((res) => {
                        setTypes(res?.[0])
                      })
                    })
                  }
                })
              }}
            >
              Удалить 
            </Button>
          </>
        )
      })}
      <div>          
        <TextInput
          className='max-w-md'
          label='Название'
          value={type ?? ''}
          onChange={e => setType(e.currentTarget?.value)}
        />
        <Button
          onClick={async () => {
            await pb.collection('fund_data').update(types?.id, {
              services: [...types?.services ?? [], type]
            })
            .then(() => {
              getTypes()
              .then(res => {
                setTypes(res?.[0])
                setType('')
              })
            })
          }}
          className='mt-6'
        >
          Добавить тип услуги
        </Button>
      </div>
    </>
  )
}
