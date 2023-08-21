import React from "react";
import { Button, Modal, TextInput, Textarea, FileInput, ActionIcon } from "@mantine/core";
import { pb } from "shared/api";
import { PartnersCard } from "shared/ui/PartnersCard";


import { FiEdit } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'
import { openConfirmModal } from "@mantine/modals";
import { Image } from "shared/ui";
import { AiOutlineDelete } from "react-icons/ai";


async function getPartners () {
  return await pb.collection('partners').getFullList()
}

export const Partners = () => {

  const [partners, setPartners] = React.useState([]);
  const [partner, setPartner] = React.useState({})
  const [images, setImages] = React.useState([])

  const [editModal, setEditModal] = React.useState(false)

  async function handlePartners () {
    await getPartners()
    .then(res => {
      setPartners(res)
    })
  }

  React.useEffect(() => {
    handlePartners()

    pb.collection('partners').subscribe('*', function () {
      handlePartners()
    })

    return () => {
      pb.collection('partners').unsubscribe('*')
    }
  }, [])

  React.useEffect(() => {
    let imgs = {}
    for (const key in partner) {
      if (!isNaN(key)) {
        imgs = {
          ...imgs,
          [key]: partner?.[key]
        }
      }
    }
    setImages(imgs)
  }, [partner])

  async function deletePartner (partnerId) {
    await pb.collection('partners').delete(partnerId)
  }

  const confirmDelete = (partnerId) => openConfirmModal({
    title: 'Подтвердите действие',
    centered: true,
    labels: {confirm: 'Удалить', cancel: 'Отмена'},
    onConfirm: () => deletePartner(partnerId)
  })

  function openEditModal (val) {
    setPartner(val)
    setEditModal(true)
  }

  function closeModal () {
    setPartner({})
    setEditModal(false)
  } 

  function handlePartnerChange (e) {
    const { value, name } = e?.currentTarget
    setPartner({...partner, [name]: value}) 
  }

  const [partnersGet, setPartnersGet] = React.useState([]);
  const [changedHeadings, setChangedHeadings] = React.useState({});
  const [changedImages, setChangedImages] = React.useState({});
  const [changedText, setChangedText] = React.useState({});

  // async function savePartners() {
  //   for (const index in changedImages) {
  //     if (!isNaN(index)) {
  //       if (changedImages?.[index] instanceof File) {
  //         const formData = new FormData();
  //         formData.append([`${index}`], changedImages?.[index]);
  //         await pb
  //           .collection("images")
  //           .update(partners?.images?.id, formData)
  //           .then((res) => {
  //             console.log(res);
  //           });
  //       }
  //     }
  //   }

  //   await pb.collection("text").update(partners?.text?.id, {
  //     headings: changedHeadings,
  //     text: changedText,
  //   });
  // }

  // async function getPartnersTest() {
  //   return await pb.collection("partners").getList(1, 50);
  // }

  // React.useEffect(() => {
  //   getPartnersTest().then((res) => {
  //     setPartnersGet(res);
  //     console.log(res);
  //   });
  // }, []);

  function handleImagesChange(val, index) {
    setImages({ ...images, [`${index}`]: val });
  }

  function handleImageDelete(index) {
    setImages({ ...images, [index]: "" });
  }

  return (
    <>
      <div className="w-full">
        <Button>Создать бизнес-партнера</Button>

        <div className="grid grid-cols-4 gap-5">
          {partners?.map((partner, i) => {
            return (
              <div key={i}>
                <PartnersCard partner={partner} />
                <div className="flex gap-4 mt-2 justify-center">
                  <FiEdit
                    size={30}
                    color="teal"
                    onClick={() => openEditModal(partner)}
                  />
                  <MdDeleteForever
                    size={30}
                    color="red"
                    onClick={() => confirmDelete(partner?.id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <Modal
          opened={editModal}
          onClose={closeModal}
          title="Редактирование"
          centered
        >
          <div className="space-y-4">
            <TextInput name="name" onChange={handlePartnerChange} label="Имя" />
            <Textarea
              name="description"
              onChange={handlePartnerChange}
              label="Описание"
            />
            <div>
              <Image
                label='Фото 1'
                onChange={handleImagesChange}
                onDelete={handleImageDelete}
                image={images?.[1]}
                index={1}
                record={partner}
              />
              <Image
                label='Фото 2'
                onChange={handleImagesChange}
                onDelete={handleImageDelete}
                image={images?.[2]}
                index={2}
                record={partner}
              />
              <Image
                label='Фото 1'
                onChange={handleImagesChange}
                onDelete={handleImageDelete}
                image={images?.[3]}
                index={3}
                record={partner}
              />
              <Image
                label='Фото 1'
                onChange={handleImagesChange}
                onDelete={handleImageDelete}
                image={images?.[4]}
                index={4}
                record={partner}
              />
            </div>
            <Button>Сохранить</Button>
          </div>
        </Modal>
      </div>
    </>
  );
};


      {/* <div className="grid grid-cols-3 gap-6">
        {partnersGet?.items?.map((partner) => (
          <PartnersCard
            setPartners={setPartners}
            setChangedHeadings={setChangedHeadings}
            setChangedImages={setChangedImages}
            setChangedText={setChangedText}
            changedHeadings={changedHeadings}
            partner={partner}
            changedText={changedText}
            changedImages={changedImages}
          />
        ))}
      </div>
    <Button className="mt-10" size="lg" fullWidth onClick={savePartners}>
      Сохранить
    </Button> */}