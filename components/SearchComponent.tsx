import React, { useState } from 'react';
import { useFuseSearch } from '@/hooks';
import HighlightedText from '@/components/helper';
import { Input } from '@/components/ui/input';
import { FuseOptions, Item, SearchComponentProps } from '@/lib/types';


const SearchComponent: React.FC<SearchComponentProps> = ({ data }: { data: Item[] }) => {
  const [inputValue, setInputValue] = useState('');
  const fuseOptions: FuseOptions<Item> = { keys: ['title'], includeMatches: true };
  const { results, search } = useFuseSearch(data, fuseOptions);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    search(newValue);
  };
  console.log(results);

  return (
    <div className="mt-3">
      <Input
        className="mt-0.5"
        type="text"
        value={inputValue}
        onChange={handleSearch}
        placeholder="Search by title..."
      />
      {results.map((result, index) => {
        return (
          <div key={result.item.id}>
            <HighlightedText
              title={result.item.title}
              content={result.item.body}
              matches={result.matches!}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SearchComponent;