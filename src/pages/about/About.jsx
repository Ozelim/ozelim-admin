import React from 'react'

import TravelIcon from 'shared/assets/images/travel.png'
import ConstructorIcon from 'shared/assets/images/constructor.png'
import DoctorIcon from 'shared/assets/images/doctor.png'
import SportIcon from 'shared/assets/icons/sport.svg'
import { Button, FileButton, TextInput, Textarea } from '@mantine/core'
import { Link } from 'react-router-dom'
import { AiOutlineYoutube } from 'react-icons/ai'
import { AiOutlineInstagram } from 'react-icons/ai'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { pb } from 'shared/api'
import { getPropertyKey } from 'shared/lib'
import { Image } from 'shared/ui'

async function getAbout () {

  const slider = await pb.collection('slider').getFullList({filter: `page = 'about'`})
  const images = await pb.collection('images').getFullList({filter: `page = 'about'`})
  const text = await pb.collection('text').getFullList({filter: `page = 'about'`})

  return {
    slider: slider[0], 
    images: images[0], 
    text: text[0]
  }
}

export const About = () => {

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
    getAbout().then(res => {
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
      <section>
        <TextInput 
          label='Главный заголовок'
          value={changedHeadings?.main ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='main'
        />
        <Textarea
          label='Описание'
          value={changedText?.main ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='main'
          autosize
        />

        <TextInput
          label='Заголовок'
          value={changedHeadings?.main2 ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='main2'
        />

        <div className='grid grid-cols-3 gap-4 my-10'>
          <div>
            <Image
              label={'Картинка'}
              onChange={handleImagesChange}
              record={about?.images}
              image={changedImages?.['1']}
              onDelete={handleImageDelete}
              index={1}
            />  
            <TextInput
              label='Заголовок'
              value={changedHeadings?.grid ?? ''}
              onChange={(e) => handleAboutChange(e, 'heading')}
              name='grid'
            />
            <Textarea 
              label='Описание'
              value={changedText?.grid ?? ''}
              onChange={(e) => handleAboutChange(e, 'text')}
              name='grid'
              autosize
            />
          </div>
          <div>
            <Image
              label={'Картинка'}
              onChange={handleImagesChange}
              record={about?.images}
              image={changedImages?.['2']}
              onDelete={handleImageDelete}
              index={2}
            />  
            <TextInput
              label='Заголовок'
              value={changedHeadings?.grid2 ?? ''}
              onChange={(e) => handleAboutChange(e, 'heading')}
              name='grid2'

            />
            <Textarea 
              label='Описание'
              value={changedText?.grid2 ?? ''}
              onChange={(e) => handleAboutChange(e, 'text')}
              name='grid2'
              autosize
            />
          </div>
          <div>
            <Image
              label={'Картинка'}
              onChange={handleImagesChange}
              record={about?.images}
              image={changedImages?.['3']}
              onDelete={handleImageDelete}
              index={3}
            />  
            <TextInput
              label='Заголовок'
              value={changedHeadings?.grid3 ?? ''}
              onChange={(e) => handleAboutChange(e, 'heading')}
              name='grid3'

            />
            <Textarea 
              label='Описание'
              value={changedText?.grid3 ?? ''}
              onChange={(e) => handleAboutChange(e, 'text')}
              name='grid3'
              autosize
            />
          </div>
        </div>
      </section>
      <section className='mt-10'>
        <TextInput
          label='Заголовок'
          value={changedHeadings?.task ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='task'
        />
        <Textarea
          label='Описание'
          value={changedText?.task ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='task'
          autosize
        />
      <Image
        label={'Картинка'}
        onChange={handleImagesChange}
        record={about?.images}
        image={changedImages?.['4']}
        onDelete={handleImageDelete}
        index={4}
      />  
      </section>
      <section className='mt-10'>
        <TextInput
          label='Заголовок'
          value={changedHeadings?.bond ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='bond'
        />
        <Textarea
          label='Описание'
          value={changedText?.bond ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='bond'
          autosize
        />

        <TextInput
          label='Заголовок'
          value={changedHeadings?.bond2 ?? ''}
          onChange={(e) => handleAboutChange(e, 'heading')}
          name='bond2'
        />
        <TextInput
          label='Номер телефона'
          value={changedText?.bond2 ?? ''}
          onChange={(e) => handleAboutChange(e, 'text')}
          name='bond2'
        />
      </section>
        <Button 
          onClick={saveAbout}
        >
          Сохранить
        </Button>

    </div>
  )
}
