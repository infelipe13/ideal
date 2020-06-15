import { Magic } from 'magic-sdk';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { getSession } from 'lib/iron';
import { Button, Div100Vh, Input, Panel } from 'src/components';

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  return (
    <Div100Vh className="flex items-center justify-center">
      <Panel>
        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input
            addon="@"
            hint="Obrigatório"
            label="Endereço de email"
            placeholder="johndoe@mail.com"
            onChange={(e) => setEmail(e.target.value)}
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

                router.replace('/dashboard');
              } catch (error) {
                console.error(error);
              }
            }}
          >
            Entrar
          </Button>
        </form>
      </Panel>
    </Div100Vh>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req);

  if (session) {
    res.setHeader('location', '/dashboard');
    res.statusCode = 302;
    res.end();
  }

  return { props: {} };
};

export default Page;
