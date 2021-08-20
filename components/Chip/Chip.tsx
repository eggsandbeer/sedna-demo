import React from 'react';
import ChipStyles from './Chip.module.css';

interface ChipProps {
  content: string;
  onRemove: () => void;
}

const Chip: React.FC<ChipProps> = ({ content, onRemove }) => {
  return (
    <div className={`${ChipStyles.chip}`}>
      <span className={`${ChipStyles.chipLabel}`}>{content}</span>
      <span className={`${ChipStyles.closeIconContainer}`} onClick={onRemove}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
          stroke="currentColor"
          width="15"
          height="15"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </span>
    </div>
  );
};

export default Chip;
