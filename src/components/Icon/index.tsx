// Copy path from https://heroicons.dev
const icons = {
  exclamationCircle: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  menu: 'M4 6h16M4 12h16M4 18h16',
  x: 'M6 18L18 6M6 6l12 12',
};

type Props = {
  className?: string;
  name: keyof typeof icons;
};

export function Icon({ className = '', name }: Props) {
  const path = icons[name];

  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d={path} />
    </svg>
  );
}
