import { TooltipPlacement } from 'antd/es/tooltip';

export interface ITextOverflow {
  children: string;
  wrapperClass?: string;
  tooltipEnabled?: boolean;
  tooltipPlacement?: TooltipPlacement;
  maxLines: number;
  style?: React.CSSProperties;
}
