import React from 'react'
import { Button, Table, Tabs, TextInput, Textarea } from '@mantine/core';
import { getData, pb } from 'shared/api';
import { Image } from 'shared/ui';
import { RightsKz } from './RightsKz';
import { openConfirmModal } from '@mantine/modals';
import { RightsAccordion } from './RightsAccordion';

async function getTypes() {
  return await pb.collection('rights_data').getFullList()
}

async function getRightsbids () {
  return await pb.collection('rights_bids').getFullList()
}

export const Rights = () => {

  const [types, setTypes] = React.useState([])
  const [bids, setBids] = React.useState([])

  const [type, setType] = React.useState('')

  React.useEffect(() => {
    getTypes()
    .then(res => {
      setTypes(res?.[0])
    })

    getRightsbids()
    .then(res => {
      setBids(res)
    })

    // pb.collection('rights_data').subscribe('*', () => {
    //   getTypes()
    //   .then(res => {
    //     setTypes(res?.[0])
    //   })
    // })
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
    getData("rights").then((res) => {
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
        <Tabs.Tab value='data'>
          Виды услуг
        </Tabs.Tab>
        <Tabs.Tab value='services'>
          Предлагаемые юридические услуги
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value='services'>
        <RightsAccordion/>
      </Tabs.Panel>
      <Tabs.Panel value='ru' pt={20}>
        <div className='w-full space-y-8'>
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
                value={changedHeadings?.heading1 ?? ""}
                onChange={(e) => handleHealthChange(e, "heading")}
                name="heading1"
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
                value={changedHeadings?.heading2 ?? ""}
                onChange={(e) => handleHealthChange(e, "heading")}
                name="heading2"
              />
              <Textarea
                label="Описание"
                value={changedText?.text2 ?? ""}
                onChange={(e) => handleHealthChange(e, "text")}
                name="text2"
                autosize
              />
            </div>
          </div>

          <div>
            <TextInput
              label="Заголовок"
              value={changedHeadings?.heading3 ?? ""}
              onChange={(e) => handleHealthChange(e, "heading")}
              name="heading3"
            />
            <div className='grid grid-cols-2 gap-4 mt-4'>
              <Image
                className="ml-10 w-2/4"
                label={"Картинка"}
                onChange={handleImagesChange}
                record={fund?.images}
                image={changedImages?.["2"]}
                onDelete={handleImageDelete}
                index={2}
              />
              <Textarea
                label="Описание"
                value={changedText?.text3 ?? ""}
                onChange={(e) => handleHealthChange(e, "text")}
                name="text3"
                autosize
              />
            </div>
          </div>

          <div className='max-w-xl mx-auto'>
            <Textarea
              label="Описание"
              value={changedText?.text4 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text4"
              autosize
            />
          </div>

          <div className='max-w-xl'>
            <TextInput
              label="Заголовок"
              value={changedHeadings?.heading4 ?? ""}
              onChange={(e) => handleHealthChange(e, "heading")}
              name="heading4"
            />
            <Textarea
              label="Описание 1"
              value={changedText?.text5 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text5"
              autosize
            />
            <Textarea
              label="Подописание 1"
              value={changedText?.text55 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text55"
              autosize
            />
            <Textarea
              label="Описание 2"
              value={changedText?.text6 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text6"
              autosize
            />
            <Textarea
              label="Подописание 2"
              value={changedText?.text66 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text66"
              autosize
            />
            <Textarea
              label="Описание 3"
              value={changedText?.text7 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text7"
              autosize
            />
            <Textarea
              label="Подописание 3"
              value={changedText?.text77 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text77"
              autosize
            />
            <Textarea
              label="Описание 4"
              value={changedText?.text8 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text8"
              autosize
            />
            <Textarea
              label="Подописание 4"
              value={changedText?.text88 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text88"
              autosize
            />
            <Textarea
              label="Описание 5"
              value={changedText?.text9 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text9"
              autosize
            />
            <Textarea
              label="Подописание 5"
              value={changedText?.text99 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text99"
              autosize
            />
          </div>
          
          <div className='max-w-xl'>
            <TextInput
              label="Заголовок"
              value={changedHeadings?.heading5 ?? ""}
              onChange={(e) => handleHealthChange(e, "heading")}
              name="heading5"
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
            <Textarea
              label="Описание"
              value={changedText?.text10 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text10"
              autosize
            />
          </div>
          <div className='flex justify-center'>
            <Button onClick={saveFund}>
              Сохранить
            </Button>
          </div>
        </div>
      </Tabs.Panel>
      <Tabs.Panel value='kz'>
        <RightsKz/>
      </Tabs.Panel>
      <Tabs.Panel value='bids'>
        <Table>
          <thead>
            <tr>
              <th>Название</th>
              <th>Номер телефона</th>
              <th>Тип</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {bids?.map((w) => {
              return (
                <tr key={w?.id}>
                  <td>{w?.name}</td>
                  <td>{w?.phone}</td>
                  <td>{w?.type}</td>
                  <td>
                    <Button
                      onClick={() => {
                        openConfirmModal({
                          labels: {confirm: 'Удалить', cancel: 'Отмена'},
                          centered: true,
                          onConfirm: async () => {
                            await pb.collection('rights_bids').delete(w?.id)
                            .then(() => {
                              getRightsbids()
                              .then(res => {
                                setBids(res)
                              })
                            })
                          }
                        })
                      }}  
                      compact
                      variant="light"
                    >
                      Удалить
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Tabs.Panel>
      <Tabs.Panel value='data'>
        {types?.types?.map((q, i) => {
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
                      await pb.collection('rights_data').update(types?.id, {
                        types: [...newTypes]
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
              await pb.collection('rights_data').update(types?.id, {
                types: [...types?.types ?? [], type]
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
      </Tabs.Panel>
    </Tabs>
  )
}
