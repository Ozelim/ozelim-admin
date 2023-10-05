import React from 'react';
import { Tree } from 'react-d3-tree';

import { Button, TextInput, Textarea } from '@mantine/core'
import { getData, pb } from 'shared/api'
import { Image } from 'shared/ui'

export const Home = () => {

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
        <Textarea 
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
        />
        </div>
      </div>
      <Button
        className='mt-5'
        onClick={saveAbout}
      >
        Сохранить
      </Button>
    </div>
  );
};