import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { WishlistItem } from "@/context/WishlistContext";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";

type WishlistCardProps = {
  item: WishlistItem;
  onRemove: (id: string) => void;
  priority?: boolean;
};

export const WishlistCard = ({ item, onRemove, priority = false }: WishlistCardProps) => {
  return (
    <div className="bg-white flex flex-col group border border-gray-100 hover:border-gold/30 transition-all shadow-sm hover:shadow-md">
      <div className="relative aspect-[4/5] bg-[#F5F5F5] overflow-hidden p-4">
        <Image 
          src={item.image} 
          fill 
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-105" 
          alt={item.title} 
        />
        <Button 
          variant="custom"
          onClick={() => onRemove(item.id)} 
          className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white text-gray-400 hover:text-brown transition-colors shadow-sm z-10" 
          aria-label="Remove from wishlist"
        >
          <X size={16} />
        </Button>
      </div>
      <div className="p-6 flex flex-col flex-grow bg-[#FAFAFA]">
        <div className="flex justify-between items-start mb-6">
          <Heading level={3} className="text-lg font-semibold leading-tight pr-4">{item.title}</Heading>
          <span className="text-[8px] font-bold text-gold-dark tracking-widest uppercase text-right leading-tight whitespace-pre-line">{item.tag}</span>
        </div>
        
        <Link href="/contact" className="mt-auto border border-gold text-gold-dark text-[9px] font-bold tracking-[0.15em] uppercase py-3 hover:bg-gold hover:text-white transition-colors text-center block w-full">
          CHECK WHOLESALE AVAILABILITY
        </Link>
      </div>
    </div>
  );
};
