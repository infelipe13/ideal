import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';
import uid from 'uid';

import { Icon } from 'src/components/Icon';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  addon?: string;
  error?: string;
  help?: string;
  hint?: string;
  label: string;
};

export const Input = ({
  addon,
  error,
  help,
  hint,
  id = uid(),
  label,
  ...rest
}: Props) => {
  const ErrorOrHelp = () => {
    if (error) {
      return <p className="text-red-900 text-2">{error}</p>;
    }

    if (help) {
      return <p className="text-2">{help}</p>;
    }

    return null;
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <label className="font-medium text-x2" htmlFor={id}>
          {label}
        </label>
        {hint && <span className="text-gray-500 text-x2">{hint}</span>}
      </div>
      <div className="relative flex rounded shadow-sm">
        {addon && (
          <span className="inline-flex items-center px-16 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l text-x2">
            {addon}
          </span>
        )}
        <input
          id={id}
          className={clsx(
            addon ? 'rounded-none rounded-r' : 'rounded',
            {
              'pr-32 text-red-900 placeholder-red-500 border-red-300 focus:border-red-300 focus:shadow-outline-red': error,
            },
            'block w-full px-16 py-8 text-x2 form-input'
          )}
          {...rest}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
            <Icon className="w-16 h-16 text-red-900" name="exclamationCircle" />
          </div>
        )}
      </div>
      <ErrorOrHelp />
    </div>
  );
};
