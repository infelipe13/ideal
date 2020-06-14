import { MagicUserMetadata } from 'magic-sdk';
import { GetServerSidePropsContext } from 'next';

import { withProtection } from 'src/hofs/withProtection';

type Props = {
  name: string;
  session: MagicUserMetadata;
};

const Page = (props: Props) => {
  console.log(props);

  return <h1>Dashboard</h1>;
};

export const getServerSideProps = withProtection(
  async (ctx: GetServerSidePropsContext) => {
    console.log(ctx);

    return { name: 'Felipe' };
  }
);

export default Page;
