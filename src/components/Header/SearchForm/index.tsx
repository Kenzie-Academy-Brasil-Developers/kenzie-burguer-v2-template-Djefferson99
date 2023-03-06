import { useState, useContext, FormEvent } from 'react';
import { MdSearch } from 'react-icons/md';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';
import { CartContext } from '../../../Providers/CartContext';

const SearchForm = () => {
  const [searchValue, setSearchValue] = useState('');
  const { setSearch } = useContext(CartContext);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearch(searchValue);
    setSearchValue('');
  }

  return (
    <StyledSearchForm onSubmit={submit}>
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        type='text'
        placeholder='Digitar Pesquisa'
      />
      <StyledButton type='submit' $buttonSize='medium' $buttonStyle='green'>
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

export default SearchForm;
