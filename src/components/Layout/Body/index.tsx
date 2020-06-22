import { Container, Panel } from 'src/components';

type Props = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
  as: keyof React.ReactHTML;
  heading: string;
};

export const Body = ({ as, children, heading, ...rest }: Props) => {
  return (
    <Container as="main" className="flex-grow min-w-full">
      <h1 className="my-16 font-extrabold text-x5 sm:my-32">{heading}</h1>
      <Panel
        as={as}
        className="flex flex-col items-center min-w-full mx-auto space-y-8"
        {...rest}
      >
        {children}
      </Panel>
    </Container>
  );
};
