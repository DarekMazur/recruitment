import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import Page404 from '@/src/pages/404';
import Home from '@/src/pages/Home';
import Profile from '@/src/pages/Profile';
import { setLogin, setUser, RootState } from '@/src/store';

const Root = () => {
  const user = useSelector<RootState>((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      dispatch(setUser(sessionStorage.getItem('user')));
      dispatch(setLogin(false));
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="profile" element={user ? <Profile /> : <Page404 />} />
      <Route path="404" element={<Page404 />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default Root;
