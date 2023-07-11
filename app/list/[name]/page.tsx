import Page from '@/app/page';

export default function page({ params }: { params: { name: string } }) {
  return <Page name={params.name} />;
}
