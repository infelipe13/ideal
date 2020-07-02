import { GetServerSideProps } from 'next';

import { Button, Input, Layout } from 'src/components';
import { withProtection } from 'src/hofs';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const Page = () => {
  return (
    <Layout
      bodyAs="form"
      heading="Pontuar"
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        hint="Obrigatório"
        label="Telefone celular"
        placeholder="(00) 9 1234-1234"
      />
      <Button expand onClick={noop}>
        Pontuar
      </Button>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withProtection();

export default Page;
