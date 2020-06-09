import { Container } from 'src/components';

type BodyProps = {
  children?: React.ReactNode;
  heading: string;
};

export const Body = ({ children, heading }: BodyProps) => {
  return (
    <Container>
      <h1 className="my-16 font-extrabold text-x5 sm:my-32">{heading}</h1>
      {children}
    </Container>
  );
};
