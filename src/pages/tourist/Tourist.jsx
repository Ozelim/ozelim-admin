import React from 'react'
import { Button, TextInput, Textarea } from '@mantine/core'
import { getData, pb } from 'shared/api'
import { Image } from 'shared/ui'
import { openConfirmModal } from '@mantine/modals'

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

    for (const index in changedImages) {
      if (!isNaN(index)) {
        const formData = new FormData()
        formData.append([`${index}`], changedImages?.[index])
        await pb.collection('images').update(about?.images?.id, formData)
        .then(res => {
          console.log(res);
        })
      }
    }
    await pb.collection('text').update(about?.text?.id, {
      headings: changedHeadings, 
      text: changedText
    })
  }

  React.useEffect(() => {
    getData('tourist').then(res => {
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
      <div className='flex gap-8 overflow-scroll'>
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
      </div>
      <div className='max-w-xl mt-10'>
        <TextInput 
          label='Заголовок'
          value={changedHeadings?.q1 ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='q1'
        />
        <Textarea
          label='Описание'
          value={changedText?.q1 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='q1'
          autosize
        />
      </div>
        
      <div className='max-w-xl mt-10'>
        <TextInput
          label='Заголовок'
          value={changedHeadings?.q2 ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='q2'
        />
        <Textarea 
          label='Описание'
          value={changedText?.q2 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='q2'
          autosize
        />
        <Textarea 
          label='Описание'
          value={changedText?.q3 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='q3'
          autosize
        />
        <Textarea 
          label='Описание'
          value={changedText?.q4 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='q4'
          autosize
        />
        <Textarea 
          label='Описание'
          value={changedText?.q5 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='q5'
          autosize
        />
        <Textarea 
          label='Описание'
          value={changedText?.q6 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='q6'
          autosize
        />
        <Textarea 
          label='Описание'
          value={changedText?.q7 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='q7'
          autosize
        />
        <Image
          label={'Картинка'}
          onChange={handleImagesChange}
          record={about?.images}
          image={changedImages?.['6']}
          onDelete={handleImageDelete}
          index={6}
        />  
        <TextInput
          label='Заголовок'
          value={changedHeadings?.q3 ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='q3'
        />
        <TextInput
          label='Заголовок'
          value={changedHeadings?.q4 ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='q4'
        />
        <Textarea 
          label='Описание'
          value={changedText?.q8 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='q8'
          autosize
        />
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
          value={changedHeadings?.q5 ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='q5'
        />
        <Textarea 
          label='Описание'
          value={changedText?.q9 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='q9'
          autosize
        />
      </div>
      <section className='max-w-xl mt-10'>
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
          value={changedHeadings?.q6 ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='q6'
        />
        <TextInput
          label='Заголовок'
          value={changedHeadings?.q7 ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='q7'
        />
        <Textarea
          label='Описание'
          value={changedText?.q10 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='q10'
          autosize
        />
        <Textarea
          label='Описание'
          value={changedText?.q11 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='q11'
          autosize
        />
        <Textarea
          label='Описание'
          value={changedText?.q12 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='q12'
          autosize
        />
        <Textarea
          label='Описание'
          value={changedText?.q13 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='q13'
          autosize
        />
        <Textarea
          label='Описание'
          value={changedText?.q14 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='q14'
          autosize
        />
        <Textarea
          label='Описание'
          value={changedText?.q15 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='q15'
          autosize
        />
        <Textarea
          label='Описание'
          value={changedText?.q16 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='q16'
          autosize
        />
        <Textarea
          label='Описание'
          value={changedText?.q17 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='q17'
          autosize
        />
        <Textarea
          label='Описание'
          value={changedText?.q18 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='q18'
          autosize
        />
        <Textarea
          label='Описание'
          value={changedText?.q19 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='q19'
          autosize
        />
        <Textarea
          label='Описание'
          value={changedText?.q20 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='q20'
          autosize
        /> 
        <Textarea
          label='Описание'
          value={changedText?.q21 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='q21'
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
          value={changedHeadings?.q8 ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='q8'
        />
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