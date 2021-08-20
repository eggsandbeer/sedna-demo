import { memo } from 'react';
import { format } from 'date-fns';

import InfoDisplayStyles from './MovieInfoDisplay.module.css';

const InfoDisplay: React.FC<{
  createdAt: string;
  title: string;
}> = ({ createdAt, title }) => {
  const createDate = new Date(createdAt);

  return (
    <p>
      <strong className={`${InfoDisplayStyles.title}`}>{title}</strong>
      {/* Probably worth react memozing this in separate component */}
      <time dateTime={createdAt} className={`${InfoDisplayStyles.date}`}>
        {format(createDate, 'EEEE, MMMM do, yyyy')}
        <br />
        {format(createDate, 'hh:mma')}
      </time>
    </p>
  );
};

export default memo(InfoDisplay);
