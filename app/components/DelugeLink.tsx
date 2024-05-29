export default function DelugeLink() {
  const delugeWebUI = process.env.NEXT_PUBLIC_DELUGE_WEBUI || 'http://localhost:8112';
  return (
    <div className="container min-w-full flex flex-col items-center">
      <a href={delugeWebUI} className="font-semibold text-xl" target="_blank">Deluge</a>
    </div>

  );
}
