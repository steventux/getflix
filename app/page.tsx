import SearchForm from '@/app/components/SearchForm';

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center my-10">
        <h1 className="barcode text-8xl">
          Getflix
        </h1>
        <SearchForm/>
      </div>
    </main>
  );
}
