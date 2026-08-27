import { X } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
}

export default function ProductCard({ product, onDelete }: ProductCardProps) {
  return (
    <div className="group bg-white border border-[#EEEEEE] overflow-hidden flex flex-col hover:border-[#DDD] transition-colors relative">
      <button 
        onClick={() => onDelete(product.id)}
        className="absolute top-2 right-2 z-10 bg-white/90 p-1 text-[#999] hover:text-black border border-transparent hover:border-black transition-colors"
        title="移除商品"
      >
        <X className="w-3 h-3" />
      </button>

      <div className="aspect-[3/4] bg-[#F5F5F5] relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={`Product ${product.productCode}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>
      
      <div className="p-4 flex flex-col gap-2 flex-grow">
        <div className="text-[10px] text-[#999] font-mono">#{product.productCode}</div>
        
        <div className="flex items-center gap-3 py-1 mt-auto">
          <div className="text-xs"> NT$ {product.priceTwd.toLocaleString()}</span></div>
          <div className="w-[1px] h-3 bg-[#EEE]"></div>
          <div className="text-xs"> ¥ {product.priceJpy.toLocaleString()}</div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <a 
            href={product.urlTwd} 
            target="_blank" 
            rel="noreferrer" 
            className="text-[11px] py-1.5 border border-black text-center text-[#1A1A1A] hover:bg-black hover:text-white transition-colors"
          >
            台灣官網
          </a>
          <a 
            href={product.urlJpy} 
            target="_blank" 
            rel="noreferrer" 
            className="text-[11px] py-1.5 border border-black text-center text-[#1A1A1A] hover:bg-black hover:text-white transition-colors"
          >
            日本官網
          </a>
        </div>
      </div>
    </div>
  );
}
