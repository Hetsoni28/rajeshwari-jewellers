import Image from "next/image";
import Link from "next/link";

export type CollectionSideItemProps = {
  href: string;
  imageSrc: string;
  title: string;
  subtitle?: string;
  bgVariant?: "light" | "dark";
};

export const CollectionSideItem = ({
  href,
  imageSrc,
  title,
  subtitle = "Exclusive Handcrafted Design",
  bgVariant = "light",
}: CollectionSideItemProps) => {
  const bgClass = bgVariant === "light" ? "bg-[#EAE8E3]" : "bg-[#E2E2E2]";

  return (
    <Link 
      href={href} 
      className={`relative flex-1 group overflow-hidden shadow-sm block cursor-pointer ${bgClass}`}
    >
      <Image 
        src={imageSrc} 
        alt={title} 
        fill 
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 p-6 w-full z-10">
        <h3 className="text-2xl md:text-3xl font-cinzel text-white mb-1 drop-shadow-md">{title}</h3>
        <p className="text-white/90 text-[10px] md:text-xs font-light tracking-wide mb-3 drop-shadow-md">{subtitle}</p>
        <div className="w-8 h-[3px] bg-gold shadow-sm" />
      </div>
    </Link>
  );
};
