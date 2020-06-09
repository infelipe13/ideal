import { Div100Vh } from 'src/components';
import { Body } from 'src/components/Layout/Body';
import { Footer } from 'src/components/Layout/Footer';
import { Header } from 'src/components/Layout/Header';

type Props = {
  children: React.ReactNode;
  heading: string;
};

export const Layout = ({ children, heading }: Props) => {
  return (
    <Div100Vh className="flex flex-col">
      <Header />
      <Body heading={heading}>{children}</Body>
      <Footer />
    </Div100Vh>
  );
};
