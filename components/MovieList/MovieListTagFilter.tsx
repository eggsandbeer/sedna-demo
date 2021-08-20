import { SyntheticEvent, useContext } from 'react';

import { TagSearchContext } from '../../pages';

import IconInput from '../Input/IconInput';

import GridStyles from '../../styles/Grid.module.css';

const MovieListTagFilter: React.FC = () => {
  const { tagFilter, setTagFilter } = useContext(TagSearchContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value: nextValue } = event.target;
    setTagFilter && setTagFilter(nextValue);
  };

  return (
    <div className={`${GridStyles.flexGrid}`}>
      <div className={`${GridStyles.col2} ${GridStyles.offset4} `}>
        <IconInput
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
              width="20"
              height="20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          }
          value={tagFilter || ''}
          onChange={handleChange}
          placeholder={'Search Tags'}
        />
      </div>
    </div>
  );
};

export default MovieListTagFilter;
