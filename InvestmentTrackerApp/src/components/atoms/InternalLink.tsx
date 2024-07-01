import { Link } from 'expo-router';
import { type ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

export function InternalLink({ href, ...rest }: Props) {
  return (
    <Link
      {...rest}
      href={href}
    />
  );
}
