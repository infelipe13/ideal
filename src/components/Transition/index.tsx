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
  return classes.split(' ').filter(({ length }) => length);
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

  const handleEnd = (node: HTMLElement, done: () => void) => {
    node.addEventListener('transitionend', done, false);
  };

  const handleEnter = (node: HTMLElement) => {
    addClasses(node, [...enterClasses, ...enteringClasses]);
  };

  const handleEntering = (node: HTMLElement) => {
    removeClasses(node, [...enteringClasses]);
    addClasses(node, [...enteredClasses]);
  };

  const handleEntered = (node: HTMLElement) => {
    removeClasses(node, [...enterClasses, ...enteredClasses]);
  };

  const handleExit = (node: HTMLElement) => {
    addClasses(node, [...exitClasses, ...exitingClasses]);
  };

  const handleExiting = (node: HTMLElement) => {
    removeClasses(node, [...exitingClasses]);
    addClasses(node, [...exitedClasses]);
  };

  const handleExited = (node: HTMLElement) => {
    removeClasses(node, [...exitClasses, ...exitedClasses]);
  };

  return (
    <CSSTransition
      addEndListener={handleEnd}
      in={show}
      onEnter={handleEnter}
      onEntering={handleEntering}
      onEntered={handleEntered}
      onExit={handleExit}
      onExiting={handleExiting}
      onExited={handleExited}
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
};
