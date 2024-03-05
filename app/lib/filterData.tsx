import Result from '@/app/types/result'

const categories = ['Television', 'Movie'];

export default function filterData(data: { data: any }) {
  return {
    data: data.data.filter((d: Result) => categories.includes(d.category))
                   .filter((d: Result) => Number(d.seeders) > 0)
                   .toSorted((a: Result, b: Result) => Number(b.seeders) - Number(a.seeders))
  };
}
