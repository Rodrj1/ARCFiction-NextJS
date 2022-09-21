import Link from "next/link";

interface LinkProps {
  href: string;
  children: JSX.Element;
}

const NextLink = ({ href, children }: LinkProps) => {
  return <Link href={href}>{children}</Link>;
};

export default NextLink;
