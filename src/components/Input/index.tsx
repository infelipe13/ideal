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
  const description = error || help;
  const elId = useMemo(() => id || uid(), [id]);

  return (
    <div className={clsx(className, 'w-full space-y-2 sm:max-w-sm')}>
      <div className="flex justify-between">
        <label className="font-medium text-x2" htmlFor={elId}>
          {label}
        </label>
        {hint && <span className="text-gray-700 text-x2">{hint}</span>}
      </div>
      <div className="relative flex rounded">
        {addon && (
          <span className="inline-flex items-center px-16 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l text-x2">
            {addon}
          </span>
        )}
        <input
          id={elId}
          className={clsx(
            addon ? 'rounded-none rounded-r' : 'rounded',
            error &&
              'pr-32 text-red-900 placeholder-red-500 border-red-300 focus:border-red-300 focus:shadow-outline-red',
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
      {description && (
        <p className={clsx(error && 'text-red-900', 'text-x2')}>
          {description}
        </p>
      )}
    </div>
  );
};
