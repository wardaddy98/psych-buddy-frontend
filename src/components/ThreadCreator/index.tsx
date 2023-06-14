import { nanoid } from '@reduxjs/toolkit';
import { Button, Card, Checkbox, Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useToast } from '../../hooks/useToast';
import { useGetCategoriesQuery } from '../../redux/common/common.service';
import { selectCategories } from '../../redux/common/common.slice';
import { ICategory } from '../../redux/common/types';
import { setShowThreadCreator } from '../../redux/mainLayout/mainLayout.slice';
import { useCreateThreadMutation } from '../../redux/thread/thread.service';
import { CreateThreadFormValues } from '../../redux/thread/types';
import styles from './threadCreator.module.scss';

const ThreadCreator = () => {
  const { matches: isMobile } = useMediaQuery('(max-width: 800px)');
  const { isLoading: categoryLoading } = useGetCategoriesQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );
  const [createThread, { isLoading: createThreadLoading }] = useCreateThreadMutation();

  const categories = useSelector(selectCategories);

  const [form] = Form.useForm();
  const { errorToast, successToast } = useToast();
  const dispatch = useDispatch();

  const [formCategories, setFormCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (!categories?.length) return;

    const temp = [...categories];
    temp.push({
      _id: nanoid(),
      label: 'Others',
      value: 'others',
    });

    setFormCategories(temp);
  }, [categories]);

  const onSubmit = async (values: CreateThreadFormValues) => {
    try {
      const result = await createThread(values).unwrap();
      if (result.status === 200) {
        successToast(result.message);
        form.resetFields();
      }
    } catch (err: any) {
      errorToast(err?.data?.message ?? undefined);
    }
  };

  const handleCancelOtherCategory = () => {
    setSelectedCategory('');
    form.setFieldValue('otherCategory', '');
    form.setFieldValue('category', '');
  };

  return (
    <Card
      className={styles.wrapper}
      title='Create Thread'
      extra={
        <Button
          onClick={() => dispatch(setShowThreadCreator(false))}
          icon={<i className='ri-close-line'></i>}
        ></Button>
      }
      bodyStyle={{ padding: isMobile ? '1rem' : '0 4rem 1rem 4rem' }}
    >
      <Form className={styles.form} onFinish={onSubmit} form={form}>
        <Form.Item
          style={{ marginBottom: '10px' }}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          label='Title'
          name='title'
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Description'
          name='description'
          initialValue={''}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <TextArea
            rows={4}
            maxLength={500}
            placeholder='Max length is 500 characters'
            showCount
            style={{ resize: 'none' }}
          />
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {selectedCategory === 'others' ? (
            <Form.Item
              label='Other Category'
              name='otherCategory'
              style={isMobile ? { width: '130px' } : { minWidth: '300px' }}
            >
              <Input
                addonAfter={
                  <Button
                    type='ghost'
                    onClick={handleCancelOtherCategory}
                    icon={<i className='ri-close-line'></i>}
                  />
                }
              />
            </Form.Item>
          ) : (
            <Form.Item
              label='Category'
              name='category'
              style={isMobile ? { width: '130px' } : { minWidth: '300px' }}
              rules={[{ required: true, message: 'Please select the category!' }]}
            >
              <Select
                onChange={category => setSelectedCategory(category)}
                showSearch
                options={formCategories ?? []}
                loading={categoryLoading}
              />
            </Form.Item>
          )}

          <Form.Item
            label='Post Anonymously'
            initialValue={false}
            name='postAnonymously'
            valuePropName='checked'
          >
            <Checkbox />
          </Form.Item>
        </div>
        <Form.Item style={{ marginBottom: '0px' }} className={styles.submit_wrapper}>
          <Button type='primary' htmlType='submit' loading={createThreadLoading}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ThreadCreator;
