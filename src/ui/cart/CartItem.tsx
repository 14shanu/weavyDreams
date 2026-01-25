'use client';

import { useCartStore } from '@/lib/stores/cartStore';
import Button from '@/ui/elements/Button';

interface CartItemProps {
  item: {
    id: string;
    type: 'package' | 'service';
    name: string;
    price: number;
    quantity: number;
  };
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-500 capitalize">{item.type}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 border rounded-lg">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="px-3 py-1 hover:bg-gray-100 transition-colors"
            disabled={item.quantity <= 1}
          >
            −
          </button>
          <span className="px-3 py-1 min-w-[2rem] text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-3 py-1 hover:bg-gray-100 transition-colors"
          >
            +
          </button>
        </div>

        <button
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-700 p-2"
          aria-label="Remove item"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
