import React from 'react'
import { Button, FileButton, Tabs, TextInput, Textarea } from '@mantine/core';
import { getData, pb } from 'shared/api';
import { Image } from 'shared/ui';
import { openConfirmModal } from '@mantine/modals';
import { getImageUrl } from 'shared/lib';
import { ToursKz } from './ToursKz';

async function getResorts () {
  return await pb.collection('resorts_data').getFullList()
}

export const Tours = () => {

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
      headings: changedHeadings,
      text: changedText,
    });
  }

  React.useEffect(() => {
    getData("tours").then((res) => {
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
    <Tabs
      defaultValue='ru'
    >
      <Tabs.List>
        <Tabs.Tab value='ru'>
          Русский
        </Tabs.Tab>
        <Tabs.Tab value='kz'>
          Казахский
        </Tabs.Tab>
        <Tabs.Tab value='bids'>
          Заявки
        </Tabs.Tab>
        <Tabs.Tab value='resorts'>
          Курортные зоны
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value='ru' pt={20}>
        <div>
          <div className='max-w-xl'>
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
          <div className='mt-8 max-w-xl'>
            <TextInput
              label="Заголовок"
              value={changedHeadings?.heading2 ?? ""}
              onChange={(e) => handleHealthChange(e, "heading")}
              name="heading2"
            />
            <Image
              className="ml-10 w-2/4"
              label={"Картинка"}
              onChange={handleImagesChange}
              record={fund?.images}
              image={changedImages?.["2"]}
              onDelete={handleImageDelete}
              index={2}
            />
          </div>
          <div className='flex justify-center mt-4'>
            <Button onClick={saveFund}>
              Сохранить
            </Button>
          </div>
        </div>
      </Tabs.Panel>
      <Tabs.Panel value='kz' pt={20}>
        <ToursKz/>
      </Tabs.Panel>
      <Tabs.Panel value='bids' pt={20}>
      </Tabs.Panel>
      <Tabs.Panel value='resorts' pt={20}>
        {resorts?.map((q, i) => {
          return (
            <>
              <div className='space-y-4 max-w-xl border p-3 rounded-lg flex gap-4' key={i}>
                <img src={getImageUrl(q, q?.image)} className='object-cover shrink-0 w-[168px] h-[168px] rounded-md overflow-hidden' alt="" />
                <div>
                  <p className='text-lg'>{q.name}</p>
                  <p className='text-sm mt-2'>{q.description}</p>
                </div>
              </div>
              <Button
                variant='subtle'
                onClick={() => {
                  openConfirmModal({
                    centered: true,
                    labels: {confirm: 'Удалить', cancel: 'Отмена'},
                    onConfirm: async () => {
                      await pb.collection('resorts_data').delete(q?.id)
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
            value={resort?.name ?? ''}
            onChange={e => setResort({...resort, name: e.currentTarget?.value})}
          />
          <TextInput
            className='max-w-md'
            label='Описание'
            value={resort?.description ?? ''}
            onChange={e => setResort({...resort, description: e.currentTarget?.value})}
          />
          {resort?.image && (
            <img 
              src={resort?.image instanceof File ? URL.createObjectURL(resort?.image) : ''} alt="" 
              className='aspect-square object-cover max-w-[278px]'
            />
          )}
          <FileButton onChange={e => setResort({...resort, image: e})} accept="image/png,image/jpeg">
            {(props) => <Button className='mt-4' compact {...props}>Загрузить изображение</Button>}
          </FileButton>
          <div>
            <Button
              onClick={async () => {
                const formData = new FormData()
                formData.append('name', resort?.name)
                formData.append('description', resort?.description)
                formData.append('image', resort?.image)
                await pb.collection('resorts_data').create(formData)
                .then(res => {
                  setResort({})
                })
              }}
              className='mt-6'
            >
              Добавить курортную зону
            </Button>
          </div>
        </div>
      </Tabs.Panel>
    </Tabs>
  )
}