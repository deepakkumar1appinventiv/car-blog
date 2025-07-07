import { CarSpecs as CarSpecsType } from '@/types';

interface CarSpecsProps {
  specs: CarSpecsType;
}

export function CarSpecs({ specs }: CarSpecsProps) {
  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Car Specifications</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-400">Model Year:</span>
            <span className="text-white font-medium">{specs.modelYear}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Fuel Type:</span>
            <span className="text-white font-medium">{specs.fuelType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Top Speed:</span>
            <span className="text-white font-medium">{specs.topSpeed}</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-400">Price:</span>
            <span className="text-white font-medium">{specs.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Engine:</span>
            <span className="text-white font-medium">{specs.engine}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Transmission:</span>
            <span className="text-white font-medium">{specs.transmission}</span>
          </div>
        </div>
      </div>
    </div>
  );
}