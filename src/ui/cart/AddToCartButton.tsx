'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/stores/cartStore';
import Button from '@/ui/elements/Button';

interface AddToCartButtonProps {
  item: {
    id: string;
    type: 'package' | 'service';
    name: string;
    price: number;
  };
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export default function AddToCartButton({ item, variant = 'primary', className }: AddToCartButtonProps) {
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      ...item,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button
      variant={variant}
      onClick={handleAddToCart}
      className={className}
      disabled={added}
    >
      {added ? (
        <>
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Added!
        </>
      ) : (
        'Add to Cart'
      )}
    </Button>
  );
}
