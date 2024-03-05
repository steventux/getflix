import Link from 'next/link';
import Result from '@/app/types/result';

interface ResultItemProps {
  item: Result;
}

export default function ResultItem({item}: ResultItemProps) {
  const href = item.magnet ? item.magnet : item.torrent;
  return (
    <li>
      (S:{item.seeders} {item.size}) <Link href={href} className="underline font-semibold">{item.name}</Link>
    </li>
  );
}
