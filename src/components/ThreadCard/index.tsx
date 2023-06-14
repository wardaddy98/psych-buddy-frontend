import { Button, Card, Divider, Space, Tag } from 'antd';
import styles from './threadCard.module.scss';

import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../commonTypes';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useToast } from '../../hooks/useToast';
import { selectAuthUser, setUser } from '../../redux/auth/auth.slice';
import {
  useDeleteThreadMutation,
  useSaveThreadMutation,
  useUnSaveThreadMutation,
} from '../../redux/thread/thread.service';
import { selectSavedThreads, setSavedThreads } from '../../redux/thread/thread.slice';
import { getFullName } from '../../utils/commonUtils';
import TextOverflow from '../TextOverflow';
import { IThreadCard } from './types';

const ThreadCard = (props: IThreadCard) => {
  const { matches: isMobile } = useMediaQuery('(max-width: 800px');
  const {
    category,
    createdAt,
    description,
    postAnonymously,
    postedBy,
    title,
    interactionsCount,
    _id,
  } = props.thread;

  const [saveThreadApi, { isLoading: saveThreadLoading }] = useSaveThreadMutation();
  const [unSaveThreadApi, { isLoading: unSaveThreadLoading }] = useUnSaveThreadMutation();
  const [deleteThreadApi, { isLoading: deleteThreadLoading }] = useDeleteThreadMutation();

  const authUser = useSelector(selectAuthUser);
  const savedThreads = useSelector(selectSavedThreads);
  const [isSaved, setIsSaved] = useState<boolean>(authUser?.savedThreads?.includes(_id) ?? false);

  const { successToast, errorToast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setIsSaved(authUser?.savedThreads?.includes(_id) ?? false);
  }, [authUser.savedThreads]);

  const handleCardClick = () => {
    navigate(`/thread-room/${_id}`);
  };

  const saveThread = async () => {
    try {
      const result = await saveThreadApi(_id).unwrap();

      if (result.status === 200) {
        successToast(result.message);
        const updatedThreads: Array<string> = authUser?.savedThreads
          ? [...authUser.savedThreads]
          : [];
        updatedThreads.push(_id);
        const updatedUser: IUser = { ...authUser, savedThreads: updatedThreads };
        dispatch(setUser(updatedUser));
      }
    } catch (err: any) {
      errorToast(err?.data?.message || undefined);
    }
  };

  const unSaveThread = async () => {
    try {
      const result = await unSaveThreadApi(_id).unwrap();

      if (result.status === 200) {
        successToast(result.message);
        const updatedUser: IUser = {
          ...authUser,
          savedThreads: authUser.savedThreads?.filter(e => e !== _id),
        };
        dispatch(setUser(updatedUser));

        const updatedSavedThreads = [...savedThreads].filter(e => e._id !== _id);
        dispatch(setSavedThreads(updatedSavedThreads));
      }
    } catch (err: any) {
      errorToast(err?.data?.message ?? undefined);
    }
  };

  const handleSaveUnSave = async (e: any) => {
    e?.stopPropagation();
    isSaved ? unSaveThread() : saveThread();
  };

  const deleteThread = async (e: any) => {
    try {
      e?.stopPropagation();
      const result = await deleteThreadApi(_id).unwrap();
      if (result.status === 200) {
        successToast(result.message);
      }
    } catch (err: any) {
      errorToast(err?.data?.message || undefined);
    }
  };

  return (
    <Card
      className={styles.card}
      bodyStyle={{ padding: isMobile ? '1rem' : '1rem 1.5rem' }}
      hoverable
      onClick={handleCardClick}
    >
      <div className={styles.top_content}>
        <div className={styles.first_section}>
          <TextOverflow style={{ fontSize: '1.2rem', fontWeight: 500 }} maxLines={isMobile ? 2 : 1}>
            {title}
          </TextOverflow>
          <TextOverflow style={{ fontSize: '1rem' }} maxLines={isMobile ? 4 : 3}>
            {description}
          </TextOverflow>
          <Tag className={styles.category_tag}>{category.label}</Tag>
        </div>

        <div className={styles.second_section}>
          <div className={styles.detail}>
            <span className={styles.heading}>Posted By: </span>
            <span className={styles.value}>
              {postAnonymously
                ? 'Anonymous User'
                : getFullName(postedBy?.firstName ?? '', postedBy?.lastName ?? '')}
            </span>
          </div>
          <div className={styles.detail}>
            <span className={styles.heading}>Posted on: </span>
            <span className={styles.value}>
              {createdAt ? DateTime.fromMillis(createdAt).toFormat('dd LLL yyyy') : ''}
            </span>
          </div>
        </div>
      </div>
      <Divider type='horizontal' style={{ width: '100%' }} />

      <div className={styles.footer}>
        <Space align='center'>
          <span className={styles.heading}>Interactions:</span>
          <span className={styles.value}>{interactionsCount}</span>
        </Space>

        <Space align='center'>
          {postedBy?._id === authUser?._id ? (
            <Button
              danger
              icon={<i className='ri-delete-bin-6-line'></i>}
              loading={deleteThreadLoading}
              onClick={deleteThread}
            >
              Delete
            </Button>
          ) : (
            <Button
              onClick={handleSaveUnSave}
              type='primary'
              icon={<i className={`ri-save-${isSaved ? 'fill' : 'line'}`}></i>}
              loading={saveThreadLoading || unSaveThreadLoading}
            >
              {isSaved ? 'UnSave' : 'Save'}
            </Button>
          )}
        </Space>
      </div>
    </Card>
  );
};

export default ThreadCard;
