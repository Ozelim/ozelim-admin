import React from "react";
import { Button, Modal, TextInput, Textarea } from "@mantine/core";
import { getData, pb } from "shared/api";
import { TeamCard } from "shared/ui/TeamCard";
import { Image } from "shared/ui";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { openConfirmModal } from "@mantine/modals";

async function getOurTeam() {
  return await pb.collection("members").getFullList();
}

export const OurTeamKz = () => {

  const [ourTeam, setOurTeam] = React.useState([]);

  const [member, setMember] = React.useState({
    name: '',
    description: '',
    link: '',
    image: null,
  })

  const [modal, setModal] = React.useState(false)

  function openEditModal (val) {
    setMember(val)
    setModal(true)
  }

  async function deletePartner (memberId) {
    await pb.collection('members').delete(memberId)
  }

  const confirmDelete = (memberId) => openConfirmModal({
    title: 'Подтвердите действие',
    centered: true,
    labels: {confirm: 'Удалить', cancel: 'Отмена'},
    onConfirm: () => deletePartner(memberId)
  })

  function handleMemberChange (e, name) {
    if (e?.currentTarget) {
      const {value, name} = e?.currentTarget
      setMember({...member, [name]: value})
      return
    } 
    setMember({...member, [name]: e})
  }

  async function createMember (id) {
    const formData = new FormData()
    formData.append('name', member.name)
    formData.append('description', member.description)
    formData.append('link', member.link)
    if (member?.image) {
      formData.append('image', member.image)
    }

    if (member?.id) {
      await pb.collection('members').update(member?.id, formData)
      .then(() => {
        setModal(false)
      })
      return
    }
    await pb.collection('members').create(formData)
    .then(() => {
      setModal(false)
    })
  }
  
  React.useEffect(() => {
    getOurTeam()
    .then((res) => {
      setOurTeam(res);
    });

    pb.collection('members').subscribe('*', function () {
      getOurTeam()
      .then((res) => {
        setOurTeam(res);
      });
    })
  }, []);

    const [team, setTeam] = React.useState({});

    const [images, setImages] = React.useState({});
    const [changedImages, setChangedImages] = React.useState({});

    const [headings, setHeadings] = React.useState({});
    const [text, setText] = React.useState({});

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

    async function saveTeam() {
      for (const index in changedImages) {
        if (!isNaN(index)) {
          if (changedImages?.[index] instanceof File) {
            const formData = new FormData();
            formData.append([`${index}`], changedImages?.[index]);
            await pb
              .collection("images")
              .update(team?.images?.id, formData)
              .then((res) => {
                console.log(res);
              });
          }
        }
      }

      await pb.collection("text").update(team?.text?.id, {
        headings: changedHeadings,
        text: changedText,
      });
    }

    React.useEffect(() => {
      getData("team").then((res) => {
        setTeam(res);
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
      <div className="w-full">
        <section>
          {/* <TextInput
            label="Главный заголовок"
            value={changedHeadings?.heading ?? ""}
            onChange={(e) => handleHealthChange(e, "heading")}
            name="heading"
          /> */}
          <div className="flex">
            <Image
              className="ml-10 w-2/4"
              label={"Картинка"}
              onChange={handleImagesChange}
              record={team?.images}
              image={changedImages?.["1"]}
              onDelete={handleImageDelete}
              index={1}
            />
            <div className="w-2/4 ml-auto">
              <TextInput
                label="Заголовок"
                value={changedHeadings?.main ?? ""}
                onChange={(e) => handleHealthChange(e, "heading")}
                name="main"
              />
              <Textarea
                label="Под заголовок"
                value={changedHeadings?.submain ?? ""}
                onChange={(e) => handleHealthChange(e, "heading")}
                name="submain"
                autosize
              />
              <Textarea
                label="текст"
                value={changedText?.text1 ?? ""}
                onChange={(e) => handleHealthChange(e, "text")}
                name="text1"
                autosize
              />
              <Textarea
                label="текст"
                value={changedText?.text2 ?? ""}
                onChange={(e) => handleHealthChange(e, "text")}
                name="text2"
                autosize
              />
              <Textarea
                label="текст"
                value={changedText?.text3 ?? ""}
                onChange={(e) => handleHealthChange(e, "text")}
                name="text3"
                autosize
              />
              <Textarea
                label="текст"
                value={changedText?.text4 ?? ""}
                onChange={(e) => handleHealthChange(e, "text")}
                name="text4"
                autosize
              />
            </div>
          </div>
        </section>
        <div className="flex justify-center mb-10">
          <Button className="mt-10" onClick={saveTeam}>
            Сохранить
          </Button>
        </div>
        <div>
          <Button onClick={(e) => setModal(true)}>Добавить участника</Button>
          <div className="grid grid-cols-3 gap-6 mt-4">
            {ourTeam?.map((team, i) => (
              <div key={i}>
                <TeamCard team={team} key={team.id} />
                <div className="flex gap-4 mt-2 justify-center">
                  <FiEdit
                    size={30}
                    color="teal"
                    onClick={() => openEditModal(team)}
                  />
                  <MdDeleteForever
                    size={30}
                    color="red"
                    onClick={() => confirmDelete(team?.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        opened={modal}
        onClose={(e) => {
          setModal(false);
          setMember({
            name: "",
            description: "",
            image: null,
            link: ''
          });
        }}
        centered
      >
        <div className="space-y-4">
          <MemberForm
            member={member}
            onChange={handleMemberChange}
            onImageChange={handleMemberChange}
            onImageDelete={() => setMember({ ...member, image: null })}
          />
          <Button onClick={createMember} fullWidth>
            Сохранить
          </Button>
        </div>
      </Modal>
    </>
  );
};

const MemberForm = ({
  member, 
  onChange, 
  onImageChange, 
  onImageDelete, 
}) => {
  return (
    <div className="">
      <TextInput
        value={member?.name}
        onChange={onChange}
        name="name"
        label='Имя'
      />
      <Textarea
        value={member?.description}
        onChange={onChange}
        name="description"
        label='Описание'
      />
      <Image
        label={'Фото'}
        index='image'
        image={member?.image}
        onChange={onImageChange}
        onDelete={onImageDelete}
        record={member}
      />
      <TextInput
        value={member?.link}
        onChange={onChange}
        name="link"
        label='Ссылка'
      />
    </div>
  )
}