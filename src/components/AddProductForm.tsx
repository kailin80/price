import { useState } from 'react';
import { Product } from '../types';

interface AddProductFormProps {
  onAdd: (product: Omit<Product, 'id'>) => void;
}

export default function AddProductForm({ onAdd }: AddProductFormProps) {
  const [imageUrl, setImageUrl] = useState('');
  const [productCode, setProductCode] = useState('');
  const [priceTwd, setPriceTwd] = useState('');
  const [priceJpy, setPriceJpy] = useState('');
  const [urlTwd, setUrlTwd] = useState('');
  const [urlJpy, setUrlJpy] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl || !productCode || !priceTwd || !priceJpy) return;

    onAdd({
      imageUrl,
      productCode,
      priceTwd: Number(priceTwd),
      priceJpy: Number(priceJpy),
      urlTwd,
      urlJpy,
    });

    setImageUrl('');
    setProductCode('');
    setPriceTwd('');
    setPriceJpy('');
    setUrlTwd('');
    setUrlJpy('');
  };

  return (
    <section className="bg-white border border-[#EEEEEE] p-6 rounded-sm">
      <h2 className="text-xs uppercase tracking-widest text-[#999] mb-6 font-semibold">新增商品紀錄 Add Product</h2>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
          <div className="space-y-1">
            <label className="text-[11px] text-[#666]">商品圖片網址 (Image URL)</label>
            <input 
              type="text" 
              placeholder="https://..." 
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              className="w-full border-b border-[#DDD] py-1 text-sm focus:border-black outline-none transition-colors bg-transparent" 
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-[11px] text-[#666]">商品編號 (Product Code)</label>
            <input 
              type="text" 
              placeholder="e.g. 465185" 
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
              required
              className="w-full border-b border-[#DDD] py-1 text-sm focus:border-black outline-none transition-colors bg-transparent" 
            />
          </div>
          
          <div className="hidden md:block"></div>
          
          <div className="space-y-1">
            <label className="text-[11px] text-[#666]">台灣售價 (TWD)</label>
            <input 
              type="number" 
              placeholder="NT$ 590" 
              value={priceTwd}
              onChange={(e) => setPriceTwd(e.target.value)}
              required
              min="0"
              className="w-full border-b border-[#DDD] py-1 text-sm focus:border-black outline-none transition-colors bg-transparent" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-[#666]">日本售價 (JPY)</label>
            <input 
              type="number" 
              placeholder="¥ 1990" 
              value={priceJpy}
              onChange={(e) => setPriceJpy(e.target.value)}
              required
              min="0"
              className="w-full border-b border-[#DDD] py-1 text-sm focus:border-black outline-none transition-colors bg-transparent" 
            />
          </div>
          
          <div className="hidden md:block"></div>

          <div className="space-y-1">
            <label className="text-[11px] text-[#666]">台灣官網連結</label>
            <input 
              type="text" 
              placeholder="uniqlo.com/tw/..." 
              value={urlTwd}
              onChange={(e) => setUrlTwd(e.target.value)}
              className="w-full border-b border-[#DDD] py-1 text-sm focus:border-black outline-none transition-colors bg-transparent" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-[#666]">日本官網連結</label>
            <input 
              type="text" 
              placeholder="uniqlo.com/jp/..." 
              value={urlJpy}
              onChange={(e) => setUrlJpy(e.target.value)}
              className="w-full border-b border-[#DDD] py-1 text-sm focus:border-black outline-none transition-colors bg-transparent" 
            />
          </div>
          
          <div className="flex items-end justify-end mt-2 md:mt-0">
            <button 
              type="submit" 
              className="bg-black text-white px-8 py-2 text-sm font-medium hover:bg-[#333] transition-colors w-full md:w-auto"
            >
              新增商品
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
