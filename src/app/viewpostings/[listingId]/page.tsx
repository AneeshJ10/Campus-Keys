import { supabase } from '@/lib/supabase';

type Props = {
  params: {
    listingId: string;
  };
};

export default async function ListingDetailPage(props: Props) {
  const params = await props.params; // ✅ wait for params to resolve
  const { listingId } = params;

  const { data, error } = await supabase
    .from('Listing')
    .select('*')
    .eq('listing_id', listingId)
    .single();

  if (error) {
    return (
      <div className="w-full px-6 py-10">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Error loading listing</h1>
        <p className="text-gray-700">{error.message}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full px-6 py-10">
        <h1 className="text-2xl font-bold">Listing Not Found</h1>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-10">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="flex-shrink-0 w-full lg:w-1/2">
          <img
            src={data.image_url}
            alt={data.title}
            className="w-full h-80 object-cover rounded-lg shadow"
          />
        </div>
        <div className="w-full lg:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <p className="text-gray-600">{data.description}</p>
          <p className="text-lg font-semibold text-gray-900">${data.price.toFixed(2)}</p>
          <div className="text-sm text-gray-500">
            <p>Location: {data.location}</p>
            <p>
              Available: {data.start_date} → {data.end_date}
            </p>
            <p>Created: {new Date(data.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
