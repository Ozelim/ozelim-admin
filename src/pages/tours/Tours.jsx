import React from 'react'
import { Accordion, Button, FileButton, Table, Tabs, TextInput, Textarea } from '@mantine/core';
import { getData, pb } from 'shared/api';
import { Editor, Image } from 'shared/ui';
import { openConfirmModal } from '@mantine/modals';
import { getImageUrl } from 'shared/lib';
import { ToursKz } from './ToursKz';
import dayjs from 'dayjs';

async function getResorts () {
  return await pb.collection('resorts_data').getFullList()
}

async function getResortBids () {
  return await pb.collection('tours_bids').getFullList()
}

async function getTours () {
  return await pb.collection('tours_data').getFullList()
}

export const Tours = () => {

  const [fund, setFund] = React.useState({});

  const [images, setImages] = React.useState({});
  const [headings, setHeadings] = React.useState({});
  const [text, setText] = React.useState({});

  const [tourB, setTourB] = React.useState('')
  const [tour, setTour] = React.useState('')
  const [tours, setTours] = React.useState({})

  React.useEffect(() => {
    getTours()
    .then(res => {
      setTours(res?.[0])
    })
  }, [])
  
  const [changedImages, setChangedImages] = React.useState({});
  const [changedHeadings, setChangedHeadings] = React.useState({});
  const [changedText, setChangedText] = React.useState({});

  const [resorts, setResorts] = React.useState([])

  const [bids, setBids] = React.useState([])

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

    getResortBids()
    .then(res => {
      setBids(res)
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
  
  const [html, setHtml] = React.useState('')

  function getHTML (e) {
    setHtml(e)
  }
  
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
        {/* <Tabs.Tab value='bids'>
          Заявки
        </Tabs.Tab> */}
        <Tabs.Tab value='resorts'>
          Курортные зоны
        </Tabs.Tab>
        <Tabs.Tab value='tours'>
          Туры
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
              value={changedText?.text1 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text1"
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
            <Textarea
              label="Описание"
              value={changedText?.text2 ?? ""}
              onChange={(e) => handleHealthChange(e, "text")}
              name="text2"
              autosize
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
            <TextInput
              label="Заголовок"
              value={changedHeadings?.heading3 ?? ""}
              onChange={(e) => handleHealthChange(e, "heading")}
              name="heading3"
              className='max-w-xl'
            />
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
      <Tabs.Panel value='tours' pt={20}>
        <div>
          <p>Туры:</p>
            <Accordion
              variant='separated'
              className='my-10'
              defaultValue='0'
            >
              {tours?.tours?.map((q, i) => {
                return (
                  <Accordion.Item value={`${i}`} key={i}>
                    <Accordion.Control className='!text-xl !font-bold '>{i + 1}. 
                      <span className='text-primary-500'>{q?.name}</span>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <div className='accordion-body' dangerouslySetInnerHTML={{__html: q?.desc ?? <></>}}/>
                    </Accordion.Panel>

                    <Button
                      variant='subtle'
                      onClick={() => {
                        openConfirmModal({
                          centered: true,
                          labels: {confirm: 'Удалить', cancel: 'Отмена'},
                          onConfirm: async () => {
                            const newTypes = tours?.tours?.filter(w => w !== q)
                            await pb.collection('tours_data').update(tours?.id, {
                              tours: [...newTypes]
                            })
                            .then(res => {
                              getTours()
                              .then((res) => {
                                setTours(res?.[0])
                              })
                            })
                          }
                        })
                      }}
                    >
                      Удалить 
                    </Button>
                  </Accordion.Item>
                )
              })}
            </Accordion>

          <div>          
            <TextInput
              className='max-w-md'
              label='Название'
              value={tour ?? ''}
              onChange={e => setTour(e.currentTarget.value)}
            />
            <label>Описание</label>
            <Editor getHTML={getHTML}/>
            <Button
              onClick={async () => {
                await pb.collection('tours_data').update(tours?.id, {
                  tours: [...tours?.tours ?? [], {name: tour, desc: html}]
                })
                .then(() => {
                  getTours()
                  .then(res => {
                    setTours(res?.[0])
                    setTour('')
                  })
                })
              }}
              className='mt-6'
            >
              Добавить тур
            </Button>
          </div>

          <div className='max-w-xl mt-4'>
            <p>Тур (заявки)</p>
            <TextInput
              label='Название'
              value={tourB}
              onChange={e => setTourB(e.currentTarget.value)}
            />
            <Button
              onClick={async () => {
                await pb.collection('tours_data').update(tours?.id, {
                  tours_bid: [...tours?.tours_bid ?? [], tourB]
                })
                .then(async () => {
                  getTours()
                  .then(res => {
                    setTours(res?.[0])
                  })
                })
              }}
              className='mt-2'
            >
              Добавить
            </Button>
            <div className='mt-4'>
              <p>Туры (заявки)</p>
              <div className='mt-4'>
                {tours?.tours_bid?.map((q, i) => {
                  return (
                    <div key={i} className='grid grid-cols-[70%_auto]'>
                      {q}
                      <Button
                        variant='subtle'
                        compact
                        onClick={async () => {
                          const newDogs = tours?.tours_bid?.filter(w => {return w !== q})
                          await pb.collection('tours_data').update(tours?.id, {
                            tours_bid: [...newDogs]
                          })
                          .then(async () => {
                            getTours()
                            .then(res => {
                              setTours(res?.[0])
                            })
                          })
                        }}
                      >
                        Удалить
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </Tabs.Panel>
      {/* <Tabs.Panel value='bids' pt={20}>
        <Table>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Категория</th>
              <th>Дата</th>
              <th>Взрослых</th>
              <th>Детей</th>
              <th>Телефон</th>
              <th>Курорт</th>
            </tr>
          </thead>
          <tbody>
            {bids?.map((w) => {
              return (
                <tr key={w?.id}>
                  <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                  <td>
                    {w?.category === 'standart' && 'Стандарт'}
                    {w?.category === 'eco' && 'Эконом'}
                    {w?.category === 'vip' && 'Вип'}
                  </td>
                  <td>с {dayjs(w?.date_picked?.[0]).format("YY-MM-DD")} по {dayjs(w?.date_picked?.[1]).format("YY-MM-DD")}</td>
                  <td>{w?.adults}</td>
                  <td>{w?.child}</td>
                  <td>{w?.phone}</td>
                  <td>{w?.resort?.name}</td>
                  <td>
                    <Button
                      onClick={() => {
                        openConfirmModal({
                          labels: {confirm: 'Удалить', cancel: 'Отмена'},
                          centered: true,
                          onConfirm: async () => {
                            await pb.collection('tours_bids').delete(w?.id)
                            .then(() => {
                              getResortBids()
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
      </Tabs.Panel> */}
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