import React, { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import User from '../types/User';
import '../css/UserList.css';
import { fetchUsers } from '../services/user-api';
import { Link } from 'react-router-dom';

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
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users"
          className="search-input"
        />
        {error && <div>Error: {error.message}</div>}
      </div>
      <div className="user-list">
        {!error && data && data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((user: User) => (
              <Link key={user.login.uuid} to={`/user/${user.login.uuid}`} className="user-card-link">
                <div className="user-card">
                  <img src={user.picture.medium} alt={user.name.first} className="user-image" />
                  <h3>{user.name.first} {user.name.last}</h3>
                  <p>{user.email}</p>
                </div>
              </Link>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="load-more-container">
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="load-more-button"
        >
          {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load More" : "Nothing more to load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};

export default UserList;
