import React from 'react'
import { Button, FileInput, TextInput, Textarea } from '@mantine/core'
import { getData, pb } from 'shared/api'
import { Editor, Image } from 'shared/ui'
import { openConfirmModal } from '@mantine/modals'
import { compress, getImageUrl } from 'shared/lib'

async function getTypes() {
  return await pb.collection('tourist_data').getFullList()
}

export const Tourist = () => {

  const [types, setTypes] = React.useState([])

  const [type, setType] = React.useState({
    label: '',
    description: ''
  })

  React.useEffect(() => {
    getTypes()
    .then(res => {
      setTypes(res?.[0])
    })
  }, [])

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
  
  function handleImagesChange (val, index) {
    setChangedImages({...changedImages, [`${index}`]: val})
  }

  function handleImageDelete (index) {
    setChangedImages({...changedImages, [index]: ''})
  }

  async function saveAbout () {

    await pb.collection('text').update(about?.text?.id, {
      headings_kz: changedHeadings, 
      text_kz: changedText
    })

    for (const index in changedImages) {
      if (!isNaN(index)) {
        const formData = new FormData()
        formData.append(`${index}`, changedImages?.[index])
        await pb.collection('images').update(about?.images?.id, formData)
        .then(res => {
          console.log(res);
        })
      }
    }
  }

  React.useEffect(() => {
    getData('tourist').then(res => {
      setAbout(res);
      setHeadings(res?.text?.headings_kz)
      setText(res?.text?.text_kz)
      setImages(res?.images)
    })
  }, [])
  
  React.useEffect(() => {
    setChangedHeadings(headings)
    setChangedText(text)
  }, [headings, text])

  React.useEffect(() => {
    setChangedImages(images)
    setPics(images?.[`11`])
  }, [images])

  const [pics, setPics] = React.useState([])
  const [deletedPics, setDeletedPics] = React.useState([])

  async function upload () {

    const formData = new FormData()

    pics.map(async q => {
      if (q instanceof File || q instanceof Blob) {
        await compress(q, {quality: 0.5, maxWidth: 1500, maxHeight: 1500})
        .then(async res => {
          const file = new File([res], crypto.randomUUID())
          formData.append(`11`, file, crypto.randomUUID())
          await pb.collection('images').update(about?.images?.id, formData)
          .then(res => {
            console.log(res, 'res');
          })
      
        })
      }
    })
    
    await pb.collection('images').update(about?.images?.id, {
      '11-': [...deletedPics]
    })
  }

  return (
    <div className='w-full'>
      <div className='flex gap-4 items-end'>
        <FileInput 
          onChange={e => setPics([...pics, e])}  
          label='Добавить фото'
          w={150}
          variant='filled'
        />

        <Button
          onClick={upload}
        >
          Сохранить
        </Button>
      </div>

      <div className='w-[1280px] overflow-x-scroll mt-8'>
        <div className='flex gap-4'>
          {pics?.map((q, i) => {
            if (q instanceof File) {
              return (
                <div className='w-80 shrink-0 grow-1' key={i}>
                  <img src={q && URL.createObjectURL(q)} alt="" className='w-80'/>
                  <div className="text-center">
                    <Button
                      onClick={e => {
                        const newPics = pics.filter(w => q !== w)
                        const delPics = pics.filter(w => q == w)
                        setPics(newPics)
                        setDeletedPics([...deletedPics, ...delPics])
                      }} 
                    compact
                    variant='subtle'
                  >
                    Удалить
                    </Button>
                  </div>
                </div>
              )
            } else {
              return (
                <div className='w-80 shrink-0 grow-1' key={i}>
                  <img src={getImageUrl(images, q)} alt="" className='w-80'/>
                  <div className="text-center">

                    <Button
                      onClick={e => {
                        const newPics = pics.filter(w => q !== w)
                        const delPics = pics.filter(w => q == w)
                        setPics(newPics)
                        setDeletedPics([...deletedPics, ...delPics])
                      }} 
                      compact
                      variant='subtle'
                    >
                      Удалить
                    </Button>
                  </div>
                </div>
              )
            }
          })}
        </div>
      </div>
      {/* <div className='flex gap-8 overflow-scroll'>
        {Array(5).fill(1).map((q, i) => {
          return (
            <Image
              label={'Картинка'}
              onChange={handleImagesChange}
              record={about?.images}
              image={changedImages?.[`${i + 1}`]}
              onDelete={handleImageDelete}
              index={i + 1}
              className='w-full h-auto'
            />  
          )
        })}
      </div> */}
      <div className='max-w-xl mt-10'>
        <TextInput 
          label='Заголовок'
          value={changedHeadings?.intro1 ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='intro1'
        />
        <Textarea
          label='Описание'
          value={changedText?.intro2 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='intro2'
          autosize
        />
      </div>
        
      <div className='max-w-xl mt-10'>
        <Image
          label={'Картинка'}
          onChange={handleImagesChange}
          record={about?.images}
          image={changedImages?.[6]}
          onDelete={handleImageDelete}
          index={6}
          className='w-full h-auto'
        />  
        <TextInput
          label='Заголовок'
          value={changedHeadings?.info1 ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='info1'
        />
        <Textarea 
          label='Подзаголовок'
          value={changedText?.info2 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='info2'
          autosize
        />
        <Textarea 
          label='Описание'
          value={changedText?.info3 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='info3'
          autosize
        />
        <Textarea 
          label='Подзаголовок'
          value={changedText?.info4 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='info4'
          autosize
        />
        <Textarea 
          label='Описание'
          value={changedText?.info5 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='info5'
          autosize
        />
        <Textarea 
          label='Подзаголовок'
          value={changedText?.info6 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='info6'
          autosize
        />
        <Textarea 
          label='Описание'
          value={changedText?.info7 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='info7'
          autosize
        />
      </div>

      <section className='max-w-4xl mt-8'>
        <Image
          label={'Картинка'}
          onChange={handleImagesChange}
          record={about?.images}
          image={changedImages?.['7']}
          onDelete={handleImageDelete}
          index={7}
        />  
        <TextInput
          label='Заголовок'
          value={changedHeadings?.memo1 ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='memo1'
        />

        <Textarea 
          label='Описание'
          value={changedText?.memo2 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='memo2'
          autosize
        />
      </section>
      <section className='max-w-4xl mt-10'>
        <TextInput
          label='Заголовок'
          value={changedHeadings?.services1 ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='services1'
        />
        <TextInput
          label='Подзаголовок'
          value={changedHeadings?.services2 ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='services2'
        />
        {Array(12).fill(1).map((_, i) => {
          return (
            <Textarea 
              label='Описание'
              value={changedText?.[`services${i + 3}`] ?? ''}
              onChange={(e) => handleAboutChange(e, 'text')}
              name={`services${i + 3}`  }
              autosize
            />
          )
        })}
      </section>
      
      <section className='max-w-4xl mt-8'>
        <Image
          label={'Картинка'}
          onChange={handleImagesChange}
          record={about?.images}
          image={changedImages?.['8']}
          onDelete={handleImageDelete}
          index={8}
        />  
        <TextInput
          label='Заголовок'
          value={changedHeadings?.fund1 ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='fund1'
        />
        <TextInput
          label='Подзаголовок'
          value={changedHeadings?.fund2 ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='fund2'
        />
        <Textarea 
          label='Описание'
          value={changedText?.fund3 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='fund3'
          autosize
        />
      </section>


      <section className='max-w-xl mt-10'>
        <Image
          label={'Картинка'}
          onChange={handleImagesChange}
          record={about?.images}
          image={changedImages?.['9']}
          onDelete={handleImageDelete}
          index={9}
        />  
        <TextInput
          label='Заголовок'
          value={changedHeadings?.dick1 ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='dick1'
        />
        <Textarea
          label='Описание'
          value={changedText?.dick2 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='dick2'
          autosize
        />
      </section>
      <section className='max-w-xl mt-10'>
        <Image
          label={'Картинка'}
          onChange={handleImagesChange}
          record={about?.images}
          image={changedImages?.['10']}
          onDelete={handleImageDelete}
          index={10}
        />  
        <TextInput
          label='Заголовок'
          value={changedHeadings?.agent1 ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='agent1'
        />
        <TextInput
          label='Подзаголовок'
          value={changedHeadings?.agent2 ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='agent2'
        />
        {Array(12).fill(1).map((_, i) => {
          return (
            <Textarea 
              label='Описание'
              value={changedText?.[`agent${i + 3}`] ?? ''}
              onChange={(e) => handleAboutChange(e, 'text')}
              name={`agent${i + 3}`  }
              autosize
            />
          )
        })}
      </section>
      <div className='flex justify-center'>
        <Button 
          onClick={saveAbout}
        >
          Сохранить
        </Button>
      </div>
      <div>
          <p>Виды услуг:</p>
          {types?.types?.map((q, i) => {
            return (
              <>
                <p className='text-lg'>{q?.label}</p>
                <p className='text-lg'>{q?.description}</p>
                <Button
                  variant='subtle'
                  onClick={() => {
                    openConfirmModal({
                      centered: true,
                      labels: {confirm: 'Удалить', cancel: 'Отмена'},
                      onConfirm: async () => {
                        const newTypes = types?.types?.filter(w => w?.id !== q?.id)
                        await pb.collection('tourist_data').update(types?.id, {
                          types: [...newTypes]
                        })
                        .then(res => {
                          getTypes()
                          .then((res) => {
                            setTypes(res?.[0])
                          })
                        })
                      }
                    })
                  }}
                >
                  Удалить 
                </Button>
              </>
            )
          })}
          <div>          
            <TextInput
              className='max-w-md'
              label='Название'
              value={type?.label ?? ''}
              onChange={e => setType({...type, label: e?.currentTarget?.value})}
            />
            <Textarea
              className='max-w-md'
              label='Описание'
              value={type?.description ?? ''}
              onChange={e => setType({...type, description: e?.currentTarget?.value})}
            />
            <Button
              onClick={async () => {
                await pb.collection('tourist_data').update(types?.id, {
                  types: [...types?.types ?? [], type]
                })
                .then(() => {
                  getTypes()
                  .then(res => {
                    setTypes(res?.[0])
                    setType('')
                  })
                })
              }}
              className='mt-6'
            >
              Добавить тип услуги
            </Button>
          </div>
        </div>
    </div>
  )
}