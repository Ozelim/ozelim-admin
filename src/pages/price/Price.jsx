import React from 'react'
import { Button, Textarea, TextInput } from '@mantine/core';
import { getData, pb } from 'shared/api';
import { PriceCard } from 'widgets';
import { Image } from 'shared/ui';
import { CiCircleRemove } from 'react-icons/ci';
import { openConfirmModal } from '@mantine/modals';

async function getPrices () {
  return await pb.collection('prices').getFullList({expand: 'prices', filter: `kz = false`})
}

export const Price = () => {

  const [prices, setPrices] = React.useState([])
  const [p, setP] = React.useState({})

  const [about, setAbout] = React.useState({})

  const [images, setImages] = React.useState({})
  const [changedImages, setChangedImages] = React.useState({})

  const [headings, setHeadings] = React.useState({})
  const [text, setText] = React.useState({})

  const [changedHeadings, setChangedHeadings] = React.useState({})
  const [changedText, setChangedText] = React.useState({})

  function handleAboutChange (val, type) {
    const {value, name} = val?.target

    if (type === 'heading') {
      setChangedHeadings({...changedHeadings, [name]: value})
      return 
    }

    setChangedText({...changedText, [name]: value})
    return 
  }

  async function saveAbout () {

    for (const index in changedImages) {
      if (!isNaN(index)) {
        if (changedImages?.[index] instanceof File) {
          const formData = new FormData()
          formData.append([`${index}`], changedImages?.[index])
          await pb.collection('images').update(about?.images?.id, formData)
          .then(res => {
            console.log(res);
          })
        }
      }
    }
    await pb.collection('text').update(about?.text?.id, {
      headings: changedHeadings, 
      text: changedText
    })
  }

  
  React.useEffect(() => {
    getData('price').then(res => {
      setAbout(res);
      setHeadings(res?.text?.headings)
      setText(res?.text?.text)
      setImages(res?.images)
    })
  }, [])
  
  React.useEffect(() => {
    setChangedHeadings(headings)
    setChangedText(text)
  }, [headings, text])

  React.useEffect(() => {
    setChangedImages(images)
  }, [images])

  React.useEffect(() => {
    getPrices()
    .then(res => {
      setPrices(res)
    })

    pb.collection('prices').subscribe('*', function () {
      getPrices()
      .then(res => {
        setPrices(res)
      })
    })
  }, [])

  async function createPrice (price) {
    await pb.collection('price').create({
      title: p?.[`${price?.id}_d`],
      cost: p?.[`${price?.id}_c`],
    })
    .then(async (res) => {
      await pb.collection('prices').update(price?.id, {
        prices: [...price?.prices, res?.id]
      })
      .then(() => {
        setP({})
      })
    })
  }

  async function savePrice (price) {
    const formData = new FormData()
    formData.append('name', price?.name)
    formData.append('heading', price?.heading)
    formData.append('image', price?.image)
    formData.append('1', price?.[1])
    formData.append('2', price?.[2])
    formData.append('3', price?.[3])
    formData.append('4', price?.[4])

    await pb.collection('prices').update(price?.id, formData)
  }

  const removePriceConfrim = (priceId) =>
    openConfirmModal({
      title: "Подтвердите действие",
      centered: true,
      labels: { confirm: "Подтвердить", cancel: "Отмена" },
      children: <>Вы действительно хотите отклонить данную отправку?</>,
      onConfirm: () => deletePrice(priceId),
    });

  async function deletePrice(priceId) {
    await pb
      .collection('price')
      .delete(priceId)
  }

  function handlePriceChange (val, name, index) {
    setPrices(q => q.map((e, i) => {
      if (i === index) {
        return { ...e, [name]: val }
      } else {
        return e
      }
    }))
  }

  function handlePriceDelete (name, index) {
    setPrices(q => q.map((e, i) => {
      if (i === index) {
        return { ...e, [name]: null }
      } else {
        return e
      }
    }))
  }
  
  const confirmPDelete = (priceId) => openConfirmModal({
    title: 'Подтвердите действие', 
    centered: true,
    labels: { confirm: 'Подтвердить', cancel: 'Отмена' },
    onConfirm: async () => {
      await pb.collection('prices').delete(priceId)
    },
    children: <>Данный человек и все его стоимости услуг будут удалены</>
  })

  return (
    <div className="w-full">
      {prices?.map((price, i) => {
        return (
          <div key={i} className='mt-10'>
            <hr/>
            <Button
              onClick={() => confirmPDelete(price?.id)}
              compact
              variant='outline'
              color='red'
              my={16}
            >
              Удалить человека
            </Button>
            <section>
              <Image
                label={"Картинка"}
                onChange={(e) => handlePriceChange(e, 'image', i)}
                record={price}
                image={price?.image}
                onDelete={(e) => handlePriceDelete('image', i)}
                index={'image'}
              />
              <TextInput
                label="Имя"
                value={price?.name ?? ""}
                onChange={(e) => handlePriceChange(e.currentTarget.value, "name", i)}
                name="name"
              />
              <TextInput
                label="Главный заголовок"
                value={price?.heading ?? ""}
                onChange={(e) => handlePriceChange(e.currentTarget.value, "heading", i)}
                name="heading"
              />
              <TextInput
                label="Текст"
                value={price?.[1] ?? ""}
                onChange={(e) => handlePriceChange(e.currentTarget.value, '1', i)}
                name="1"
              />
              <TextInput
                label="Текст"
                value={price?.[2] ?? ""}
                onChange={(e) => handlePriceChange(e.currentTarget.value, '2', i)}
                name="2"
              />
              <TextInput
                label="Текст"
                value={price?.[3] ?? ""}
                onChange={(e) => handlePriceChange(e.currentTarget.value, '3', i)}
                name="3"
              />
              <TextInput
                label="Текст"
                value={price?.[4] ?? ""}
                onChange={(e) => handlePriceChange(e.currentTarget.value, '4', i)}
                name="4"
              />
              <Button mt={16} onClick={() => savePrice(price)}>Сохранить</Button>
            </section>
            <section className="mt-10">
              <TextInput
                value={p?.[`${price?.id}_d`]}
                onChange={e => setP({...p, [`${price?.id}_d`]: e.currentTarget.value})}
                label="Описание"
              />
              <TextInput
                value={p?.[`${price?.id}_c`]}
                onChange={e => setP({...p, [`${price?.id}_c`]: e.currentTarget.value})}
                label="Цена"
              />
              <Button mt={16} onClick={() => createPrice(price)}>Добавить цену</Button>
            </section>
            <section className="mt-10 space-y-4">
              {price?.expand?.prices?.map((p, i) => {
                return (
                  <div className="flex gap-4 w-full" key={i}>
                    <PriceCard price={p} key={i} />
                    <CiCircleRemove
                      size={35}
                      color="red"
                      onClick={() => removePriceConfrim(p?.id)}
                      className="cursor-pointer hover:fill-yellow-500"
                    />
                  </div>
                );
              })}
            </section>
  
          </div>
        )
      })}
       <section>
        <TextInput
          label="Заголовок"
          value={changedHeadings?.q1 ?? ""}
          onChange={(e) => handleAboutChange(e, "heading")}
          name="q1"
        />
        <TextInput
          label="Текст1"
          value={changedText?.q1 ?? ""}
          onChange={(e) => handleAboutChange(e, "text")}
          name="q1"
        />
        <TextInput
          label="Текст2"
          value={changedText?.q2 ?? ""}
          onChange={(e) => handleAboutChange(e, "text")}
          name="q2"
        />
        <TextInput
          label="Текст3"
          value={changedText?.q3 ?? ""}
          onChange={(e) => handleAboutChange(e, "text")}
          name="q3"
        />
        <TextInput
          label="Текст3"
          value={changedText?.q4 ?? ""}
          onChange={(e) => handleAboutChange(e, "text")}
          name="q4"
        />
        <Button 
          onClick={saveAbout}
        >
          Сохранить
        </Button>
      </section>
    </div>
  );
}
