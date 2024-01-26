import React from 'react';
import { Tree } from 'react-d3-tree';

import { Button, Table, TextInput, Textarea } from '@mantine/core'
import { getData, pb } from 'shared/api'
import { Image } from 'shared/ui'
import { DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { AiFillCheckCircle, AiFillLock } from 'react-icons/ai';

export const HomeKz = () => {

  const [foundUsers, setFoundUsers] = React.useState([])

  const notVerifiedUsers = foundUsers.filter(q => q?.verified !== true)
  const verifiedUsers = foundUsers.filter(q => q?.verified == true)

  const [date, setDate] = React.useState({
    from: new Date (),
    to: new Date()
  })

  function handleDateChange (e, name) {
    setDate({...date, [name]: e})
  }

  async function searchUsers () {
    await pb.collection('users').getFullList({
      filter: `created >= '${date?.from.toISOString()}' && created <= '${date?.to.toISOString()}'`
    })
    .then(res => {
      console.log(res, 'res');
      setFoundUsers(res)
    })
  }

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
    getData('stats').then(res => {
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

  return (
    <div className='w-full'>
      <TextInput 
        label='Главный заголовок'
        value={changedHeadings?.[1] ?? ''}
        onChange={(e) => handleAboutChange(e, 'heading')}
        name='1'
      />
      <div className='grid grid-cols-3 gap-8'>
        <Textarea 
          label='Данные'
          value={changedText?.[1] ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='1'
          autosize
        />
        <Textarea 
          label='Данные'
          value={changedText?.[2] ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='2'
          autosize
        />
        <Textarea 
          label='Данные'
          value={changedText?.[3] ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='3'
          autosize
        />
      </div>
      <div className='grid grid-cols-3 gap-8'>
        <Textarea 
          label='Описание'
          value={changedText?.[4] ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='4'
          autosize
        />
        <Textarea 
          label='Описание'
          value={changedText?.[5] ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='5'
          autosize
        />
        <Textarea 
          label='Описание'
          value={changedText?.[6] ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='6'
          autosize
        />
      </div>
      <div className='mt-10'>
        <TextInput 
          label='Заголовок'
          value={changedHeadings?.[2] ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='2'
        />
        <div>
        <Textarea 
          label='Текст'
          value={changedText?.z1 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='z1'
          autosize
        />        
        {/* <Textarea 
          label='Текст'
          value={changedText?.z2 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='z2'
          autosize
        />        
        <Textarea 
          label='Текст'
          value={changedText?.z3 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='z3'
          autosize
        /> */}
        </div>
      </div>
      <Button
        className='mt-5'
        onClick={saveAbout}
      >
        Сохранить
      </Button>
      <div className='flex gap-4 items-end mt-8'>
        <DatePickerInput
          value={date?.from}
          name='from'
          onChange={e => handleDateChange(e, 'from')}
          label='От'
          locale='ru'
        />
        <DatePickerInput
          value={date?.to}
          name='to'
          onChange={e => handleDateChange(e, 'to')}
          label='До'
          locale='ru'
        />
        <Button onClick={searchUsers}>
          Показать
        </Button>
        <div className='mt-4'>
          Зарегистрировано: {foundUsers?.length}
        </div>
        <div className='mt-4'>
          Не верифицировано: {notVerifiedUsers?.length}
        </div>
        <div className='mt-4'>
          Верифицировано: {verifiedUsers?.length}
        </div>
      </div>
      {foundUsers?.length !== 0 && (
        <div className='mt-5'>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th></th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Бинар</th>
                <th>Уровень</th>
                <th>Баланс</th>
                <th>Почта</th>
                <th>Телефон</th>
                <th>Область</th>
                <th>Адрес</th>
                <th>Спонсор</th>
                <th>Дата регистрации</th>
              </tr>
            </thead>
            <tbody>
              {foundUsers?.map((user, i) => {
                return (
                  <tr
                    key={i}
                  >
                    <td>{user.id}</td>
                    <td>
                      {user?.verified ? (
                        <Button compact variant={"subtle"} color={"green"}>
                          <AiFillCheckCircle size={20} />
                        </Button>
                      ) : (
                        <Button
                          compact
                          variant={"subtle"}
                          color="yellow"
                        >
                          <AiFillLock size={20} />
                        </Button>
                      )}
                    </td>
                    <td>{user.name}</td>
                    <td>{user.surname}</td>
                    <td>{user.bin ? "Да" : "Нет"}</td>
                    <td>
                      {user?.level 
                      ? (user?.level === '4.1' && '4.Путевка' || 
                        user?.level === '4.2' && '4.Курса' || user?.level)
                      : !user?.level && 0}
                    </td>
                    <td>{user.balance}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.region}</td>
                    <td>{user.adress}</td>
                    <td>{user.sponsor}</td>
                    <td>{dayjs(user.created).format(`DD.MM.YY`)}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
      
    </div>
  );
};