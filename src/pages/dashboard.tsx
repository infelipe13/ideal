import { GetServerSideProps } from 'next';

import { withProtection } from 'src/hofs/withProtection';
import { Button, Input, Layout, Panel } from 'src/components';

const Page = () => {
  return (
    <Layout heading="Dashboard">
      <Panel>
        <form
          className="mx-auto space-y-8 sm:max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input
            hint="Obrigatório"
            label="Número de telefone celular"
            placeholder="(00) 9 1234-1234"
          />
          <Button expand onClick={async () => {}}>
            Pontuar
          </Button>
        </form>
      </Panel>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withProtection();

export default Page;
