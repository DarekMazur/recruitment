import { FC, Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import PostListAlerts from '@/src/components/Molecules/PostListAlerts/PostListAlerts';
import { IPost, useRemovePostMutation, RootState } from '@/src/store';
import { formatDate } from '@/src/utils/helpers/formatDate';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

interface IPostsListProps {
  posts: IPost[];
  handleEdit: () => void;
}

const PostsList: FC<IPostsListProps> = ({ posts, handleEdit }) => {
  const user = useSelector<RootState>((state) => state.user);
  const [removePost, { isError, isSuccess }] = useRemovePostMutation();
  const { t } = useTranslation();
  const [sortedPosts, setSortedPosts] = useState<IPost[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [postId, setPostId] = useState<null | number>(null);
  const [alert, setAlert] = useState<boolean>(false);
  const [authorAlert, setAuthorAlert] = useState<boolean>(false);

  useEffect(() => {
    if (isError || isSuccess) {
      setAlert(true);
    }
  }, [isError, isSuccess]);

  const handleCloseSnackbar = () => {
    setAlert(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAlertClose = () => {
    setAuthorAlert(false);
    setOpen(false);
  };

  const handleDelete = (post: IPost) => {
    if (post.data.author !== user) {
      setPostId(null);
      setAuthorAlert(true);

      return;
    }

    setOpen(true);
    setPostId(post.id);
  };

  const handleConfirmDelete = () => {
    setOpen(false);
    removePost(postId);
    setPostId(null);
  };

  useEffect(() => {
    if (posts) {
      const sorted = [...posts];
      sorted.sort((a, b) => {
        return b.data.created - a.data.created;
      });

      setSortedPosts([...sorted]);
    }
  }, [posts]);

  return (
    <>
      {sortedPosts && sortedPosts.length > 0 ? (
        sortedPosts.map((post, index) => (
          <Fragment key={post.id}>
            <Card sx={{ p: '1.5rem 1rem' }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: blue[500] }} alt="">
                    <TextsmsOutlinedIcon />
                  </Avatar>
                }
                title={post.data.author}
                subheader={`${formatDate(post.data.created)}${
                  post.data.created !== post.data.edited ? ' (edited)' : ''
                }`}
              />
              <CardContent>
                <Typography color="text.secondary">{post.data.body}</Typography>
              </CardContent>
              <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
                <IconButton
                  disabled={!user || user?.toLowerCase() !== post.data.author.toLowerCase()}
                  onClick={() => handleEdit(post)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  disabled={!user || user?.toLowerCase() !== post.data.author.toLowerCase()}
                  onClick={() => handleDelete(post)}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </CardActions>
            </Card>
            {index !== posts.length - 1 ? <Divider /> : null}
          </Fragment>
        ))
      ) : (
        <Box maxWidth="dm" className="center">
          {t('noPosts')}
        </Box>
      )}
      <PostListAlerts
        open={open}
        handleClose={handleClose}
        handleAlertClose={handleAlertClose}
        authorAlert={authorAlert}
        alert={alert}
        handleCloseSnackbar={handleCloseSnackbar}
        handleConfirmDelete={handleConfirmDelete}
        isSuccess={isSuccess}
      />
    </>
  );
};

export default PostsList;
