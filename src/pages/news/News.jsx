import { Button, TextInput, Textarea } from "@mantine/core";
import React from "react";
import { getData, pb } from "shared/api";
import { Image } from "shared/ui";
import { AiFillCalendar } from "react-icons/ai";
import { DateInput, DateTimePicker } from "@mantine/dates";
import { NewsCard } from "widgets";
import { openConfirmModal } from "@mantine/modals";
import { MdDeleteForever } from "react-icons/md";

async function getNews () {
  return await pb.collection('news').getFullList()
}

export const News = () => {

  const [news, setNews] = React.useState({})

  React.useEffect(() => {
    getNews()
    .then(res => {
      setNews(res)
    })

    pb.collection('news').subscribe('*', function () {
      getNews()
      .then(res => {
        setNews(res)
      })
    })
  }, [])

  const [item, setItem] = React.useState({
    name: '',
    title: '',
    description: '',
    image: '',
    avatar: '',
    date: '',
    link: '',
  })


  function handleNewsChange (e, name) {
    if (e?.currentTarget) {
      const {value, name} = e?.currentTarget
      setItem({...item, [name]: value})
      return
    }
    setItem({...item, [name]: e})
  }

  async function createNews () {
    const formData = new FormData()
    formData.append('name', item?.name)
    formData.append('description', item?.description)
    formData.append('title', item?.title)
    formData.append('link', item?.link)
    formData.append('date', item?.date?.toUTCString())
    formData.append('image', item?.image)
    formData.append('avatar', item?.avatar)
    await pb.collection('news').create(formData)
  }

  const confirmDelete = (newsId) => openConfirmModal({
    title: 'Подтвердите действие',
    centered: true,
    labels: {confirm: 'Удалить', cancel: 'Отмена'},
    onConfirm: () => deleteNews(newsId)
  })

  async function deleteNews (newsId) {
    await pb.collection('news').delete(newsId)
  }

  function handleImagesChange (val, name) {
    setItem({...item, [name]: val})
  }

  function handleImageDelete (index) {
    setItem({...item, [index]: ''})
  }

  return (
    <div className="w-full">
      <section className="max-w-md mx-auto space-y-4">
        <TextInput
          label='Имя'
          value={item?.name ?? ''}
          onChange={handleNewsChange}
          name="name"
        />
        <TextInput
          label='Заголовок'
          value={item?.title ?? ''}
          onChange={handleNewsChange}
          name="title"
        />
        <Image
          label='Аватар'
          // value={item?.name ?? ''}
          onChange={handleImagesChange}
          onDelete={handleImageDelete}
          index={'avatar'}
          image={item?.avatar}
          className={'!w-24'}
        />
        <Image
          label='Изображение'
          onChange={handleImagesChange}
          onDelete={handleImageDelete}
          index={'image'}
          image={item?.image}
          className={'!w-24 mt-4'}
          // value={item?.name ?? ''}
        />
        <Textarea
          label='Описание'
          value={item?.description ?? ''}
          onChange={handleNewsChange}
          name="description"
        />
        <DateTimePicker
          label='Дата'
          value={item?.date ?? ''}
          onChange={e => handleNewsChange(e, 'date')}
          name="date"
        />
        <TextInput
          label='Ссылка'
          value={item?.link ?? ''}
          onChange={handleNewsChange}
          name="link"
        />
        <Button
          onClick={createNews}
        >
          Создать
        </Button>
      </section>
      <section className="space-y-10 mt-10">
        {news?.map((q, i) => {
          return (
            <div key={i} className="relative max-w-5xl mx-auto">
              <NewsCard news={q} />
              <MdDeleteForever
                size={30}
                color="red"
                onClick={() => confirmDelete(q?.id)}
                className="absolute top-2 -right-8"
              />
            </div>
          )
        })}
      </section>
    </div>
    // <div className="bg-white shadow rounded-primary max-w-5xl w-full mx-auto">
    //   <div className="px-10 py-5 flex flex-col">
    //     <div className="flex items-center justify-between gap-4">
    //       <div className="flex items-center gap-4">
    //         <Image
    //           className="ml-10 w-14"
    //           label={"Аватар"}
    //           onChange={handleImagesChange}
    //           record={news?.images}
    //           image={changedImages?.["1"]}
    //           onDelete={handleImageDelete}
    //           index={1}
    //         />
    //         <Textarea
    //           label="Никнейм"
    //           value={changedHeadings?.name ?? ""}
    //           onChange={(e) => handleNewsChange(e, "heading")}
    //           name="name"
    //           autosize
    //         />
    //       </div>
    //       <div className="flex items-center">
    //         <AiFillCalendar fill="teal" className="mt-5 mr-2" size={20} />
    //         <Textarea
    //           label="дата "
    //           value={changedText?.date ?? ""}
    //           onChange={(e) => handleNewsChange(e, "text")}
    //           name="date"
    //           autosize
    //         />
    //       </div>
    //     </div>

    //     <div className="flex justify-between">
    //       <Textarea
    //         label="Заголовок"
    //         value={changedHeadings?.heading ?? ""}
    //         onChange={(e) => handleNewsChange(e, "heading")}
    //         name="heading"
    //         autosize
    //       />
    //     </div>
    //     <Image
    //       className="ml-10 w-2/4"
    //       label={"Картинка"}
    //       onChange={handleImagesChange}
    //       record={news?.images}
    //       image={changedImages?.["2"]}
    //       onDelete={handleImageDelete}
    //       index={2}
    //     />
    //     <Textarea
    //       label="текст"
    //       value={changedText?.news ?? ""}
    //       onChange={(e) => handleNewsChange(e, "text")}
    //       name="news"
    //       autosize
    //     />

    //     <p className="text-zinc-400 text-sm uppercase">ozelim.kz</p>
    //   </div>
    //   <Button className="mt-10" size="lg" fullWidth onClick={saveNews}>
    //     Сохранить
    //   </Button>
    // </div>
  );
};
