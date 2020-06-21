import { Div100Vh } from 'src/components';
import { Body } from 'src/components/Layout/Body';
import { Header } from 'src/components/Layout/Header';

type Props = React.HTMLAttributes<HTMLElement> & {
  bodyAs?: keyof React.ReactHTML;
  children: React.ReactNode;
  heading: string;
};

export const Layout = ({ bodyAs = 'div', children, heading }: Props) => {
  return (
    <Div100Vh className="flex flex-col">
      <Header />
      <Body as={bodyAs} heading={heading}>
        {children}
      </Body>
    </Div100Vh>
  );
};
