import Image from "next/image";
import Link from "next/link";

export type RelatedProductCardProps = {
  id: string;
  name: string;
  category: string;
  imageSrc: string;
};

export const RelatedProductCard = ({ id, name, category, imageSrc }: RelatedProductCardProps) => {
  return (
    <Link href={`/catalog/${id}`} className="bg-white p-5 shadow-sm flex flex-col group hover:shadow-md transition-all cursor-pointer">
      <div className="relative h-[250px] md:h-[320px] w-full mb-6 overflow-hidden bg-gray-50">
        <Image 
          src={imageSrc} 
          fill 
          alt={name} 
          className="object-cover transition-transform duration-700 group-hover:scale-105" 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <span className="bg-white text-brown px-6 py-2 text-[10px] font-bold tracking-widest uppercase shadow-sm">
            View Full Details
          </span>
        </div>
      </div>
      <div>
        <p className="text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">{category}</p>
        <h3 className="font-cinzel text-xl text-[#1A1A1A] font-semibold mb-2">{name}</h3>
      </div>
    </Link>
  );
};
