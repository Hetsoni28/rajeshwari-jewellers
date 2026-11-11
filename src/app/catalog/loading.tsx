/** Shown instantly while the catalog's products load from Sanity — mirrors the real layout. */
export default function CatalogLoading() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#FAFAFA]" aria-busy="true">
      <span className="sr-only" role="status">Loading the catalogue…</span>
      <div className="pt-28 sm:pt-32 md:pt-40 pb-16 px-4 sm:px-6 md:px-12 container mx-auto animate-pulse" aria-hidden="true">
        <div className="mx-auto mb-10 max-w-xl space-y-4 text-center">
          <div className="mx-auto h-3 w-32 bg-gray-200" />
          <div className="mx-auto h-10 w-3/4 bg-gray-200" />
          <div className="mx-auto h-3 w-1/2 bg-gray-200" />
        </div>
        <div className="mb-8 flex justify-center gap-8 border-b border-gray-200 pb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-3 w-14 bg-gray-200" />
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 md:gap-6 lg:gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white border border-[#EFE9DF] p-3">
              <div className="aspect-square w-full bg-[#F1ECE3]" />
              <div className="mt-4 h-2 w-1/3 bg-gray-200" />
              <div className="mt-3 h-4 w-2/3 bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
