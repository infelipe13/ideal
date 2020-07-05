import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Button, Input, Layout } from 'src/components';
import { authService } from 'src/services';
import { getSession } from 'src/utils/auth';

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const login = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    await authService.login(email);

    router.replace('/');
  };

  const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <Layout bodyAs="form" heading="Entrar" onSubmit={login}>
      <Input
        addon="@"
        hint="Obrigatório"
        label="Endereço de e-mail"
        placeholder="johndoe@mail.com"
        onChange={updateEmail}
      />
      <Button expand>Entrar</Button>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req);

  if (session) {
    res.writeHead(302, { Location: '/score' });
    res.end();
  }

  return { props: {} };
};

export default Page;
