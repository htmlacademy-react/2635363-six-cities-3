import { useState } from 'react';
import { SortingOptionsProps, SortType } from '../../types/types';


const SortingOptions: React.FC<SortingOptionsProps> = ({
  sortType,
  onSortTypeChange,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const handleSortTypeChange = (type: SortType) => {
    onSortTypeChange(type);
    setIsSortOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsSortOpen((prev) => !prev)}
      >
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isSortOpen ? 'places__options--opened' : ''}`}
      >
        <li
          className={`places__option ${sortType === 'Popular' ? 'places__option--active' : ''}`}
          onClick={() => handleSortTypeChange('Popular')}
        >
          Popular
        </li>
        <li
          className={`places__option ${sortType === 'PriceLowToHigh' ? 'places__option--active' : ''}`}
          onClick={() => handleSortTypeChange('PriceLowToHigh')}
        >
          Price: low to high
        </li>
        <li
          className={`places__option ${sortType === 'PriceHighToLow' ? 'places__option--active' : ''}`}
          onClick={() => handleSortTypeChange('PriceHighToLow')}
        >
          Price: high to low
        </li>
        <li
          className={`places__option ${sortType === 'TopRated' ? 'places__option--active' : ''}`}
          onClick={() => handleSortTypeChange('TopRated')}
        >
          Top rated first
        </li>
      </ul>
    </form>
  );
};

export default SortingOptions;
