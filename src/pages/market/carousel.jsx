import React, { useState, useEffect } from 'react'
import { pb } from 'shared/api'
import { Carousel } from '@mantine/carousel'
import {
  Button,
  Modal,
  TextInput,
  Textarea,
  Group,
  Card,
  Image,
  Text,
  ActionIcon,
  LoadingOverlay,
  Paper,
  FileInput,
  NumberInput,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai'

async function getSlider() {
  return await pb.collection('market_slider').getFullList({
    sort: 'created',
  })
}

export const MarketCarousel = () => {
  const [slider, setSlider] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    link: '',
    price: 0,
    image: null,
  })

  const fetchSlider = async () => {
    setLoading(true)
    try {
      const data = await getSlider()
      setSlider(data)
    } catch (error) {
      showNotification({
        title: 'Ошибка',
        message: 'Не удалось загрузить данные слайдера',
        color: 'red',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSlider()

    // Subscribe to changes
    // const unsubscribe = pb.collection('market_slider').subscribe('*', () => {
    //   fetchSlider()
    // })

    // return () => unsubscribe()
  }, [])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      link: '',
      price: 0,
      image: null,
    })
    setCurrentSlide(null)
  }

  const handleOpenModal = (slide = null) => {
    if (slide) {
      setCurrentSlide(slide)
      setFormData({
        name: slide.name || '',
        description: slide.description || '',
        link: slide.link || '',
        price: slide.price || 0,
        image: null, // We don't populate the file input with the existing image
      })
    } else {
      resetForm()
    }
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    resetForm()
    setModalOpen(false)
  }

  const handleSaveSlide = async () => {
    setLoading(true)
    try {
      const formDataToSubmit = new FormData()

      formDataToSubmit.append('name', formData.name)
      formDataToSubmit.append('description', formData.description)
      formDataToSubmit.append('link', formData.link)
      formDataToSubmit.append('price', formData.price)

      if (formData.image) {
        formDataToSubmit.append('image', formData.image)
      }

      if (currentSlide) {
        // Update existing slide
        await pb
          .collection('market_slider')
          .update(currentSlide.id, formDataToSubmit)
        showNotification({
          title: 'Успешно',
          message: 'Слайд успешно обновлен',
          color: 'green',
        })
      } else {
        // Create new slide
        await pb.collection('market_slider').create(formDataToSubmit)
        showNotification({
          title: 'Успешно',
          message: 'Слайд успешно создан',
          color: 'green',
        })
      }

      handleCloseModal()
      fetchSlider()
    } catch (error) {
      showNotification({
        title: 'Ошибка',
        message: error.message || 'Не удалось сохранить слайд',
        color: 'red',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteSlide = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот слайд?')) {
      setLoading(true)
      try {
        await pb.collection('market_slider').delete(id)
        showNotification({
          title: 'Успешно',
          message: 'Слайд успешно удален',
          color: 'green',
        })
        fetchSlider()
      } catch (error) {
        showNotification({
          title: 'Ошибка',
          message: 'Не удалось удалить слайд',
          color: 'red',
        })
      } finally {
        setLoading(false)
      }
    }
  }

  const getImageUrl = (item) => {
    if (!item.image) return ''
    return pb.getFileUrl(item, item.image)
  }

  return (
    <div className="w-full relative">
      <LoadingOverlay visible={loading} />

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Управление слайдером</h1>
        <Button
          leftIcon={<AiOutlinePlus size={16} />}
          onClick={() => handleOpenModal()}
        >
          Добавить новый слайд
        </Button>
      </div>

      {slider.length === 0 ? (
        <Paper p="xl" shadow="sm" className="text-center">
          <Text size="lg" color="dimmed">
            Нет доступных слайдов. Добавьте ваш первый слайд!
          </Text>
        </Paper>
      ) : (
        <Carousel
          withIndicators
          height={400}
          slideSize="70%"
          slideGap="md"
          loop
          align="start"
        >
          {slider.map((item) => (
            <Carousel.Slide key={item.id}>
              <Card shadow="sm" p="lg" radius="md" className="h-full relative">
                <Card.Section>
                  <Image src={getImageUrl(item)} height={250} alt={item.name} />
                </Card.Section>

                <Group position="apart" mt="md" mb="xs">
                  <Text weight={500}>{item.name}</Text>
                  <Group spacing={5}>
                    <ActionIcon
                      color="blue"
                      onClick={() => handleOpenModal(item)}
                    >
                      <AiOutlineEdit size={18} />
                    </ActionIcon>
                    <ActionIcon
                      color="red"
                      onClick={() => handleDeleteSlide(item.id)}
                    >
                      <AiOutlineDelete size={18} />
                    </ActionIcon>
                  </Group>
                </Group>

                <Text size="sm" color="dimmed" lineClamp={2}>
                  {item.description}
                </Text>

                <Group position="apart" mt="xs">
                  {item.link && (
                    <Text size="sm" color="blue">
                      Ссылка: {item.link}
                    </Text>
                  )}

                  {item.price > 0 && (
                    <Text size="md" weight={700} color="green">
                      {item.price.toLocaleString()} ₸
                    </Text>
                  )}
                </Group>
              </Card>
            </Carousel.Slide>
          ))}
        </Carousel>
      )}

      <Modal
        opened={modalOpen}
        onClose={handleCloseModal}
        title={currentSlide ? 'Редактировать слайд' : 'Добавить новый слайд'}
        size="lg"
      >
        <div className="space-y-4">
          <TextInput
            label="Название"
            placeholder="Введите название слайда"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />

          <Textarea
            label="Описание"
            placeholder="Введите описание слайда"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            minRows={3}
          />

          <TextInput
            label="Ссылка"
            placeholder="Введите ссылку (необязательно)"
            value={formData.link}
            onChange={(e) => handleInputChange('link', e.target.value)}
          />

          <NumberInput
            label="Цена"
            placeholder="Введите цену (необязательно)"
            value={formData.price}
            onChange={(value) => handleInputChange('price', value)}
            min={0}
            step={1000}
            parser={(value) => value.replace(/\s/g, '')}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ' ')
                : ''
            }
          />

          <FileInput
            label="Изображение"
            placeholder={
              currentSlide
                ? 'Изменить изображение (необязательно)'
                : 'Выберите изображение'
            }
            accept="image/*"
            value={formData.image}
            onChange={(file) => handleInputChange('image', file)}
            required={!currentSlide}
          />

          {currentSlide && (
            <div className="mt-2">
              <Text size="sm" weight={500}>
                Текущее изображение:
              </Text>
              <Image
                src={getImageUrl(currentSlide)}
                height={100}
                width={200}
                fit="contain"
                alt={currentSlide.name}
              />
            </div>
          )}

          <Group position="right" mt="md">
            <Button variant="outline" onClick={handleCloseModal}>
              Отмена
            </Button>
            <Button onClick={handleSaveSlide}>Сохранить</Button>
          </Group>
        </div>
      </Modal>
    </div>
  )
}
