import React from "react";
import { Accordion, Button, Table, Tabs, TextInput, Textarea } from "@mantine/core";
import { getData, pb } from "shared/api";
import { Editor, Image } from "shared/ui";
import { openConfirmModal } from "@mantine/modals";

import { RichTextEditor, Link } from '@mantine/tiptap';

async function getServices() {
  return await pb.collection('dual_data').getFullList()
}

async function getVaca() {
  return await pb.collection('dual_vacas').getFullList()
}

export const Dual = () => {

  const [course, setCourse] = React.useState({});

  const [images, setImages] = React.useState({});
  const [changedImages, setChangedImages] = React.useState({});

  const [headings, setHeadings] = React.useState({});
  const [text, setText] = React.useState({});

  const [changedHeadings, setChangedHeadings] = React.useState({});
  const [changedText, setChangedText] = React.useState({});

  const [services, setServices] = React.useState({})
  const [service, setService] = React.useState('')

  const [vacas, setVacas] = React.useState({})
  const [vaca, setVaca] = React.useState({
    name: '',
    desc: ''
  })

  React.useEffect(() => {
    getServices()
    .then(res => {
      setServices(res?.[0])
    })

    getVaca()
    .then(res => {
      setVacas(res?.[0])
    })
  }, [])

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
      headings: changedHeadings,
      text: changedText,
    });
  }

  React.useEffect(() => {
    getData("dual").then((res) => {
      setCourse(res);
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
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <Image
          className="ml-10 w-2/4 rounded-primary"
          label={"Картинка"}
          onChange={handleImagesChange}
          record={course?.images}
          image={changedImages?.["9"]}
          onDelete={handleImageDelete}
          index={9}
        />
        <div>
          <Textarea
            label="Заголовок"
            value={changedHeadings?.z1 ?? ""}
            onChange={(e) => handleCourseChange(e, "heading")}
            name="z1"
            autosize
          />
          <Textarea
            label="текст"
            value={changedText?.z1 ?? ""}
            onChange={(e) => handleCourseChange(e, "text")}
            name="z1"
            autosize
          />
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

      <section className="grid grid-cols-2 gap-4">
        <Image
          className="ml-10 w-2/4 rounded-primary"
          label={"Картинка"}
          onChange={handleImagesChange}
          record={course?.images}
          image={changedImages?.["8"]}
          onDelete={handleImageDelete}
          index={8}
        />
        <div>
          <Textarea
            label="Заголовок"
            value={changedHeadings?.x1 ?? ""}
            onChange={(e) => handleCourseChange(e, "heading")}
            name="x1"
            autosize
          />
          <Textarea
            label="текст"
            value={changedText?.x1 ?? ""}
            onChange={(e) => handleCourseChange(e, "text")}
            name="x1"
            autosize
          />
        </div>
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

      <div className="flex justify-center mt-60">
        <Button onClick={saveCourses}>
          Сохранить
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div>
          <p>Виды услуг:</p>
          {services?.services?.map((q, i) => {
            return (
              <React.Fragment key={i}>
                <p className='text-lg'>{q}</p>
                <Button
                  variant='subtle'
                  onClick={() => {
                    openConfirmModal({
                      centered: true,
                      labels: {confirm: 'Удалить', cancel: 'Отмена'},
                      onConfirm: async () => {
                        const newTypes = services?.services?.filter(w => w !== q)
                        await pb.collection('dual_data').update(services?.id, {
                          types: [...newTypes]
                        })
                        .then(res => {
                          getServices()
                          .then((res) => {
                            setServices(res?.[0])
                          })
                        })
                      }
                    })
                  }}
                >
                  Удалить 
                </Button>
              </React.Fragment>
            )
          })}
          <div>          
            <TextInput
              className='max-w-md'
              label='Название'
              value={service ?? ''}
              onChange={e => setService(e.currentTarget?.value)}
            />
            <Button
              onClick={async () => {
                await pb.collection('dual_data').update(services?.id, {
                  services: [...services?.services ?? [], service]
                })
                .then(() => {
                  getServices()
                  .then(res => {
                    setServices(res?.[0])
                    setService('')
                  })
                })
              }}
              className='mt-6'
            >
              Добавить тип услуги
            </Button>
          </div>
        </div>
        <div>
          <p>Открытые вакансии:</p>
          <Accordion
            variant='separated'
            className='my-10'
            defaultValue='0'
          >
          {vacas?.vacas?.map((q, i) => {
            return (
              <Accordion.Item value={`${i}`} key={i + 1}>
                <Accordion.Control className='!text-xl !font-bold '>{i + 1}. 
                  <span className='text-primary-500'>{q?.name}</span>
                </Accordion.Control>
                <Accordion.Panel>
                  <div dangerouslySetInnerHTML={{__html: q?.desc}} className="accordion-body" />

                  <Button
                    variant='subtle'
                    onClick={() => {
                      openConfirmModal({
                        centered: true,
                        labels: {confirm: 'Удалить', cancel: 'Отмена'},
                        onConfirm: async () => {
                          const newTypes = vacas?.vacas?.filter(w => w !== q)
                          await pb.collection('dual_vacas').update(vacas?.id, {
                            vacas: [...newTypes]
                          })
                          .then(res => {
                            getVaca()
                            .then((res) => {
                              setVacas(res?.[0])
                            })
                          })
                        }
                      })
                    }}
                  >
                    Удалить 
                  </Button>
                </Accordion.Panel>
              </Accordion.Item>
            )})}
            </Accordion>
       
          <div>     
            <TextInput
              className='max-w-md'
              label='Название'
              value={vaca?.name ?? ''}
              onChange={e => setVaca({...vaca, name: e.currentTarget?.value})}
            />

            <Editor
              getHTML={getHTML}
            />
            <Button
              onClick={async () => {
                await pb.collection('dual_vacas').update(vacas?.id, {
                  vacas: [...vacas?.vacas ?? [], {name: vaca?.name, desc: html}]
                })
                .then(() => {
                  getVaca()
                  .then(res => {
                    setVacas(res?.[0])
                    setVaca({
                      name: '',
                      desc: ''
                    })
                  })
                })
              }}
              className='mt-6'
            >
              Добавить вакансию
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};