import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import '@/src/styles/404.scss';

const Page404 = () => {
  const { t } = useTranslation();

  return (
    <section className="styled404">
      <div>
        <div className="bg404">
          <h1>404</h1>
        </div>
        <div className="wrapper404">
          <h3 className="h2">{t('404.header')}</h3>
          <p>{t('404.description')}</p>
          <Link to={'/'}>{t('404.cta')}</Link>
        </div>
      </div>
    </section>
  );
};

export default Page404;
