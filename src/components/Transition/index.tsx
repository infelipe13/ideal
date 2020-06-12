import { CSSTransition } from 'react-transition-group';

type Props = {
  enter?: string;
  entering?: string;
  entered?: string;
  exit?: string;
  exiting?: string;
  exited?: string;
  children: React.ReactNode;
  show: boolean;
};

const addClasses = (node: HTMLElement, classes: string[]) => {
  if (classes.length) {
    node.classList.add(...classes);
  }
};

const removeClasses = (node: HTMLElement, classes: string[]) => {
  if (classes.length) {
    node.classList.remove(...classes);
  }
};

const splitClasses = (classes: string) => {
  return classes.split(' ').filter((name) => name.length);
};

export const Transition = ({
  enter = '',
  entering = '',
  entered = '',
  exit = '',
  exiting = '',
  exited = '',
  children,
  show,
}: Props) => {
  const enterClasses = splitClasses(enter);
  const enteringClasses = splitClasses(entering);
  const enteredClasses = splitClasses(entered);
  const exitClasses = splitClasses(exit);
  const exitingClasses = splitClasses(exiting);
  const exitedClasses = splitClasses(exited);

  return (
    <CSSTransition
      addEndListener={(node: HTMLElement, done: () => void) => {
        node.addEventListener('transitionend', done, false);
      }}
      in={show}
      onEnter={(node: HTMLElement) => {
        addClasses(node, [...enterClasses, ...enteringClasses]);
      }}
      onEntering={(node: HTMLElement) => {
        removeClasses(node, [...enteringClasses]);
        addClasses(node, [...enteredClasses]);
      }}
      onEntered={(node: HTMLElement) => {
        removeClasses(node, [...enterClasses, ...enteredClasses]);
      }}
      onExit={(node: HTMLElement) => {
        addClasses(node, [...exitClasses, ...exitingClasses]);
      }}
      onExiting={(node: HTMLElement) => {
        removeClasses(node, [...exitingClasses]);
        addClasses(node, [...exitedClasses]);
      }}
      onExited={(node: HTMLElement) => {
        removeClasses(node, [...exitClasses, ...exitedClasses]);
      }}
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
};
