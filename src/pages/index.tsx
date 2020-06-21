import { Magic } from 'magic-sdk';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Button, Input, Layout } from 'src/components';
import { getSession } from 'src/utils/auth';

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  return (
    <Layout bodyAs="form" heading="Entrar" onSubmit={(e) => e.preventDefault()}>
      <Input
        addon="@"
        hint="Obrigatório"
        label="Endereço de e-mail"
        placeholder="johndoe@mail.com"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Button
        expand
        onClick={async () => {
          try {
            const magic = new Magic(process.env.MAGIC_PUBLISHABLE_KEY!);
            const didToken = await magic.auth.loginWithMagicLink({ email });

            await fetch('/api/auth/login', {
              body: JSON.stringify({ email }),
              headers: {
                Authorization: `Bearer ${didToken}`,
                'Content-Type': 'application/json',
              },
              method: 'POST',
            });

            router.replace('/score');
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Entrar
      </Button>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req);

  if (session) {
    res.writeHead(302, { Location: '/profile' });
    res.end();
  }

  return { props: {} };
};
