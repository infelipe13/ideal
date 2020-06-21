import clsx from 'clsx';
import { useMemo } from 'react';
import uid from 'uid';

import { Icon } from 'src/components';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  addon?: string;
  error?: string;
  help?: string;
  hint?: string;
  label: string;
};

export const Input = ({
  addon,
  className,
  error,
  help,
  hint,
  id,
  label,
  ...rest
}: Props) => {
  const elId = useMemo(() => id || uid(), []);

  const Hint = () => {
    return hint ? <span className="text-gray-500 text-x2">{hint}</span> : null;
  };

  const Addon = () => {
    return addon ? (
      <span className="inline-flex items-center px-16 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l text-x2">
        {addon}
      </span>
    ) : null;
  };

  const ErrorIcon = () => {
    return error ? (
      <div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
        <Icon className="w-16 h-16 text-red-900" name="exclamationCircle" />
      </div>
    ) : null;
  };

  const Description = () => {
    if (error) {
      return <p className="text-red-900 text-x2">{error}</p>;
    }

    if (help) {
      return <p className="text-x2">{help}</p>;
    }

    return null;
  };

  const classes = {
    container: clsx(className, 'w-full space-y-2 sm:max-w-sm'),
    input: clsx(
      addon ? 'rounded-none rounded-r' : 'rounded',
      {
        'pr-32 text-red-900 placeholder-red-500 border-red-300 focus:border-red-300 focus:shadow-outline-red': error,
      },
      'block w-full px-16 py-8 text-x2 form-input'
    ),
  };

  return (
    <div className={classes.container}>
      <div className="flex justify-between">
        <label className="font-medium text-x2" htmlFor={elId}>
          {label}
        </label>
        <Hint />
      </div>
      <div className="relative flex rounded">
        <Addon />
        <input id={elId} className={classes.input} {...rest} />
        <ErrorIcon />
      </div>
      <Description />
    </div>
  );
};
