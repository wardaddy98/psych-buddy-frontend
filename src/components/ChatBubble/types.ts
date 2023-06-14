import { IInteraction } from '../../commonTypes';

export interface IChatBubble {
  placement: 'left' | 'right';
  interaction: IInteraction;
  canDelete: boolean;
  handleDelete?: (timeStamp: number, threadId: string) => void;
}
