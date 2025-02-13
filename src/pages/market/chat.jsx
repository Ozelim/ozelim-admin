import React from 'react'
import { ActionIcon, clsx, Text, Textarea } from '@mantine/core'
import dayjs from 'dayjs'
import { AiOutlineSend } from 'react-icons/ai'
import { useParams, useSearchParams } from 'react-router-dom'
import { pb } from 'shared/api'
import { useAuth } from 'shared/hooks'
import { getImageUrl } from 'shared/lib'
import { useDisclosure } from '@mantine/hooks'

async function getOffersChat () {
  return await pb.collection('chats').getFullList({
    filter: `type = 'offer'`
  })
}

async function getSupportChat () {
  return await pb.collection('chats').getFullList({
    filter: `type = 'support'`,
    expand: 'user'
  })
}

async function getMerchantsChat () {
  return await pb.collection('chats').getFullList({
    filter: `type = 'merchant'`,
    expand: 'merchant'
  })
}

async function createChat(data) {
  return await pb.collection('chats').create(data)
}

export const Chat = () => {

  const [params, setParams] = useSearchParams()

  const { user } = useAuth()

  const [offerChat, setOfferChat] = React.useState({})
  const [supportChats, setSupportChats] = React.useState([])
  const [merchantChats, setMerchantChats] = React.useState([])
  const [selectedChat, setSelectedChat] = React.useState({})

  function handleChatSelect (q) {
    setSelectedChat(q)
  }

  const chats = [offerChat, ...supportChats]

  const [message, setMessage] = React.useState('')

  const [delay, delay_h] = useDisclosure(false)

  const messagesRef = React.useRef(null)

  async function handleOfferChat () {
    await getOffersChat()
    .then(q => {
      setOfferChat(q?.[0])
    })
  }

  React.useEffect(() => {
    getSupportChat()
    .then(res => {
      setSupportChats(res)
    })

    getMerchantsChat()
    .then(res => {
      // setSupportChats([...supportChats, ...res])
    })

    handleOfferChat()
  }, [])

  async function subscribeToChats() {
    await pb.collection('chats').subscribe('*', async function ({ record }) {

      if (record?.type === 'offer') {
        setOfferChat(record)
      }

      if (record?.type !== 'offer') {
        await getSupportChat()
        .then(q => {
          setSupportChats(q)
        })
      }

      if (selectedChat?.id === record?.id) {
        setSelectedChat(record)
      }
    })
  }

  async function unsubscribeToChats() {
    return pb.collection('chats').unsubscribe('*')
  }

  React.useEffect(() => {
    subscribeToChats()

    return () => {
      unsubscribeToChats()
    }
  }, [])

  React.useEffect(() => {
    messagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [selectedChat?.messages])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!message) return

      sendMessage()
    }
  }

  async function sendMessage() {
    if (delay) {
      console.log('delay');
      return
    }
    await pb
      .collection('chats')
      .update(selectedChat?.id, {
        messages: [
          ...(selectedChat?.messages ?? []),
          {
            user: user?.id,
            message,
            date: new Date(),
          },
        ],
      })
      .then((res) => {
        setMessage('')
        delay_h.open()
        setTimeout(() => {
          delay_h.close()
        }, 3000)
      })
  }

  return (
    <div className="market">
      <div className="grid lg:grid-cols-[30%_auto] border mt-4 rounded-xl overflow-hidden max-w-6xl mx-auto bg-white">
        <div className="flex flex-col overflow-y-auto h-[50vh]">
          {chats?.map((q, i) => {

            const u = q?.expand?.user

            return (
              <div
                className={clsx(
                  'flex gap-2 items-center border-t p-3 pr-0 first:border-t-0 cursor-pointer',
                  {
                    'bg-red-600 text-white': selectedChat?.id === q?.id,
                  }
                )}
                key={i}
                onClick={() => handleChatSelect(q)}
              >
                  <img
                    src={getImageUrl(u, u?.avatar)}
                    alt=""
                    className="w-14 h-14 object-cover rounded-full"
                  />
                  {/* <img
                    src={'https://pbs.twimg.com/media/GV4Rqt2XEAAQotY?format=jpg&name=4096x4096'}
                    alt=""
                    className="w-14 h-14 object-cover rounded-full"
                  /> */}
                <div>
                  <Text lineClamp={1}>
                    {q?.type === 'offer' && 'Акции'}
                    {q?.type === 'support' && u?.fio}
                  </Text>
                  <Text
                    lineClamp={1}
                    size="sm"
                    color={selectedChat?.id === q?.id ? 'white' : 'gray.6'}
                  >
                    {u?.id}
                    {/* {q?.messages?.at(-1)?.message} */}
                  </Text>
                </div>
              </div>
            )
          })}
        </div>
        <div className="lg:border-l grid grid-rows-[auto_1fr_auto] h-[50vh]">
          <div className="flex gap-4 justify-center items-center mt-3 border-b pb-3">
            <img
              src={getImageUrl(
                selectedChat,
                selectedChat?.image
              )}
              alt=""
              className="w-14 h-14 object-cover rounded-full"
            />
            <div className="flex flex-col justify-center">
              <p>{selectedChat?.name}</p>
              <Text lineClamp={1} size="sm" color="gray.6" className="max-w-xs">
                {selectedChat?.description}
              </Text>
            </div>
          </div>

          <div className="flex flex-col gap-3 grow p-3 overflow-y-auto chat-font relative">
            {selectedChat?.messages &&
              selectedChat?.messages?.map((q, i) => {
                return (
                  <div
                    key={i}
                    className={clsx('bg-red-500 max-w-[264px] p-2 rounded-xl text-white w-fit', {
                      'ml-auto': q?.user === user?.id,
                      // 'bg-gray-100': q?.user !== user?.id
                    })}
                  >
                    <div ref={messagesRef} className="relative flex items-end">
                      <p>{q?.message}</p>
                      <p className="text-xs -mb-[5px] ml-2 text-slate-100">
                        {dayjs(q?.date).format('H:mm')}
                      </p>
                    </div>
                  </div>
                )
              })}
          </div>

          <div className="flex gap-4 justify-center border-t items-center mt-auto w-full h-full shrink">
            <Textarea
              className="w-full h-full grow"
              variant="filled"
              radius="xs"
              placeholder="Введите сообщение"
              onKeyDown={handleKeyDown}
              value={message ?? ''}
              onChange={(e) => setMessage(e.currentTarget.value)}
              rightSection={
                <ActionIcon onClick={sendMessage} disabled={selectedChat?.type === 'offer'}>
                  <AiOutlineSend size={30} />
                </ActionIcon>
              }
              disabled={delay}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
