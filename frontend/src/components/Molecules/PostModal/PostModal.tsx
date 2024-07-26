import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import AlertDialog from '@/src/components/Atoms/AlertDialog/AlertDialog';
import LoginDialog from '@/src/components/Molecules/LoginDialog/LoginDialog';
import { setUser, useCreatePostMutation, useGetPostsQuery, useUpdatePostMutation, RootState, IPost } from '@/src/store';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const StyledCreatePost = {
  width: '80%',
  minWidth: '300px',
  height: '80%',
  bgcolor: 'background.paper',
};

interface IPostModalProps {
  open: boolean;
  close: () => void;
  response: () => void;
  initialPost?: IPost | null;
  postsCount: number;
}

const PostModal: FC<IPostModalProps> = ({ open, close, response, initialPost, postsCount }) => {
  const [createPost, { error, isSuccess }] = useCreatePostMutation();
  const [updatePost, { error: updateError, isSuccess: updateIsSuccess }] = useUpdatePostMutation();
  const user = useSelector<RootState>((state) => state.user);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [isEmailCorrect, setIsEmailCorrect] = useState<boolean>(true);
  const [isPostCorrect, setIsPostCorrect] = useState<boolean>(true);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState<boolean>(false);
  const [isWrongAuthor, setIsWrongAuthor] = useState<boolean>(false);

  useEffect(() => {
    if (error || isSuccess || updateError || updateIsSuccess) {
      if (error || isSuccess) {
        response(error ?? isSuccess);
      }

      if (updateError || updateIsSuccess) {
        response(updateError ?? updateIsSuccess);
      }
    }
  }, [error, isSuccess, updateError, updateIsSuccess]);

  const handleClose = () => {
    setOpenLogin(false);
  };

  const handleAlertClose = () => {
    close();
    setIsWrongAuthor(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const email = formJson.email;
    if (!emailRegex.test(email)) {
      setIsEmailCorrect(false);
      return;
    }
    localStorage.removeItem('wasHomeModalShown');
    sessionStorage.setItem('user', email);
    handleClose();

    return dispatch(setUser(email));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      setOpenLogin(true);

      return;
    }

    if (initialPost && user !== initialPost.data.author) {
      setIsWrongAuthor(true);

      return;
    }

    const formData = new FormData(e.target);
    const formJson = Object.fromEntries((formData as any).entries());
    const body = formJson.body;

    if (!body) {
      setIsPostCorrect(false);

      return;
    }

    const postBody = {
      data: {
        body,
        author: user,
        created: initialPost ? initialPost.data.created : null,
      },
      id: initialPost ? initialPost.id : postsCount + 1,
    };

    initialPost ? updatePost(postBody) : createPost(postBody);
    close();
  };

  const handleChange = (e) => {
    if (!initialPost) {
      setIsSubmitEnabled(!!e.target.value);
    } else {
      setIsSubmitEnabled(e.target.value !== initialPost.data.body && !!e.target.value);
    }
  };

  return (
    <>
      <Modal open={open}>
        <Box className="modal" sx={StyledCreatePost}>
          <Typography variant="h3" component="h2" color="textSecondary">
            {t('create.header')}
          </Typography>
          <Container maxWidth="xl" component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
            <TextField
              multiline
              autoFocus
              required
              onChange={handleChange}
              error={!isPostCorrect}
              id="body"
              name="body"
              sx={{ width: '100%' }}
              variant="standard"
              label={t('create.inputLabel')}
              defaultValue={initialPost ? initialPost.data.body : null}
            />
            <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
              <Button variant="contained" color="error" onClick={close}>
                {t('create.button.cancel')}
              </Button>
              <Button variant="contained" color="success" type="submit" disabled={!isSubmitEnabled}>
                {t('create.button.send')}
              </Button>
            </Container>
          </Container>
        </Box>
      </Modal>

      <LoginDialog open={openLogin} closeDialog={handleClose} handleLogin={handleLogin} isError={!isEmailCorrect} />

      <AlertDialog
        open={isWrongAuthor}
        closeDialog={handleAlertClose}
        label={t('create.button.close')}
        title={t('create.authorEdit')}
      />
    </>
  );
};

export default PostModal;
