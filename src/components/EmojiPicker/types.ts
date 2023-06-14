import { Dispatch, SetStateAction } from 'react';

export interface IEmojiPicker {
  setter: Dispatch<SetStateAction<string>>;
  onClose: () => void;
}
