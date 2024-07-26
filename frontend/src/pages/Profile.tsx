import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import BaseView from '@/src/components/Templates/BaseView/BaseView';
import { useGetPostsQuery, RootState } from '@/src/store';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Profile = () => {
  const user = useSelector<RootState>((state) => state.user);
  const { data: posts, isLoading } = useGetPostsQuery();
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    if (posts) {
      const filtered = [...posts].filter((post) => post.data.author.toLowerCase() === user?.toLowerCase());

      setFilteredPosts(filtered);
    }
  }, [posts, user]);

  return (
    <Box>
      <BaseView posts={filteredPosts} />
      <Backdrop open={isLoading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default Profile;
