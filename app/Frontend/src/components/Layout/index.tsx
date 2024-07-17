import { ReactNode } from 'react';
import Footer from '../Footer';
import Header from '../Header';

interface LayoutProps {
  children: ReactNode;
  titlePage: string;
  haveSearch?: boolean;
  haveFooter?: boolean;
}

function Layout({
  children,
  titlePage, haveSearch = false, haveFooter = false }: LayoutProps): JSX.Element {
  return (
    <>
      <Header titlePage={ titlePage } haveSearch={ haveSearch } />
      <main>
        {children}
      </main>
      { haveFooter && <Footer />}
    </>
  );
}

export default Layout;
