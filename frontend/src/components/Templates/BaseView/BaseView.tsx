import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AddNewPost from '@/src/components/Atoms/AddNewPost/AddNewPost';
import Menu from '@/src/components/Molecules/Menu/Menu';
import PostModal from '@/src/components/Molecules/PostModal/PostModal';
import Footer from '@/src/components/Organisms/Footer/Footer';
import Header from '@/src/components/Organisms/Header/Header';
import PostsList from '@/src/components/Organisms/PostsList/PostsList';
import { IPost } from '@/src/store';
import { Alert, Snackbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const BaseView: FC = ({ posts }: { posts: IPost[] }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openPostModal, setOpenPostModal] = useState<boolean>(false);
  const [isPostSent, setIsPostSent] = useState<null | boolean>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [singlePost, setSinglePost] = useState<null | IPost>(null);
  const { t } = useTranslation();

  const toggleMenu = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleTogglePostModal = () => {
    setSinglePost(null);
    setOpenPostModal((prevState) => !prevState);
  };

  const handleResponse = (res: FetchBaseQueryError | SerializedError | boolean) => {
    if (res) {
      setIsPostSent(typeof res === 'boolean');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleEdit = (post: IPost) => {
    setSinglePost(post);
    setOpenPostModal((prevState) => !prevState);
  };

  return (
    <>
      <Header toggleMenu={toggleMenu} />
      {posts && posts.length > 0 ? (
        <PostsList posts={posts} handleEdit={handleEdit} />
      ) : (
        <Typography color="text.secondary" align="center" sx={{ mt: '10rem', fontSize: '2rem' }}>
          {t('noPosts')}
        </Typography>
      )}
      <Menu
        open={open}
        toggleMenu={toggleMenu(false)}
        handleResponse={handleResponse}
        postsCount={posts?.length ?? 0}
      />
      <AddNewPost isFixed onClick={handleTogglePostModal} />
      <PostModal
        open={openPostModal}
        close={handleTogglePostModal}
        response={handleResponse}
        initialPost={singlePost}
        postsCount={posts?.length ?? 0}
      />
      <Snackbar open={openSnackbar} autoHideDuration={6000}>
        <Alert
          onClose={handleSnackbar}
          severity={isPostSent ? 'success' : 'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {isPostSent ? t('create.alert.success') : t('create.alert.error')}
        </Alert>
      </Snackbar>
      <Footer />
    </>
  );
};

export default BaseView;
