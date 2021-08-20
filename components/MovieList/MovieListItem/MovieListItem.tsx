import React, { useContext, useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Chip from '../../Chip/Chip';

import { TagSearchContext } from '../../../pages';

import MovieInfoDisplay from './MovieInfoDisplay';

import { Movie } from '../../../hooks/useFetchMovies';

import GridStyles from '../../../styles/Grid.module.css';
import ButtonStyles from '../../../styles/Button.module.css';
import MovieListItemStyles from './MovieListItem.module.css';

const TAGSSTORAGEKEY = 'tags';

interface Tag {
  content: string;
  id: string;
}

interface TagsLocalStorage {
  [key: string]: Tag[];
}

function handleGetTagsFromLocalStorage(): TagsLocalStorage | {} {
  const tags = localStorage.getItem(TAGSSTORAGEKEY);
  if (!tags) return {};
  return JSON.parse(tags);
}

function handleLocalStorageUpdate(movieItemId: number, newTags: Tag[]) {
  const localStorageTags: TagsLocalStorage = handleGetTagsFromLocalStorage();

  localStorage.setItem(
    TAGSSTORAGEKEY,
    JSON.stringify({
      ...localStorageTags,
      [movieItemId]: newTags,
    })
  );
}

// TODO Could break this down into more granular pieces (add tags, display tags, etc.) but just sorta ran out of time.
const MovieListItem: React.FC<Movie> = ({
  id: movieItemId,
  created_at,
  name,
}) => {
  const localStorageTags: TagsLocalStorage = useMemo(
    () => handleGetTagsFromLocalStorage(),
    []
  );

  const [addTagText, setAddTagText] = useState<string>('');
  const [tags, setTags] = useState<Tag[] | []>(
    localStorageTags[movieItemId] || []
  );

  const { tagFilter } = useContext(TagSearchContext);

  const hasTagSearcHMatch = tags.filter((tag) => {
    return tag.content.includes(tagFilter || '');
  });

  if (hasTagSearcHMatch.length === 0 && tagFilter !== '') {
    return null;
  }

  return (
    <div className={`${GridStyles.flexGrid} ${MovieListItemStyles.item}`}>
      <div
        className={`${GridStyles.col3} ${MovieListItemStyles.infoContainer}`}
      >
        <MovieInfoDisplay title={name} createdAt={created_at} />
      </div>
      <div
        className={`${GridStyles.col5} ${MovieListItemStyles.chipContainer}`}
      >
        {tags.map(({ id: tagId, content: tagContent }: Tag) => (
          <Chip
            key={tagId}
            content={tagContent}
            onRemove={() => {
              const tagsWithRemovedTag = [
                ...tags.filter((t: Tag) => t.id !== tagId),
              ];
              setTags(tagsWithRemovedTag);
              handleLocalStorageUpdate(movieItemId, tagsWithRemovedTag);
            }}
          />
        ))}
      </div>
      <div
        className={`${GridStyles.col4} ${MovieListItemStyles.tagAddContainer}`}
      >
        {/* Should probably be broken out into common component */}
        <input
          type="string"
          className={MovieListItemStyles.tagAddInput}
          onChange={(e) => setAddTagText(e.target.value)}
          value={addTagText}
        />
        {/* Should probably be broken out into common component */}
        <button
          className={ButtonStyles.button}
          type="submit"
          disabled={addTagText === ''}
          onClick={() => {
            if (tags.length < 5 && addTagText !== '') {
              const itemTagsWithNew = [
                ...tags,
                {
                  id: uuidv4(),
                  content: addTagText,
                },
              ];

              setTags(itemTagsWithNew);
              setAddTagText('');
              handleLocalStorageUpdate(movieItemId, itemTagsWithNew);
            }
          }}
        >
          Add Tag
        </button>
      </div>
    </div>
  );
};

export default MovieListItem;
