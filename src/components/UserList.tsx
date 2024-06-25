import React, { useState, useEffect, useMemo, memo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import User from '../types/User';
import { fetchUsers } from '../services/user-api';
import {
  UserListContainer,
  SearchContainer,
  SearchInput,
  UserCard,
  UserCardLink,
  UserImage,
  LoadMoreContainer,
  LoadMoreButton,
} from '../css/UserList.styles';
import { debounce } from '../utils/debounce';
import Loader from './Loader';

const UserListItem = memo(({ user }: { user: User }) => (
  <div className="user-list-item">
    <UserImage src={user.picture.medium} alt={user.name.first} />
    <p>{user.name.first} {user.name.last}</p>
    <p>{user.email}</p>
  </div>
));

const UserList: React.FC = () => {
  const [query, setQuery] = useState('');
  const [inputValue, setInputValue] = useState('');

  const {
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    data,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['users', query],
    queryFn: ({ pageParam = 1 }) => fetchUsers(pageParam, query),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.info?.next ?? undefined,
    refetchOnWindowFocus: false, // to remove flickering on page refresh
    staleTime: 1000 * 60, // Data is fresh for 1 minute
  });

  const debouncedSetQuery = useMemo(
    () =>
      debounce((value: string) => {
        setQuery(value);
      }, 800),
    []
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    debouncedSetQuery(value);
  };

  useEffect(() => {
    refetch();
  }, [query, refetch]);

  return (
    <>
      {(isFetching && !isFetchingNextPage) && <Loader />}
      <SearchContainer>
        <SearchInput
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Search users"
        />
        {error && <div>Error: {error.message}</div>}
      </SearchContainer>
      <UserListContainer>
        {!error && data && data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.results.map((user: User) => (
              <UserCardLink key={user.login.uuid} to={`/user/${user.login.uuid}`}>
                <UserCard>
                  <UserListItem user={user} />
                </UserCard>
              </UserCardLink>
            ))}
          </React.Fragment>
        ))}
      </UserListContainer>
      <LoadMoreContainer>
        <LoadMoreButton
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load More" : "Nothing more to load"}
        </LoadMoreButton>
      </LoadMoreContainer>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};

export default memo(UserList);