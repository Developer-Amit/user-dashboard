import React, { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import User from '../types/User';
import { fetchUsers } from '../services/user-api';
import { UserListContainer, SearchContainer, SearchInput, UserCard, UserCardLink, UserImage, LoadMoreContainer, LoadMoreButton } from '../css/UserList.styles';


const UserList: React.FC = () => {
  const [query, setQuery] = useState('');
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
    getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
  });

  useEffect(() => {
    refetch();
  }, [query, refetch]);

  return (
    <>
      <SearchContainer>
        <SearchInput
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users"
        />
        {error && <div>Error: {error.message}</div>}
      </SearchContainer>
      <UserListContainer>
        {!error && data && data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((user: User) => (
              <UserCardLink key={user.login.uuid} to={`/user/${user.login.uuid}`}>
                <UserCard>
                  <UserImage src={user.picture.medium} alt={user.name.first} />
                  <h3>{user.name.first} {user.name.last}</h3>
                  <p>{user.email}</p>
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

export default UserList;
