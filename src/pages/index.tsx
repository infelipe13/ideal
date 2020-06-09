import { Business } from '.prisma/client';
import { Magic } from 'magic-sdk';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

import { Button, Input, Layout, Panel } from 'src/components';

export default ({ business }: { business: Business }) => {
  const [email, setEmail] = useState('');
  const { id, exchangeRate, name } = business;

  return (
    <Layout heading="Home">
      <Panel className="space-y-8">
        <Input
          addon="@"
          hint="Obrigatório"
          label="Endereço de email"
          placeholder="johndoe@mail.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          onClick={async () => {
            const magic = new Magic(process.env.MAGIC_PUBLISHABLE_KEY!);
            const didToken = await magic.auth.loginWithMagicLink({ email });
            const response = await fetch('/api/auth/login', {
              body: JSON.stringify({ email }),
              headers: {
                Authorization: `Bearer ${didToken}`,
                'Content-Type': 'application/json',
              },
              method: 'POST',
            });
            const { business } = await response.json();

            console.log(business);
          }}
        >
          Register/Sign in
        </Button>
        {!!Object.keys(business) && (
          <ul>
            <li>
              <span className="font-medium">ID:</span>
              <span className="text-gray-700"> {id}</span>
            </li>
            <li>
              <span className="font-medium">Email:</span>
              <span className="text-gray-700"> {email}</span>
            </li>
            <li>
              <span className="font-medium">Exchange Rate:</span>
              <span className="text-gray-700"> {exchangeRate}</span>
            </li>
            <li>
              <span className="font-medium">Name:</span>
              <span className="text-gray-700"> {name}</span>
            </li>
          </ul>
        )}
      </Panel>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const response = await fetch('http://localhost:3000/api/business', {
    headers: { cookie: req.headers.cookie! },
  });
  const { business } = await response.json();

  return { props: { business } };
};
