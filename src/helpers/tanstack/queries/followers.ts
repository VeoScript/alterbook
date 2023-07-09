import { useInfiniteQuery } from '@tanstack/react-query';
import api from '../../../config/Axios';

export const useGetFollowers = () => {
  return useInfiniteQuery(['followers'],
    async ({ pageParam = ''}) => {
      const followers = await api.get(`/api/follow/followers?cursor=${pageParam}`);
      return followers.data;
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
      onError: (error: any) => {
        console.error('ERROR FOLLOWERS', error.response.data);
      },
    },
  );
};

export const useGetFollowing = () => {
  return useInfiniteQuery(['following'],
    async ({ pageParam = ''}) => {
      const following = await api.get(`/api/follow/following?cursor=${pageParam}`);
      return following.data;
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
      onError: (error: any) => {
        console.error('ERROR FOLLOWING', error.response.data);
      },
    },
  );
};
