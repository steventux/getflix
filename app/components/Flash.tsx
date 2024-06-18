import { Flash } from '@/app/lib/flash';

interface FlashProps {
  flash: Flash;
}
export default function Flash({flash}: {flash: Flash}) {
  let flashStyle;
  switch (flash.type) {
    case 'error':
      flashStyle = 'text-red-600';
      break;
    case 'message':
      flashStyle = 'text-green-600';
      break;
    case 'warning':
      flashStyle = 'text-yellow-600';
      break;
  }
  const classNames = `font-bold flex flex-col items-center ${flashStyle}`

  return (
    <div className={classNames}>{flash.message}</div>
  );
}
