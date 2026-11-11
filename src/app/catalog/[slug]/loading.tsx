/** Shown instantly while a product loads from Sanity — mirrors the photo + details layout. */
export default function ProductLoading() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#FAFAFA]" aria-busy="true">
      <span className="sr-only" role="status">Loading product details…</span>
      <div className="pt-28 sm:pt-32 md:pt-40 pb-16 px-4 sm:px-6 md:px-12 container mx-auto animate-pulse" aria-hidden="true">
        <div className="mb-8 h-3 w-36 bg-gray-200" />
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="w-full lg:w-1/2">
            <div className="mx-auto aspect-4/5 w-full max-w-md bg-[#F1ECE3]" />
          </div>
          <div className="w-full lg:w-1/2 space-y-5 pt-4">
            <div className="h-3 w-40 bg-gray-200" />
            <div className="h-10 w-2/3 bg-gray-200" />
            <div className="h-px w-16 bg-gray-300" />
            <div className="h-3 w-full bg-gray-200" />
            <div className="h-3 w-5/6 bg-gray-200" />
            <div className="space-y-4 pt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-4 w-full bg-gray-100" />
              ))}
            </div>
            <div className="flex gap-4 pt-6">
              <div className="h-13 flex-1 bg-gray-200" />
              <div className="h-13 flex-1 bg-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
