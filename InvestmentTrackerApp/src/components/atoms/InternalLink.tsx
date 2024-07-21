import { Link } from 'expo-router';
import { type ComponentProps } from 'react';

type Props = ComponentProps<typeof Link>;

export function InternalLink({ href, ...rest }: Props) {
  return (
    <Link
      {...rest}
      href={href}
    />
  );
}
