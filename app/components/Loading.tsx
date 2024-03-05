import Image from 'next/image'

export default function Loading() {
  return (
    <div className="flex flex-col items-center">
      <Image src="/loading-300.gif" height={200} width={200} alt="Loading..." />
    </div>
  );
}
