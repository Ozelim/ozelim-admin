import React from 'react';
import { Tree } from 'react-d3-tree';

import { Button, Table, TextInput, Textarea } from '@mantine/core'
import { getData, pb } from 'shared/api'
import { Image } from 'shared/ui'
import { DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { AiFillCheckCircle, AiFillLock } from 'react-icons/ai';
import { showNotification } from '@mantine/notifications';

async function getDogs () {
  return await pb.collection('dogs').getFullList()
}

async function getServices () {
  return await pb.collection('home_data').getFullList()
}

export const Home = () => {

  const [foundUsers, setFoundUsers] = React.useState([])

  const notVerifiedUsers = foundUsers.filter(q => q?.verified !== true)
  const verifiedUsers = foundUsers.filter(q => q?.verified == true)

  const [date, setDate] = React.useState({
    from: new Date (),
    to: new Date()
  })


  const [dogs, setDogs] = React.useState({})
  const [dog, setDog] = React.useState('')

  const [services, setServices] = React.useState({})
  const [service, setService] = React.useState('')

  React.useEffect(() => {
    getDogs()
    .then(res => {
      setDogs(res?.[0])
    })

    getServices()
    .then(res => {
      setServices(res?.[0])
    })
  }, [])

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

  function handleImagesChange (val, index) {
    setChangedImages({...changedImages, [`${index}`]: val})
  }

  function handleImageDelete (index) {
    setChangedImages({...changedImages, [index]: ''})
  }

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
    
    const formData = new FormData()

    for (const index in changedImages) {
      if (!isNaN(index)) {
        formData.append([`${index}`], changedImages?.[index])
      }
    }
    await pb.collection('images').update(about?.images?.id, formData)
    .then(res => {
      showNotification({
        title: 'Изображение',
        message: 'Изожрабение загружено успешно!',
        color: 'green'
      })
      console.log(res);
    })
    .catch(err => {
      showNotification({
        title: 'Изображение',
        message: 'Не удалось загрузить изображение (возможно файл слишком тяжелый)',
        color: 'red'
      })
      console.log(err, 'err');
    })
    await pb.collection('text').update(about?.text?.id, {
      headings: changedHeadings, 
      text: changedText
    })
  }

  React.useEffect(() => {
    getData('home').then(res => {
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
      <div className='max-w-xl'>
        <TextInput 
          label='Главный заголовок'
          value={changedHeadings?.main ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='main'
        />
        <Textarea
          label='Описание'
          value={changedHeadings?.main2 ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='main2'
          autosize
        />

      </div>

      <div className='mt-8'>
        {/* <TextInput 
          label='Заголовок'
          value={changedHeadings?.[1] ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='1'
          className='max-w-xl '
        /> */}
        <div className='mt-8 grid grid-cols-3 gap-4'>
          <div>
          {/* <Image
              label={'Картинка'}
              onChange={handleImagesChange}
              record={about?.images}
              image={changedImages?.['1']}
              onDelete={handleImageDelete}
              index={1}
            />   */}
            <Textarea
              label='Описание'
              value={changedText?.[1] ?? ''}
              onChange={(e) => handleAboutChange(e, 'text')}
              name='1'
              autosize
            />
          </div>
          <div>
            {/* <Image
              label={'Картинка'}
              onChange={handleImagesChange}
              record={about?.images}
              image={changedImages?.['2']}
              onDelete={handleImageDelete}
              index={2}
            />   */}
            <Textarea
              label='Описание'
              value={changedText?.[2] ?? ''}
              onChange={(e) => handleAboutChange(e, 'text')}
              name='2'
              autosize
            />
          </div>
          <div>
            {/* <Image
              label={'Картинка'}
              onChange={handleImagesChange}
              record={about?.images}
              image={changedImages?.['3']}
              onDelete={handleImageDelete}
              index={3}
            />   */}
            <Textarea
              label='Описание'
              value={changedText?.[3] ?? ''}
              onChange={(e) => handleAboutChange(e, 'text')}
              name='3'
              autosize
            />
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <div className='grid grid-cols-2 gap-4'>
          {/* <Image
            label={'Картинка'}
            onChange={handleImagesChange}
            record={about?.images}
            image={changedImages?.['4']}
            onDelete={handleImageDelete}
            index={4}
          />   */}
          <TextInput 
            label='Заголовок'
            value={changedHeadings?.[2] ?? ''}
            onChange={(e) => handleAboutChange(e, 'heading')}
            name='2'
          />
        </div>
        <div className='grid grid-cols-5 gap-4 w-full'>
          <div>
          <TextInput 
            label='Заголовок'
            value={changedHeadings?.['z1'] ?? ''}
            onChange={(e) => handleAboutChange(e, 'heading')}
            name='z1'
          />
            <Textarea
              label='Описание'
              value={changedText?.[4] ?? ''}
              onChange={(e) => handleAboutChange(e, 'text')}
              name='4'
              autosize
            />
          </div>
          <div>
          <TextInput 
            label='Заголовок'
            value={changedHeadings?.['z2'] ?? ''}
            onChange={(e) => handleAboutChange(e, 'heading')}
            name='z2'
          />
            <Textarea
              label='Описание'
              value={changedText?.[5] ?? ''}
              onChange={(e) => handleAboutChange(e, 'text')}
              name='5'
              autosize
            />
          </div>
          <div>
          <TextInput 
            label='Заголовок'
            value={changedHeadings?.['z3'] ?? ''}
            onChange={(e) => handleAboutChange(e, 'heading')}
            name='z3'
          />
            <Textarea
              label='Описание'
              value={changedText?.[6] ?? ''}
              onChange={(e) => handleAboutChange(e, 'text')}
              name='6'
              autosize
            />
          </div>
          <div>
          <TextInput 
            label='Заголовок'
            value={changedHeadings?.['z4'] ?? ''}
            onChange={(e) => handleAboutChange(e, 'heading')}
            name='z4'
          />
            <Textarea
              label='Описание'
              value={changedText?.[7] ?? ''}
              onChange={(e) => handleAboutChange(e, 'text')}
              name='7'
              autosize
            />
          </div>
          <div>
          <TextInput 
            label='Заголовок'
            value={changedHeadings?.['z5'] ?? ''}
            onChange={(e) => handleAboutChange(e, 'heading')}
            name='z5'
          />
            <Textarea
              label='Описание'
              value={changedText?.[8] ?? ''}
              onChange={(e) => handleAboutChange(e, 'text')}
              name='8'
              autosize
            />
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='max-w-xl'>
          <TextInput 
            label='Заголовок'
            value={changedHeadings?.[3] ?? ''}
            onChange={(e) => handleAboutChange(e, 'heading')}
            name='3'
          />
          {/* <Image
            label={'Картинка'}
            onChange={handleImagesChange}
            record={about?.images}
            image={changedImages?.['5']}
            onDelete={handleImageDelete}
            index={5}
          /> */}
        </div>
        <div className='grid grid-cols-3 gap-4'>
          <Textarea
            label='Описание'
            value={changedText?.[9] ?? ''}
            onChange={(e) => handleAboutChange(e, 'text')}
            name='9'
            autosize
          />
          <Textarea
            label='Описание'
            value={changedText?.[10] ?? ''}
            onChange={(e) => handleAboutChange(e, 'text')}
            name='10'
            autosize
          />
          <Textarea
            label='Описание'
            value={changedText?.[11] ?? ''}
            onChange={(e) => handleAboutChange(e, 'text')}
            name='11'
            autosize
          />
        </div>
      </div>

      <section className="grid grid-cols-2 gap-4">
        <Image
          className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0 rounded-primary max-h-96 object-cover"
          label={"Картинка"}
          onChange={handleImagesChange}
          record={about?.images}
          image={changedImages?.["9"]}
          onDelete={handleImageDelete}
          index={9}
        />
        <div>
          <Textarea
            label="Заголовок"
            value={changedHeadings?.x1 ?? ""}
            onChange={(e) => handleAboutChange(e, "heading")}
            name="x1"
            autosize
          />
          <Textarea
            label="текст"
            value={changedText?.x1 ?? ""}
            onChange={(e) => handleAboutChange(e, "text")}
            name="x1"
            autosize
          />
        </div>
      </section>
      <div className='max-w-xl mt-8'>
        <TextInput 
          label='Заголовок'
          value={changedHeadings?.[4] ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='4'
        />
        <TextInput 
          label='Подзаголовок'
          value={changedHeadings?.[5] ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='5'
        />
        <Textarea
          label='Описание'
          value={changedText?.[17] ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='17'
          autosize
        />
        <Textarea
          label='Описание'
          value={changedText?.[18] ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='18'
          autosize
        />
        <Textarea
          label='Описание'
          value={changedText?.[19] ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='19'
          autosize
        />
      </div>

      <div className='max-w-xl mt-8'>
        <TextInput 
          label='Подзаголовок'
          value={changedHeadings?.[6] ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='6'
        />
        <Textarea
          label='Описание'
          value={changedText?.[20] ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='20'
          autosize
        />
        <Textarea
          label='Описание'
          value={changedText?.[21] ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='21'
          autosize
        />
        <Textarea
          label='Описание'
          value={changedText?.[22] ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='22'
          autosize
        />
      </div>
      <div className='max-w-xl mt-8'>

        <TextInput 
          label='Заголовок'
          value={changedHeadings?.[7] ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='7'
        />
        <Textarea
          label='Описание'
          value={changedText?.[23] ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='23'
          autosize
          className='max-w-xl mt-8'
        />
      </div>

      <div className='max-w-xl mt-8'>
        <TextInput 
          label='Заголовок'
          value={changedHeadings?.[8] ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='8'
        />
        <Textarea
          label='Описание'
          value={changedText?.[24] ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='24'
          autosize
        />
      </div>

      <Button
        className='mt-5'
        onClick={saveAbout}
      >
        Сохранить
      </Button>
      <div className='grid grid-cols-2'>

        <div className='max-w-xl mt-4'>
          <p>Региональный директор</p>
          <TextInput
            label='Имя'
            value={dog}
            onChange={e => setDog(e.currentTarget.value)}
          />
          <Button
            onClick={async () => {
              await pb.collection('dogs').update(dogs?.id, {
                dogs: [...dogs?.dogs ?? [], dog]
              })
              .then(async () => {
                getDogs()
                .then(res => {
                  setDogs(res?.[0])
                })
              })
            }}
            className='mt-2'
          >
            Добавить
          </Button>
          <div className='mt-4'>
            <p>Региональный директоры</p>
            <div className='mt-4'>
              {dogs?.dogs?.map((q, i) => {
                return (
                  <div key={i} className='grid grid-cols-[70%_auto]'>
                    {q}
                    <Button
                      variant='subtle'
                      compact
                      onClick={async () => {
                        const newDogs = dogs?.dogs?.filter(w => {return w !== q})
                        await pb.collection('dogs').update(dogs?.id, {
                          dogs: [...newDogs]
                        })
                        .then(async () => {
                          getDogs()
                          .then(res => {
                            setDogs(res?.[0])
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

        <div className='max-w-xl mt-4'>
          <p>Услуга</p>
          <TextInput
            label='Название'
            value={service}
            onChange={e => setService(e.currentTarget.value)}
          />
          <Button
            onClick={async () => {
              await pb.collection('home_data').update(services?.id, {
                services: [...services?.services ?? [], service]
              })
              .then(async () => {
                getServices()
                .then(res => {
                  setServices(res?.[0])
                })
              })
            }}
            className='mt-2'
          >
            Добавить
          </Button>
          <div className='mt-4'>
            <p>Услуги</p>
            <div className='mt-4'>
              {services?.services?.map((q, i) => {
                return (
                  <div key={i} className='grid grid-cols-[70%_auto]'>
                    {q}
                    <Button
                      variant='subtle'
                      compact
                      onClick={async () => {
                        const newDogs = services?.services?.filter(w => {return w !== q})
                        await pb.collection('home_data').update(services?.id, {
                          services: [...newDogs]
                        })
                        .then(async () => {
                          getServices()
                          .then(res => {
                            setServices(res?.[0])
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
      <div className='mt-8'>
        <div>
          <div className='flex gap-4 items-end'>
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
      </div>
    </div>
  );
};