import { Button } from 'antd';
import { BaseEmoji, EmojiData, Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import styles from './emojiPicker.module.scss';
import { IEmojiPicker } from './types';

const EmojiPicker = (props: IEmojiPicker) => {
  const { setter, onClose } = props;

  const handleChange = (emoji: EmojiData & BaseEmoji) => {
    setter(prev => prev + emoji?.native);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.button_wrapper}>
        <Button
          size='large'
          type='ghost'
          onClick={onClose}
          icon={<i className='ri-close-line'></i>}
        />
      </div>
      <Picker
        style={{ border: 'none' }}
        set='apple'
        showPreview={false}
        theme='light'
        color='#078080'
        title=''
        emoji=''
        onSelect={handleChange}
      />
      ;
    </div>
  );
};

export default EmojiPicker;
