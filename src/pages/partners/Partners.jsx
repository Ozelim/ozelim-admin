import React from "react";
import { Button, Modal, TextInput, Textarea, FileInput, ActionIcon } from "@mantine/core";
import { pb } from "shared/api";
import { PartnersCard } from "shared/ui/PartnersCard";


import { FiEdit } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'
import { openConfirmModal } from "@mantine/modals";
import { Image } from "shared/ui";
import { AiOutlineDelete } from "react-icons/ai";
import { useModals } from "shared/hooks";
import { getExtension, getImageUrl } from "shared/lib";


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
    // let imgs = {}
    // for (const key in partner) {
    //   if (!isNaN(key)) {
    //     imgs = {
    //       ...imgs,
    //       [key]: partner?.[key]
    //     }
    //   }
    // }
    // setImages(imgs)
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
    let imgs = {}
      for (const index in val) {
        if (!isNaN(index)) {
          imgs = {
            ...imgs,
            [index]: val?.[index]
          }

        }
      }
    setImages(imgs)
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

  function handleImagesChange(val, index) {
    setImages({ ...images, [`${index}`]: val });
  }

  function handlePdfChange(val) {
    setPartner({ ...partner, pdf: val });
  }

  function handleImageDelete(index) {
    setImages({ ...images, [index]: null});
  }

  async function savePartner () {
    const formData = new FormData();      
    formData.append('name', partner.name)
    formData.append('description', partner.description)

    if (partner?.id) {
      console.log(images);
      await pb
        .collection("partners")
        .update(partner?.id, {
          description: partner.description,
          name: partner.name,
        })
        .then(async (res) => {
          formData.append("pdf", partner?.pdf);
          if (partner?.pdf) {
            await pb.collection("partners").update(res.id, formData);
          }

          for (const index in images) {
            if (!isNaN(index)) {
              if (images?.[index] == null) {
                await pb
                  .collection("partners")
                  .update(res.id, {
                    [index]: null 
                  })
                  .then((res) => {
                    console.log(res);
                  });
              }
                if (images?.[index] instanceof File) {
                  formData.append([`${index}`], images?.[index]);
                  await pb
                    .collection("partners")
                    .update(res.id, formData)
                    .then((res) => {
                      console.log(res);
                    });
                }
            }
          }
        });

        setEditModal(false)
        
      return
    }

    await pb.collection('partners').create({
      description: partner.description,
      name: partner.name
    })
    .then(async (res) => {
      formData.append("pdf", partner?.pdf);
      if (partner?.pdf) {
        await pb.collection("partners").update(res.id, formData);
      }

      for (const index in images) {
        if (!isNaN(index)) {
          if (images?.[index] instanceof File) {
            formData.append([`${index}`], images?.[index]);
            await pb
              .collection("partners")
              .update(res.id, formData)
              .then((res) => {
                console.log(res);
              });
          }
        }
      }
      setEditModal(false);
    });

  } 

  const [viewModal, setViewModal] = React.useState(false)

  function view (val) {
    setPartner(val)
    setViewModal(true)
  }

  return (
    <>
      <div className="w-full">
        <Button
          onClick={() => {
            setEditModal(true)
            setPartner({
              name: '',
              description: '',
              pdf: null,
            })
            setImages({})
          }}
        >
          Создать бизнес-партнера
        </Button>

        <div className="grid grid-cols-4 gap-5 mt-5">
          {partners?.map((partner, i) => {
            return (
              <div key={i}>
                <PartnersCard 
                  partner={partner}
                  viewPdf={view}
                />
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
      </div>
      <Modal
        opened={editModal}
        onClose={closeModal}
        title="Редактирование"
        centered
      >
        <ParntnersForm
          partner={partner}
          handlePartnerChange={handlePartnerChange}
          handleImagesChange={handleImagesChange}
          handleImageDelete={handleImageDelete}
          handlePdfChange={handlePdfChange}
          images={images}
        />
        <Button
          onClick={savePartner}
        >
          Сохранить
        </Button>
      </Modal>
      <Modal
        opened={viewModal}
        onClose={() => setViewModal(false)}
        size='50%'
        centered
      >
        {getExtension(partner?.pdf) === 'pdf' ?
          <iframe
            className='w-full h-screen' 
            src={getImageUrl(partner, partner?.pdf)} frameborder="0"
          />
          : <img src={getImageUrl(partner, partner?.pdf)} alt="" className='w-full h-auto' />
        }
      </Modal>
    </>
  );
};

const ParntnersForm = ({
  partner,
  handlePartnerChange,
  handleImagesChange,
  handleImageDelete,
  images,
  handlePdfChange
}) => {
    return (
      <div className="space-y-4">
        <TextInput
          name="name"
          onChange={handlePartnerChange}
          label="Имя"
          value={partner?.name ?? ''}
        />
        <Textarea
          name="description"
          onChange={handlePartnerChange}
          label="Описание"
          value={partner?.description ?? ''}
        />
        <div>
          {Array(4)
            .fill(1)
            .map((_, i) => {
              const index = i + 1;

              return (
                <Image
                  label={`Фото ${index}`}
                  onChange={handleImagesChange}
                  onDelete={handleImageDelete}
                  image={images?.[index]}
                  index={index}
                  record={partner}
                  key={index}
                />
              );
            })}
        </div>
        <FileInput
          onChange={(e) => handlePdfChange(e)}
          name="pdf"
          label="Файл (pdf)"
        />
      </div>
    );
}


