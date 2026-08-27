/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import AddProductForm from './components/AddProductForm';
import ProductCard from './components/ProductCard';
import { Product } from './types';
import { supabase } from './utils/supabase';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);

  const [filterBrand, setFilterBrand] = useState<'ALL' | 'GU' | 'UQ'>('ALL');
  const [sortOption, setSortOption] = useState<'NEWEST' | 'TWD_ASC' | 'TWD_DESC' | 'JPY_ASC' | 'JPY_DESC'>('NEWEST');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setDbError(null);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error.message);
      setDbError(`讀取資料失敗: ${error.message}`);
    } else {
      // Postgres relies on snake_case standard. Map Supabase snake_case columns back to frontend camelCase
      const mappedProducts = (data || []).map((item: any) => ({
        id: item.id,
        brand: item.brand || 'UQ', // Default to UQ if missing
        imageUrl: item.image_url || item.imageUrl,
        productCode: item.product_code || item.productCode,
        priceTwd: item.price_twd || item.priceTwd,
        priceJpy: item.price_jpy || item.priceJpy,
        urlTwd: item.url_twd || item.urlTwd,
        urlJpy: item.url_jpy || item.urlJpy,
      }));
      setProducts(mappedProducts as Product[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddProduct = async (newProduct: Omit<Product, 'id'>) => {
    setDbError(null);
    
    // Map camelCase to Postgres snake_case before inserting
    const dbPayload = {
      brand: newProduct.brand,
      image_url: newProduct.imageUrl,
      product_code: newProduct.productCode,
      price_twd: newProduct.priceTwd,
      price_jpy: newProduct.priceJpy,
      url_twd: newProduct.urlTwd,
      url_jpy: newProduct.urlJpy,
    };

    const { error } = await supabase
      .from('products')
      .insert([dbPayload]);

    if (error) {
      console.error('Error adding product:', error.message);
      setDbError(`新增失敗: ${error.message} (請檢查資料表欄位名稱或 RLS 權限設定)`);
    } else {
      fetchProducts();
    }
  };

  const handleDeleteProduct = async (id: string) => {
    setDbError(null);
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error.message);
      setDbError(`刪除失敗: ${error.message}`);
    } else {
      fetchProducts();
    }
  };

  const displayedProducts = products
    .filter((p) => filterBrand === 'ALL' || p.brand === filterBrand)
    .sort((a, b) => {
      if (sortOption === 'TWD_ASC') return a.priceTwd - b.priceTwd;
      if (sortOption === 'TWD_DESC') return b.priceTwd - a.priceTwd;
      if (sortOption === 'JPY_ASC') return a.priceJpy - b.priceJpy;
      if (sortOption === 'JPY_DESC') return b.priceJpy - a.priceJpy;
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans selection:bg-black selection:text-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8 md:py-12 space-y-12">
        <AddProductForm onAdd={handleAddProduct} />
        
        <section>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
            <div>
              <h2 className="text-xs uppercase tracking-widest text-[#999] font-semibold mb-1">現有選品清單 Catalog</h2>
              <span className="text-[11px] text-[#999]">顯示 {displayedProducts.length} 個項目</span>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <select 
                value={filterBrand}
                onChange={(e) => setFilterBrand(e.target.value as 'ALL' | 'GU' | 'UQ')}
                className="text-xs border border-[#DDD] py-1.5 px-2 outline-none focus:border-black transition-colors bg-transparent flex-1 md:flex-none cursor-pointer"
              >
                <option value="ALL">全部品牌</option>
                <option value="UQ">UNIQLO</option>
                <option value="GU">GU</option>
              </select>
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="text-xs border border-[#DDD] py-1.5 px-2 outline-none focus:border-black transition-colors bg-transparent flex-1 md:flex-none cursor-pointer"
              >
                <option value="NEWEST">最新加入</option>
                <option value="TWD_ASC">台幣售價 (低到高)</option>
                <option value="TWD_DESC">台幣售價 (高到低)</option>
                <option value="JPY_ASC">日圓售價 (低到高)</option>
                <option value="JPY_DESC">日圓售價 (高到低)</option>
              </select>
            </div>
          </div>

          {dbError && (
            <div className="mb-6 p-4 border border-[#E60012] bg-[#FFF5F5] text-[#E60012] text-sm rounded-sm">
              <span className="font-bold">資料庫錯誤：</span> {dbError}
            </div>
          )}
          
          {loading ? (
             <div className="py-24 flex flex-col items-center justify-center border border-dashed border-[#DDD] bg-white text-[#999]">
               <div className="text-[10px] uppercase tracking-widest font-medium animate-pulse">載入中 Loading...</div>
             </div>
          ) : displayedProducts.length === 0 ? (
             <div className="py-24 flex flex-col items-center justify-center border border-dashed border-[#DDD] bg-white text-[#999]">
               <div className="text-[10px] uppercase tracking-widest font-medium">找不到符合的商品 No Match Found</div>
             </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} onDelete={handleDeleteProduct} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
