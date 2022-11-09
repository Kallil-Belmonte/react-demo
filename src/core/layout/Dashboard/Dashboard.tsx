import type { ReactType } from '@/shared/files/types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

type Props = {
  children: ReactType;
};

const Dashboard = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Dashboard;
