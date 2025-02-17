import React from 'react'
import { Button, FileInput, TextInput, Textarea } from '@mantine/core'
import { getData, pb } from 'shared/api'
import { Editor, Image } from 'shared/ui'

export const TouristKz = () => {

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
        if (changedImages?.[index] instanceof File || changedImages?.[index] instanceof Blob) {
          formData.append(`${index}`, changedImages?.[index])
          await pb.collection('images').update(about?.images?.id, formData)
          .then(res => {
            console.log(res);
          })
        }
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
  }, [images])

  return (
    <div className='w-full'>
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
        {/* <Image
          label={'Картинка'}
          onChange={handleImagesChange}
          record={about?.images}
          image={changedImages?.[6]}
          onDelete={handleImageDelete}
          index={6}
          className='w-full h-auto'
        />   */}
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
    </div>
  )
}