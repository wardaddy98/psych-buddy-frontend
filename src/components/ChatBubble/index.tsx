import { Avatar, Button, Space, Tag } from 'antd';
import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { selectSelectedThread } from '../../redux/thread/thread.slice';
import { getFullName, getInitials } from '../../utils/commonUtils';
import styles from './chatBubble.module.scss';
import { IChatBubble } from './types';

const ChatBubble = (props: IChatBubble) => {
  const { placement, interaction, canDelete = false, handleDelete } = props;
  const { user, message, threadId, timeStamp } = interaction;
  const { matches: isMobile } = useMediaQuery('(max-width: 800px');
  const selectedThread = useSelector(selectSelectedThread);

  const deleteMessage = () => {
    if (!handleDelete) return;
    handleDelete(timeStamp, threadId);
  };

  return (
    <div
      className={styles.wrapper}
      style={
        user?.userType === 'professional'
          ? {
              border: '2px solid #078080',
              alignSelf: placement === 'left' ? 'flex-start' : 'flex-end',
            }
          : { alignSelf: placement === 'left' ? 'flex-start' : 'flex-end' }
      }
    >
      <Avatar className={styles.avatar} size={isMobile ? 'default' : 'large'} gap={1}>
        {user?.firstName &&
          user?.lastName &&
          getInitials(user?.firstName ?? '', user.lastName ?? '')}
      </Avatar>

      <div className={styles.content}>
        <div className={styles.user_name_section}>
          <div className={styles.delete_section}>
            <span className={styles.user_name}>
              {getFullName(user?.firstName ?? '', user?.lastName ?? '')}
            </span>
            {canDelete && (
              <Button
                size='small'
                danger
                icon={<i className='ri-delete-bin-6-line'></i>}
                onClick={deleteMessage}
              />
            )}
          </div>

          <Space direction={isMobile ? 'vertical' : 'horizontal'} style={{ marginTop: '8px' }}>
            {user?.userType === 'professional' && (
              <Tag className={styles.tag}>Healthcare Professional</Tag>
            )}
            {!selectedThread?.postAnonymously && selectedThread?.postedBy?._id === user?._id && (
              <Tag className={styles.tag}>Original Poster</Tag>
            )}
          </Space>
        </div>

        <p className={styles.message}>{message}</p>

        <div className={styles.time_wrapper}>
          <span>{DateTime.fromMillis(timeStamp).toLocaleString(DateTime.DATETIME_SHORT)}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
