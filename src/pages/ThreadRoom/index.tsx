import { Button, Input, Space, Tag } from 'antd';
import { isEmpty } from 'lodash';
import { DateTime } from 'luxon';
import { FetchMessagesResponse, MessageEvent } from 'pubnub';
import { usePubNub } from 'pubnub-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IInteraction } from '../../commonTypes';
import CardLoader from '../../components/CardLoader';
import ChatBubble from '../../components/ChatBubble';
import EmojiPicker from '../../components/EmojiPicker';
import EmptyValuePlaceholder from '../../components/EmptyValuePlaceholder';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useToast } from '../../hooks/useToast';
import { selectAuthUser } from '../../redux/auth/auth.slice';
import {
  useGetSingleThreadQuery,
  useUpdateInteractedByMutation,
  useUpdateInteractionsCountMutation,
} from '../../redux/thread/thread.service';
import { selectSelectedThread, setSelectedThread } from '../../redux/thread/thread.slice';
import { IThread } from '../../redux/thread/types';
import { getFullName } from '../../utils/commonUtils';
import styles from './threadRoom.module.scss';

const ThreadRoom = () => {
  const { threadId } = useParams();
  const { matches: isMobile } = useMediaQuery('(max-width: 800px');
  const { isLoading: threadLoading } = useGetSingleThreadQuery(threadId, { skip: !threadId });

  const [updateInteractions] = useUpdateInteractionsCountMutation();
  const [updatedInteractedBy] = useUpdateInteractedByMutation();

  const selectedThread = useSelector(selectSelectedThread);
  const authUser = useSelector(selectAuthUser);

  const dispatch = useDispatch();
  const pubnub = usePubNub();
  const { errorToast } = useToast();

  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [channels, setChannels] = useState<Array<string>>([]);
  const [allMessages, setAllMessages] = useState<Array<IInteraction> | undefined>(undefined);
  const [message, setMessage] = useState<string>('');

  const scrollerRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      dispatch(setSelectedThread(undefined));
      pubnub.unsubscribe({ channels });
    };
  }, []);

  useEffect(() => {
    scrollerRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allMessages]);

  useEffect(() => {
    if (!selectedThread?._id) return;
    setChannels([selectedThread._id]);
  }, [selectedThread]);

  useEffect(() => {
    try {
      if (isEmpty(pubnub) || !channels?.length) return;
      pubnub.subscribe({ channels });
      pubnub.addListener({ message: handelIncomingMessage });
      pubnub
        .fetchMessages({ channels, includeMessageActions: true, count: 25, end: Date.now() })
        .then((res: FetchMessagesResponse) => {
          const channel = channels[0] as string;

          const tempMessages = res?.channels?.[channel]?.map(e => e?.message);
          setAllMessages(tempMessages ?? []);
        });
    } catch (err) {
      errorToast();
    }
  }, [pubnub, channels]);

  const handelIncomingMessage = (messageEvent: MessageEvent) => {
    setAllMessages(prev => {
      if (prev) {
        return [...prev, messageEvent.message];
      } else {
        [].concat(messageEvent.message);
      }
    });
  };

  const sendMessage = async () => {
    try {
      if (!message || !channels?.length || !selectedThread?._id || !authUser?._id) return;

      await pubnub.publish({
        channel: channels[0],
        storeInHistory: true,
        message: {
          message,
          threadId: selectedThread?._id,
          user: {
            _id: authUser._id,
            userType: authUser.userType,
            firstName: authUser?.firstName,
            lastName: authUser?.lastName,
          },
          timeStamp: Date.now(),
        },
      });

      await updateInteractions({
        threadId: selectedThread?._id,
        action: 'INCREMENT',
      });

      if (authUser?._id && !selectedThread?.interactedBy?.includes(authUser?._id)) {
        await updatedInteractedBy(selectedThread?._id);
        const updatedThread: IThread = {
          ...selectedThread,
          interactedBy: [...selectedThread.interactedBy, authUser._id],
        };
        dispatch(setSelectedThread(updatedThread));
      }
      setMessage('');
      if (showEmojiPicker) setShowEmojiPicker(false);
    } catch (err) {
      errorToast();
    }
  };

  const handleMessageChange = (e: any) => {
    setMessage(e?.target?.value);
  };

  const handleDelete = (messageTimeToken: number, threadId: string) => {
    pubnub.addMessageAction(
      {
        channel: threadId,
        messageTimetoken: String(messageTimeToken),
        action: {
          type: 'deleted',
          value: 'This message is deleted!',
        },
      },
      async status => {
        if (status?.error) {
          errorToast('Error deleting message!');
        } else {
          setAllMessages(prev => prev?.filter(e => e.timeStamp !== messageTimeToken) ?? []);
          await updateInteractions({
            threadId: selectedThread?._id ?? '',
            action: 'DECREMENT',
          });
        }
      },
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.thread}>
        {threadLoading || !allMessages ? (
          <CardLoader size='large' wrapperStyle={{ height: '800px' }} />
        ) : (
          <>
            <div className={styles.details_wrapper}>
              <p className={styles.title}>{selectedThread?.title}</p>
              <p className={styles.description}>{selectedThread?.description}</p>
              <Tag className={styles.category_tag}>{selectedThread?.category?.label}</Tag>

              <div className={styles.bottom_details_wrapper}>
                <Space direction={isMobile ? 'vertical' : 'horizontal'}>
                  <span className={styles.label}>Posted By:</span>
                  <span className={styles.value}>
                    {selectedThread?.postAnonymously
                      ? 'Anonymous User'
                      : getFullName(
                          selectedThread?.postedBy?.firstName ?? '',
                          selectedThread?.postedBy?.lastName ?? '',
                        )}
                  </span>
                </Space>

                <Space direction={isMobile ? 'vertical' : 'horizontal'}>
                  <span className={styles.label}>Posted on:</span>
                  <span className={styles.value}>
                    {selectedThread?.createdAt
                      ? DateTime.fromMillis(selectedThread?.createdAt ?? 0).toFormat('dd LLL yyyy')
                      : ''}
                  </span>
                </Space>
              </div>
            </div>

            <div className={styles.bottom_section} id='chat_area'>
              <div className={styles.interactions_wrapper}>
                {allMessages?.length ? (
                  <>
                    {allMessages.map((e: IInteraction, index) => (
                      <ChatBubble
                        // canDelete={e?.user?._id === authUser?._id}
                        canDelete={false}
                        key={index}
                        interaction={e}
                        placement={e?.user?._id === authUser?._id ? 'right' : 'left'}
                        handleDelete={handleDelete}
                      />
                    ))}
                    <div ref={scrollerRef} />
                  </>
                ) : (
                  <EmptyValuePlaceholder
                    style={{ marginTop: '6rem' }}
                    text='No interactions yet...'
                  />
                )}
              </div>

              <div className={styles.input_wrapper}>
                <Input
                  placeholder='Type your message here...'
                  className={styles.input}
                  onSubmit={sendMessage}
                  value={message}
                  onChange={handleMessageChange}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      sendMessage();
                    }
                  }}
                />

                <Space>
                  {!isMobile && (
                    <Button
                      onClick={() => setShowEmojiPicker(prev => !prev)}
                      type='ghost'
                      icon={<i className='ri-emotion-line'></i>}
                    />
                  )}
                  <Button
                    onClick={sendMessage}
                    type='primary'
                    icon={<i className='ri-send-plane-2-fill'></i>}
                    style={{ borderRadius: '4px' }}
                  />
                </Space>
              </div>
              {showEmojiPicker && (
                <EmojiPicker setter={setMessage} onClose={() => setShowEmojiPicker(false)} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ThreadRoom;
