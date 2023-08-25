import React from 'react'
import { Button, Textarea, TextInput } from '@mantine/core';
import { getData, pb } from 'shared/api';
import { PriceCard } from 'widgets';
import { Image } from 'shared/ui';
import { CiCircleRemove } from 'react-icons/ci';
import { openConfirmModal } from '@mantine/modals';

async function getPs () {
  return await pb.collection('price').getFullList()
}

export const Price = () => {

  const [price, setPrice] = React.useState({});

  const [images, setImages] = React.useState({});
  const [changedImages, setChangedImages] = React.useState({});

  const [headings, setHeadings] = React.useState({});
  const [text, setText] = React.useState({});

  const [changedHeadings, setChangedHeadings] = React.useState({});
  const [changedText, setChangedText] = React.useState({});

  function handlePriceChange(val, type) {
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

  async function savePrice() {
    for (const index in changedImages) {
      if (!isNaN(index)) {
        if (changedImages?.[index] instanceof File) {
          const formData = new FormData();
          formData.append([`${index}`], changedImages?.[index]);
          await pb
            .collection("images")
            .update(price?.images?.id, formData)
            .then((res) => {
              console.log(res);
            });
        }
      }
    }
    await pb.collection("text").update(price?.text?.id, {
      headings: changedHeadings,
      text: changedText,
    });
  }

  React.useEffect(() => {
    getData("price").then((res) => {
      setPrice(res);
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

  const [p, setP] = React.useState({
    title: '',
    cost: '',
  })

  const [ps, setPs] = React.useState([])

  function handlePChange (e) {
    const { value, name } = e?.currentTarget
    setP({...p, [name]: value})
  }

  async function createPrice () {
    await pb.collection('price').create(p)
    .then(() => {
      setP({
        title: '',
        cost: ''
      })
    })
  }

  React.useEffect(() => {
    getPs()
    .then(res => {
      setPs(res)
    })

    pb.collection('price').subscribe('*', function () {
      getPs().then((res) => {
        setPs(res);
      });
    })
  }, [])

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
      .collection("price")
      .delete(priceId)
  }
 
  return (
    <div className="w-full">
      <section>
        <Image
          label={"Картинка"}
          onChange={handleImagesChange}
          record={price?.images}
          image={changedImages?.["1"]}
          onDelete={handleImageDelete}
          index={1}
        />
        <TextInput
          label="Главный заголовок"
          value={changedHeadings?.[1] ?? ""}
          onChange={(e) => handlePriceChange(e, "heading")}
          name="1"
        />
        <TextInput
          label="Текст"
          value={changedText?.[1] ?? ""}
          onChange={(e) => handlePriceChange(e, "text")}
          name="1"
        />
        <TextInput
          label="Текст"
          value={changedText?.[2] ?? ""}
          onChange={(e) => handlePriceChange(e, "text")}
          name="2"
        />
        <TextInput
          label="Текст"
          value={changedText?.[3] ?? ""}
          onChange={(e) => handlePriceChange(e, "text")}
          name="3"
        />
        <TextInput
          label="Текст"
          value={changedText?.[4] ?? ""}
          onChange={(e) => handlePriceChange(e, "text")}
          name="4"
        />
        <Button onClick={savePrice}>Сохранить</Button>
      </section>
      <section className="mt-10">
        <TextInput
          value={p?.title}
          onChange={handlePChange}
          label="Описание"
          name="title"
        />
        <TextInput
          value={p?.cost}
          onChange={handlePChange}
          label="Цена"
          name="cost"
        />
        <Button onClick={createPrice}>Добавить цену</Button>
      </section>
      <section className="mt-10 space-y-4">
        {ps?.map((p, i) => {
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
  );
}
