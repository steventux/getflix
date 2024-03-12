import Link from 'next/link';
import addTorrent from '@/app/lib/deluge';
import Result from '@/app/types/result';

interface ResultItemProps {
  item: Result;
}

export default function ResultItem({item}: ResultItemProps) {
  const url = (item: Result) => {
    return item.magnet || item.torrent;
  }
  const add = (event: any) => {
    event.preventDefault();
    
    const link = event.target as HTMLLinkElement;
    addTorrent(link.href);   
  };

  return (
    <li>
      (S:{item.seeders} {item.size}) <Link href={url(item)} onClick={add} className="underline font-semibold">{item.name}</Link>
    </li>
  );
}
