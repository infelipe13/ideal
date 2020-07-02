import Head from 'next/head';

import { Div100Vh } from 'src/components';
import { Body } from 'src/components/Layout/Body';
import { Header } from 'src/components/Layout/Header';

type Props = React.HTMLAttributes<HTMLElement> & {
  bodyAs?: keyof React.ReactHTML;
  heading: string;
};

export const Layout = ({ bodyAs = 'div', heading, ...rest }: Props) => (
  <>
    <Head>
      <title>iDeal - {heading}</title>
    </Head>
    <Div100Vh className="flex flex-col">
      <Header />
      <Body as={bodyAs} heading={heading} {...rest} />
    </Div100Vh>
  </>
);
