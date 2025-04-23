// Component to show when Supabase is not configured
const SupabaseRequired = () => (
  <div className="flex items-center justify-center min-h-screen ">
  <div className="p-4">
    <div className="max-w-xl w-full p-6 bg-zinc-50 rounded-lg shadow text-center">
      <h2 className="text-xl font-semibold mb-4">Supabase Configuration Required</h2>
      <p className="mb-2">Your Supabase environment variables are not configured.</p>
      <p className="mb-4">Please add the following to your <code className="px-1 bg-gray-100 rounded">.env.local</code> file:</p>
      <ul className="bg-gray-100 p-4 rounded-md text-gray-800 text-left list-none">
        <li>NEXT_PUBLIC_SUPABASE_URL=your-supabase-url</li>
        <li>NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key</li>
      </ul>
    </div>
  </div>
  </div>
);

export default SupabaseRequired;