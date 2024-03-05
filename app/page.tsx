import { Inter, Libre_Barcode_39_Text } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
const libre_barcode_39_text = Libre_Barcode_39_Text({ subsets: ["latin"], weight: "400" });
import SearchForm from '@/app/components/SearchForm';

export default function Home() {
  return (
    <main>
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className={libre_barcode_39_text.className + ' text-8xl'}>
          Getflix
        </h1>
        <SearchForm/>
      </div>
    </main>
  );
}
