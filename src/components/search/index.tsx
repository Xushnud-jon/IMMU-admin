// @component/Search.tsx
import { Input } from 'antd';
import { type ChangeEvent } from 'react';

type SearchPropsType = {
  params: { search: string; page: number; limit: number }; // page va limitni qo'shish
  setParams: (params: { search: string; page: number; limit: number }) => void; // bu yerda ham page va limit qo'shish
};

const Search = ({ params, setParams }: SearchPropsType) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setParams({ search: value, page: 1, limit: params.limit }); // page va limitni saqlash
  };

  return (
    <Input.Search
      placeholder="Search..."
      value={params.search}
      onChange={handleSearchChange}
      style={{ width: 200 }}
    />
  );
};

export default Search;
