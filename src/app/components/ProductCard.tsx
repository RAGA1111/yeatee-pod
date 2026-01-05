import Image from "next/image";
import { Product } from "@/lib/data";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative rounded-xl border border-gray-200 bg-[var(--surface)] overflow-hidden hover:shadow-2xl hover:border-[var(--primary)]/20 transition-all duration-300 cursor-pointer">
      <div className="relative h-48 bg-[var(--bg)] overflow-hidden flex items-center justify-center">
        {product.designImage ? (
          <Image
            src={product.designImage}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          />
        ) : (
          <div className="text-center p-4">
            <div className="w-full h-24 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 rounded-lg flex items-center justify-center mb-2">
              <svg className="w-12 h-12 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm text-[var(--muted)] font-medium">Mock T-Shirt Image</p>
            <p className="text-xs text-[var(--muted)]/70 mt-1">Space for design #{product.id}</p>
          </div>
        )}
        {product.tshirtType === "PREMIUM" && (
          <div className="absolute top-3 left-3 bg-[var(--accent)] text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm">
            Premium
          </div>
        )}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white transition-colors">
            <svg className="w-4 h-4 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-semibold text-[var(--text)] line-clamp-2 leading-tight text-lg group-hover:text-[var(--primary)] transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-[var(--muted)] mt-1">
            by {product.creator.name}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-[var(--text)]">
            ₹{product.sellingPrice}
          </p>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-[var(--secondary)]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm text-[var(--muted)]">4.8</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute bottom-5 left-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="w-full bg-[var(--primary)] text-white py-3 px-4 rounded-lg text-sm font-semibold hover:bg-[var(--primary)]/90 transition-colors shadow-lg">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
