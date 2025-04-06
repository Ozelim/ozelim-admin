import React from 'react'
import { ActionIcon, clsx, Loader, Text, Textarea } from '@mantine/core'
import dayjs from 'dayjs'
import { AiOutlineSend } from 'react-icons/ai'
import { useParams, useSearchParams } from 'react-router-dom'
import { pb } from 'shared/api'
import { useAuth } from 'shared/hooks'
import { getImageUrl } from 'shared/lib'
import { useDisclosure } from '@mantine/hooks'
import { pushNotification } from 'shared/lib/pushNotification'

async function getOffersChat() {
  return await pb.collection('chats').getFullList({
    filter: `type = 'offer'`,
  })
}

async function getSupportChat() {
  return await pb.collection('chats').getFullList({
    filter: `type = 'support'`,
    expand: 'user, merchant, customer',
  })
}

async function getMerchantsChat() {
  return await pb.collection('chats').getFullList({
    filter: `type = 'merchant'`,
    expand: 'merchant, market',
  })
}

async function getMessages(id) {
  return await pb.collection('messages').getList(1, 30, {
    expand: 'user, merchant, customer',
    filter: `chat = '${id}'`,
    sort: '-created',
  })
}

export const Chat = () => {
  const { user } = useAuth()

  const [offerChat, setOfferChat] = React.useState({})
  const [supportChats, setSupportChats] = React.useState([])
  const [merchantChats, setMerchantChats] = React.useState([])
  const [selectedChat, setSelectedChat] = React.useState({})

  console.log(merchantChats)

  const [messages, setMessages] = React.useState([])

  const [messagesLoading, messagesLoading_h] = useDisclosure(false)

  async function handleMessages(id) {
    console.log(id)
    messagesLoading_h.open()
    await getMessages(id)
      .then((res) => {
        setMessages(res?.items)
      })
      .finally(() => {
        messagesLoading_h.close()
      })
  }

  async function handleChatSelect(q) {
    setSelectedChat(q)
    await handleMessages(q?.id)
  }

  const chats = [offerChat, ...supportChats]

  const [message, setMessage] = React.useState('')

  const [delay, delay_h] = useDisclosure(false)

  const messagesRef = React.useRef(null)

  async function handleOfferChat() {
    await getOffersChat().then((q) => {
      setOfferChat(q?.[0])
    })
  }

  React.useEffect(() => {
    getSupportChat().then((res) => {
      setSupportChats(res)
    })

    getMerchantsChat().then((res) => {
      setMerchantChats(res)
      // setSupportChats([...supportChats, ...res])
    })

    handleOfferChat()
  }, [])

  async function subscribeToChats() {
    await pb.collection('messages').subscribe('*', async function ({ record }) {
      if (record?.chat === selectedChat?.id) {
        await handleMessages(selectedChat?.id)
      }
    })
  }

  async function unsubscribeToChats() {
    return pb.collection('messages').unsubscribe('*')
  }

  React.useEffect(() => {
    subscribeToChats()

    return () => {
      unsubscribeToChats()
    }
  }, [])

  React.useEffect(() => {
    messagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [selectedChat])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!message) return

      sendMessage()
    }
  }

  async function sendMessage() {
    if (delay) {
      console.log('delay')
      return
    }
    await pb
      .collection('messages')
      .create({
        chat: selectedChat?.id,
        message,
        status: 'sent',
        super: user?.id,
      })
      .then(async () => {
        await handleMessages(selectedChat?.id)
        setMessage('')
        delay_h.open()
        setTimeout(() => {
          delay_h.close()
        }, 5000)

        await pushNotification(selectedChat?.user, 'messages')
      })
  }

  return (
    <div className="market">
      <div className="grid lg:grid-cols-[30%_auto] border mt-4 rounded-xl overflow-hidden max-w-6xl mx-auto bg-white">
        <div className="flex flex-col overflow-y-auto h-[70vh]">
          {chats?.map((q, i) => {
            return (
              <ChatItem
                chat={q}
                selectedChat={selectedChat}
                handleChatSelect={handleChatSelect}
                
              />
            )
          })}

          <p className="text-center text-gray-6 py-3 border-b">Магазины</p>

          {merchantChats?.map((q, i) => {

            return (
              <ChatItem
                chat={q}
                selectedChat={selectedChat}
                handleChatSelect={handleChatSelect}
                key={i}
              />             
            )
          })}
        </div>
        <div className="lg:border-l grid grid-rows-[auto_1fr_auto] h-[70vh]">
          <div className="flex gap-4 justify-center items-center mt-3 border-b pb-3">
            <img
              src={getImageUrl(selectedChat, selectedChat?.image)}
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
            {messagesLoading && (
              <div className="flex justify-center items-center h-full">
                <Loader />
              </div>
            )}
            {messages &&
              messages
                ?.map((q, i) => {
                  return (
                    <div
                      key={i}
                      className={clsx(
                        'bg-primary-500 max-w-[364px] p-2 rounded-xl text-white w-fit',
                        {
                          'ml-auto': q?.super === user?.id,
                          // 'bg-gray-100': q?.user !== user?.id
                        }
                      )}
                    >
                      <div
                        ref={messagesRef}
                        className="relative flex items-end"
                      >
                        <p>{q?.message}</p>
                        <p className="text-xs -mb-[5px] ml-2 text-slate-100">
                          {dayjs(q?.created).format('H:mm')}
                        </p>
                      </div>
                    </div>
                  )
                })
                ?.reverse()}
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
                <ActionIcon onClick={sendMessage}>
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

const ChatItem = ({ chat, selectedChat, handleChatSelect }) => {

  const u = chat?.expand?.user
  const c = chat?.expand?.customer
  const m = chat?.expand?.merchant
  const market = chat?.expand?.market
  
  return (
    <div
      className={clsx(
        'flex gap-2 items-center border-t p-3 pr-0 first:border-t-0 cursor-pointer',
        {
          'bg-primary-600 text-white': selectedChat?.id === chat?.id,
        }
      )}
      onClick={() => handleChatSelect(chat)}
    >
      {chat?.type === 'offer' &&
        (chat?.image ? (
          <img
            src={getImageUrl(chat, chat?.image)}
            alt=""
            className="w-14 h-14 object-cover rounded-full shrink-0"
          />
        ) : (
          <div
            alt=""
            className="w-14 h-14 object-cover rounded-full bg-slate-300 shrink-0"
          />
        ))}

      {u?.id &&
        (u?.avatar ? (
          <img
            src={getImageUrl(u, u?.avatar)}
            alt=""
            className="w-14 h-14 object-cover rounded-full shrink-0"
          />
        ) : (
          <div
            alt=""
            className="w-14 h-14 object-cover rounded-full bg-slate-300 shrink-0"
          />
        ))}
      {c?.id &&
        (c?.avatar ? (
          <img
            src={getImageUrl(c, c?.avatar)}
            alt=""
            className="w-14 h-14 object-cover rounded-full shrink-0"
          />
        ) : (
          <div
            alt=""
            className="w-14 h-14 object-cover rounded-full bg-slate-300 shrink-0"
          />
        ))}

      {market?.id &&
        (market?.image ? (
          <img
            src={getImageUrl(market, market?.image)}
            alt=""
            className="w-14 h-14 object-cover rounded-full shrink-0"
          />
        ) : (
          <div
            alt=""
            className="w-14 h-14 object-cover rounded-full bg-slate-300 shrink-0"
          />
        ))}  
          
      <div>
        <Text lineClamp={1}>
          {chat?.type === 'offer' && 'Акции'}
          {(chat?.type === 'support' && u?.fio) || c?.name}
          {market?.id && market?.name}
        </Text>
        <Text
          lineClamp={1}
          size="sm"
          color={selectedChat?.id === chat?.id ? 'white' : 'gray.6'}
        >
          {u?.id ?? c?.id ?? market?.id}
        </Text>
      </div>
    </div>
  )
}