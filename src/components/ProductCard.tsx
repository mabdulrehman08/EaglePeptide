import { Link } from "react-router-dom";

type ProductCardProps = {
  name: string;
  dosage: string;
  vials: number;
  price: string;
  slug: string;
  image: string;
  description?: string;
};

export default function ProductCard({
  name,
  dosage,
  vials,
  price,
  slug,
  image,
  description,
}: ProductCardProps) {
  return (
    <Link
      to={`/products/${slug}`}
      onMouseMove={(event) => {
        const card = event.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        card.style.setProperty("--mx", `${x}px`);
        card.style.setProperty("--my", `${y}px`);
      }}
      className="group relative w-full max-w-sm bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-700 rounded-2xl p-4 sm:p-5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 block overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(59, 130, 246, 0.12), transparent 45%)",
      }}
    >
      <div className="aspect-square bg-blue-50/60 dark:bg-slate-800 rounded-xl mb-4 overflow-hidden flex items-center justify-center border border-blue-100 dark:border-slate-700">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = "/fallback-product.jpg";
          }}
        />
      </div>

      <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-snug">
        {name}
      </h3>

      <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">
        {dosage} • {vials} vial{vials !== 1 ? "s" : ""}
      </p>

      {description && (
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 line-clamp-3 min-h-[60px]">
          {description}
        </p>
      )}

      <div className="mt-3 pt-3 border-t border-blue-100 dark:border-slate-700 flex items-center justify-between">
        <p className="text-xl font-bold text-blue-900 dark:text-blue-200">{price}</p>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200">
          Lab Use Only
        </span>
      </div>
    </Link>
  );
}
