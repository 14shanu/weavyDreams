import Link from 'next/link';
import Card from '@/ui/elements/Card';
import Button from '@/ui/elements/Button';
import { Package } from '@/lib/types/package';

interface PackageCardProps {
  package: Package;
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  const tierColors = {
    essential: 'bg-blue-50 border-blue-200',
    premium: 'bg-purple-50 border-purple-200',
    luxury: 'bg-amber-50 border-amber-200',
  };

  const tierBadges = {
    essential: 'bg-blue-100 text-blue-700',
    premium: 'bg-purple-100 text-purple-700',
    luxury: 'bg-amber-100 text-amber-700',
  };

  return (
    <Card className={`border-2 ${tierColors[pkg.tier]} h-full flex flex-col`}>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${tierBadges[pkg.tier]}`}>
            {pkg.tier}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{pkg.tagline}</p>
        <p className="text-xs text-gray-500 mb-6">{pkg.guestCount}</p>

        <div className="space-y-2 mb-6">
          <p className="text-xs font-semibold text-gray-700 uppercase">Included Services:</p>
          <ul className="space-y-1">
            {pkg.features.slice(0, 4).map((feature, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start">
                <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-auto">
        <Link href={`/packages/${pkg.slug}`}>
          <Button variant="primary" className="w-full">
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
}
