import React from 'react'
import { Tabs, Table, ActionIcon, Pagination } from '@mantine/core'
import { pb } from 'shared/api'
import dayjs from 'dayjs'
import { FaCheck } from 'react-icons/fa'
import { FaDeleteLeft } from 'react-icons/fa6'
import { openConfirmModal } from '@mantine/modals'

async function getCreatedReviews() {
  return await pb.collection('reviews').getFullList({
    filter: 'status = "created"',
    expand: 'market_id, user, customer, product_id'
  })
}

async function getPostedReviews(page = 1) {
  return await pb.collection('reviews').getList(page, 20, {
    filter: 'status = "posted"',
    expand: 'market_id, user, customer, product_id'
  })
}

export const Reviews = () => {

  const [createdReviews, setCreatedReviews] = React.useState([])
  const [postedReviews, setPostedReviews] = React.useState({})

  const [page, setPage] = React.useState(1)

  async function handleCreatedReviews() {
    getCreatedReviews().then(res => {
      setCreatedReviews(res)
    })
  } 

  async function handlePostedReviews(page) {
    getPostedReviews(page).then(res => {
      setPostedReviews(res)
      setPage(page) 
    })
  }

  React.useEffect(() => {
    handleCreatedReviews()
    handlePostedReviews()
  }, [])

  async function handleConfirmReview(reviewId) {
    openConfirmModal({  
      title: 'Подтверждение',
      centered: true,
      children: <>Вы уверены, что хотите опубликовать отзыв?</>,
      labels: {
        confirm: 'Опубликовать',
        cancel: 'Отменить'
      },
      onConfirm: async () => {
        await pb.collection('reviews').update(reviewId, {
          status: 'posted'
        })
        handleCreatedReviews()
      }
    })
  }

  async function handleDeleteReview(reviewId) {
    openConfirmModal({
      title: 'Подтверждение',
      centered: true,
      children: <>Вы уверены, что хотите удалить отзыв?</>,
      labels: {
        confirm: 'Удалить',
        cancel: 'Отменить'
      },  
      onConfirm: async () => {
        await pb.collection('reviews').delete(reviewId)
        handleCreatedReviews()
      }
    })
  }

  return (
    <Tabs
      defaultValue='created'
    >
      <Tabs.List> 
        <Tabs.Tab value="created">Одобренные</Tabs.Tab>
        <Tabs.Tab value="posted">Опубликованные</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value='created'>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Пользователь</th>
              <th>Товар</th>
              <th>Магазин</th>
              <th>Рейтинг</th>
              <th>Дата</th>
              <th>Отзыв</th>
              <th>Действие</th>
            </tr>
          </thead>    
          <tbody>
            {createdReviews.map(review => {
              const market = review.expand?.market_id
              const product = review.expand?.product_id
              const user = review.expand?.user
              const customer = review?.expand?.customer

              return (
                <tr key={review.id}>
                  <td>{review.id}</td>
                  <td>{user?.fio ? user?.fio : customer?.name}</td>
                  <td>{product?.name}</td>
                  <td>{market?.name}</td>
                  <td>{review.rating} / 5</td>
                  <td>{dayjs(review.created).format('DD.MM.YYYY')}</td>
                  <td>{review.comment}</td>
                  <td className='flex gap-2'>
                    <ActionIcon size={20} onClick={() => handleConfirmReview(review.id)}>
                      <FaCheck size={20} color='green'/>
                    </ActionIcon>
                    <ActionIcon size={20} onClick={() => handleDeleteReview(review.id)}>
                      <FaDeleteLeft size={20} color='red'/>
                    </ActionIcon>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Tabs.Panel>
      <Tabs.Panel value='posted'>
        <Table>
          <thead>
            <tr>
                <th>ID</th>
              <th>Пользователь</th>
              <th>Товар</th>
              <th>Магазин</th>
              <th>Рейтинг</th>
              <th>Дата</th>
              <th>Отзыв</th>
            </tr>
          </thead>
          <tbody>
            {postedReviews?.items?.map(review => {

              const market = review.expand?.market_id
              const product = review.expand?.product_id
              const user = review.expand?.user
              const customer = review?.expand?.customer

              return (
                  <tr key={review.id}>
                  <td>{review.id}</td>
                  <td>{user?.fio ? user?.fio : customer?.name}</td>
                  <td>{product?.name}</td>
                  <td>{market?.name}</td>
                  <td>{review.rating} / 5</td>
                  <td>{dayjs(review.created).format('DD.MM.YYYY')}</td>
                  <td>{review.comment}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <div className='flex justify-center mt-4'>
          <Pagination
            total={postedReviews?.totalPages}
            page={page}
            onChange={async p => handlePostedReviews(p)}
          />
        </div>
      </Tabs.Panel>
    </Tabs>
  )
}
