import Image from "next/image";
import Link from "next/link";

export type CollectionBannerProps = {
  href: string;
  imageSrc: string;
  title: string;
  subtitle?: string;
  description: string;
  className?: string;
};

export const CollectionBanner = ({
  href,
  imageSrc,
  title,
  subtitle = "Exclusive Handcrafted Design",
  description,
  className = "",
}: CollectionBannerProps) => {
  return (
    <Link 
      href={href} 
      className={`relative h-[500px] md:h-[650px] group overflow-hidden bg-white shadow-sm block cursor-pointer ${className}`}
    >
      <Image 
        src={imageSrc} 
        alt={title} 
        fill 
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 66vw" 
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white/95 via-white/80 to-transparent pt-24 pb-8 px-8 backdrop-blur-[1px]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0">
          <div>
            <h3 className="text-3xl md:text-4xl font-cinzel text-brown mb-2">{title}</h3>
            <p className="text-gold-dark text-[10px] md:text-xs font-semibold tracking-widest uppercase mb-2">{subtitle}</p>
            <p className="text-gray-500 text-xs font-light">{description}</p>
          </div>
          <div className="bg-[#D4AF37] text-brown px-6 py-2.5 text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-gold-light transition-colors shadow-md text-center inline-block whitespace-nowrap">
            Explore
          </div>
        </div>
      </div>
    </Link>
  );
};
