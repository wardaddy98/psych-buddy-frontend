import { Tooltip } from 'antd';
import styles from './textOverflow.module.scss';
import { ITextOverflow } from './types';

const TextOverflow = (props: ITextOverflow) => {
  const {
    children,
    wrapperClass,
    tooltipEnabled = true,
    tooltipPlacement = 'top',
    maxLines,
    style,
  } = props;
  return (
    <Tooltip
      title={children}
      placement={tooltipPlacement}
      open={tooltipEnabled ? undefined : false}
    >
      <div
        style={{
          WebkitLineClamp: maxLines,
          ...style,
        }}
        className={`${styles.text_overflow} ${wrapperClass}`}
      >
        {children}
      </div>
    </Tooltip>
  );
};

export default TextOverflow;
