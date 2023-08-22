import React from "react";
import { Button, Modal, TextInput, Textarea } from "@mantine/core";
import { pb } from "shared/api";
import { TeamCard } from "shared/ui/TeamCard";
import { Image } from "shared/ui";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { openConfirmModal } from "@mantine/modals";

async function getOurTeam() {
  return await pb.collection("members").getFullList();
}

export const OurTeam = () => {

  const [ourTeam, setOurTeam] = React.useState([]);

  const [member, setMember] = React.useState({
    name: '',
    description: '',
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

  return (
    <>
      <div className="w-full">
        <Button
          onClick={e => setModal(true)}
        >
          Добавить участника
        </Button>
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
      <Modal
        opened={modal}
        onClose={e => {
          setModal(false)
          setMember({
            name: '',
            description: '',
            image: null,
          })
        }}
        centered
      >
        <div className="space-y-4">
          <MemberForm
            member={member}
            onChange={handleMemberChange}
            onImageChange={handleMemberChange}
            onImageDelete={() => setMember({...member, image: null})}
          />
          <Button
            onClick={createMember}
            fullWidth
          >
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
    </div>
  )
}