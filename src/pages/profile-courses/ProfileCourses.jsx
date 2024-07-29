import React from 'react'
import { Button, FileButton, Tabs, TextInput, Textarea } from '@mantine/core'
import { pb } from 'shared/api'
import { getImageUrl } from 'shared/lib'

async function getCourses () {
  return await pb.collection('profile_courses').getFullList()
}

async function getTests () {
  return await pb.collection('tester').getFullList()
}

export const ProfileCourses = () => {

  const [tests, setTests] = React.useState([])

  const [courses, setCourses] = React.useState([])

  const [edit, setEdit] = React.useState({})

  const [createdCourse, setCreatedCourse] = React.useState({
    name: '',
    description: '',
    img: null,
  })

  const [editCourse, setEditCourse] = React.useState({})

  const [createdLesson, setCreatedLesson] = React.useState({
    name: '',
    description: '',
    link: ''
  })

  async function handleCourses () {
    await getCourses()
    .then(res => {
      setCourses(res)
    })
  }

  React.useEffect(() => {
    handleCourses()

    getTests()
    .then(res => {
      setTests(res)
    })
    
    pb.collection('profile_courses').subscribe('*', () => {
      handleCourses()
    })
  }, [])

  async function createCourse () {
    const formData = new FormData()
    formData.append('name', createdCourse?.name)
    formData.append('description', createdCourse?.description)
    formData.append('img', createdCourse?.img)
    await pb.collection('profile_courses').create(formData)
  }

  async function createLesson (course) {
    await pb.collection('profile_courses').update(course?.id, {
      lessons: [...course?.lessons ?? [], {...createdLesson, id: crypto.randomUUID()}]
    })
  }

  function handleLessonChange (e) {
    setEdit({...edit, [e.currentTarget?.name]: e.currentTarget?.value })
  }

  async function saveLesson (c) {

    const less = c?.lessons?.map(w => w?.id === edit?.id ? edit : w)

    await pb.collection('profile_courses').update(c?.id, {
      lessons: [...less]
    })
    .then(() => {
      setEdit(null)
    })
  }

  return (
    <Tabs>
      <Tabs.List>
        <Tabs.Tab value='create'>
          Создать курс
        </Tabs.Tab>
        {courses.map((c, i) => {
          return (
            <Tabs.Tab value={c?.id} key={i}>
              {c?.name}
            </Tabs.Tab>
          )
        })}
      </Tabs.List>
      <Tabs.Panel value='create'>
        <div className='grid grid-cols-[448px_auto] gap-8'>
          <div className='max-w-md flex flex-col space-y-4'>
            <TextInput
              label='Название курса'
              value={createdCourse.name}
              onChange={e => setCreatedCourse({...createdCourse, name: e.currentTarget.value})}
            />
            <TextInput
              label='Описание'
              value={createdCourse.description}
              onChange={e => setCreatedCourse({...createdCourse, description: e.currentTarget.value})}
            />
            <FileButton onChange={e => setCreatedCourse({...createdCourse, img: e})} accept="image/png,image/jpeg">
              {(props) => <Button className='max-w-min' {...props}>Загрузить картинку</Button>}
            </FileButton>
            <Button 
              className='mt-4'
              onClick={createCourse}
            >
              Создать курс
            </Button>
          </div>
          <div className='max-w-[278px] space-y-4'>
            <img 
              src={createdCourse.img ? URL.createObjectURL(createdCourse.img) : ''} alt="" 
              className='aspect-square object-cover'
            />
            <p className='font-bold text-xl'>
              {createdCourse.name}
              
            </p>
            <p className='text-lg'>
              {createdCourse.description}
              
            </p>
          </div>
        </div>
      </Tabs.Panel>
      {courses.map((c) => {
        return (
          <Tabs.Panel value={c?.id} key={c?.id}>
            <div className='grid grid-cols-[30%_auto] mt-8'>
              <div className='max-w-[278px] space-y-4'>
                {editCourse?.id === c?.id ?
                  <>
                    <img 
                      src={editCourse?.img instanceof File ? URL.createObjectURL(editCourse?.img) : ''} alt="" 
                      className='aspect-square object-cover'
                    />
                    <FileButton onChange={e => setEditCourse({...editCourse, img: e})} accept="image/png,image/jpeg">
                      {(props) => <Button compact {...props}>Загрузить изображение</Button>}
                    </FileButton>
                    <TextInput
                      label='Название'
                      value={editCourse?.name ?? ''}
                      onChange={e => setEditCourse({...editCourse, name: e?.currentTarget?.value})}
                    />
                    <Textarea
                      label='Описание'
                      value={editCourse?.description ?? ''}
                      onChange={e => setEditCourse({...editCourse, description: e?.currentTarget?.value})}
                    />
                      <Button 
                        compact
                        onClick={async () => {
                          const formData = new FormData()
                          formData.append('name', editCourse?.name)
                          formData.append('description', editCourse?.description)
                          formData.append('img', editCourse?.img)
                          await pb.collection('profile_courses').update(c?.id, formData)
                          .then(() => setEditCourse(null))
                        }} 
                      >
                        Сохранить
                      </Button>
                      <Button 
                        compact
                        onClick={() => setEditCourse(null)}
                      >
                        Отмена
                      </Button>
                  </>
                  : <>
                    <img 
                      src={getImageUrl(c, c?.img)} alt="" 
                      className='aspect-square object-cover'
                    />
                    <p>{c?.name}</p>
                    <p>{c?.description}</p>
                    <Button
                      compact
                      onClick={() => {
                        setEditCourse({
                          ...c
                        })
                      }}
                    >
                      Редактировать
                    </Button>
                  </>
                }
                
              </div>
              <div>
                <span className='mb-4'>
                  Выбрать тест:
                </span>
                <div className='flex gap-4'>
                  {tests.map(t => {
                    return (
                      <Button 
                        variant={c?.test_id === t?.id ? 'gradient' : 'outline'}
                        onClick={async () => {
                          await pb.collection('profile_courses').update(c?.id, {
                            test_id: t?.id
                          })
                        }}
                      >
                        Тест {t?.index}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className='grid grid-cols-3 mt-8 gap-4'>
              {c?.lessons?.map((l, i) => {
                return (
                  edit?.id === l?.id ? (
                    <div className='bg-white border p-4 space-y-3' key={i}>
                      <TextInput
                        label='Заголвок'
                        value={edit?.name}
                        name='name'
                        onChange={e => handleLessonChange(e)}
                      />
                      <TextInput
                        label='Ссылка'
                        value={edit?.link}
                        name='link'
                        onChange={e => handleLessonChange(e)}
                      />
                      <Button
                        onClick={() => saveLesson(c)}
                        compact
                      >
                        Сохранить
                      </Button>
                      <Button
                        onClick={() => setEdit(null)}
                        compact
                        className='ml-4'
                      >
                        Отмена
                      </Button>
                    </div>
                  ) : (
                    <div className='bg-white border-2 p-4 space-y-3' key={i}>
                      <TextInput
                        label='Заголвок'
                        value={l?.name}
                        readOnly
                      />
                      <TextInput
                        label='Ссылка'
                        value={l?.link}
                        readOnly
                      />
                      <Button
                        onClick={() => {
                          setEdit(l)
                        }}
                        compact
                      >
                        Редактировать
                      </Button>
                    </div>
                  )
                )
              })}
            </div>

            <div className='bg-white border p-4 max-w-md mt-4'>
              <TextInput
                label='Заголвок'
                value={createdLesson.name}
                onChange={e => setCreatedLesson({...createdLesson, name: e.currentTarget.value})}
              />
              <TextInput
                label='Ссылка'
                value={createdLesson.link}
                onChange={e => setCreatedLesson({...createdLesson, link: e.currentTarget.value})}
              />
              <Button 
                className='mt-4'
                onClick={() => createLesson(c)}
              >
                Добавить
              </Button>
            </div>
          </Tabs.Panel>
        )
      })}
    </Tabs>
  ) 
}