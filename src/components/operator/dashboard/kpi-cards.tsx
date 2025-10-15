'use client';

import { Card, CardContent } from "@/components/operator/ui/card";
import { 
  Bus, 
  DollarSign, 
  Route, 
  Clock, 
  Fuel, 
  Wrench,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";
import { OperatorKPI } from "../../../app/operator/dashboard/data";

interface KPICardsProps {
  kpis: OperatorKPI[];
}

const iconMap = {
  'bus': Bus,
  'dollar-sign': DollarSign,
  'route': Route,
  'clock': Clock,
  'fuel': Fuel,
  'wrench': Wrench,
};

const colorMap = {
  blue: 'bg-blue-50 text-blue-600 border-blue-200',
  green: 'bg-green-50 text-green-600 border-green-200',
  purple: 'bg-purple-50 text-purple-600 border-purple-200',
  indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
  orange: 'bg-orange-50 text-orange-600 border-orange-200',
  red: 'bg-red-50 text-red-600 border-red-200',
  yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
};

export function KPICards({ kpis }: KPICardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpis.map((kpi, index) => {
        const IconComponent = iconMap[kpi.icon as keyof typeof iconMap];
        const colorClass = colorMap[kpi.color as keyof typeof colorMap];
        
        const TrendIcon = kpi.trend === 'up' 
          ? TrendingUp 
          : kpi.trend === 'down' 
            ? TrendingDown 
            : Minus;
        
        const trendColor = kpi.trend === 'up' 
          ? 'text-green-600' 
          : kpi.trend === 'down' 
            ? 'text-red-600' 
            : 'text-gray-600';

        return (
          <Card key={index} className="bg-white hover:shadow-lg transition-all duration-200 border-l-4 border-l-current">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg border ${colorClass}`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <div className={`flex items-center space-x-1 ${trendColor}`}>
                  <TrendIcon className="h-4 w-4" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  {kpi.title}
                </h3>
                <p className="text-3xl font-bold text-gray-900">
                  {kpi.value}
                </p>
                <p className={`text-sm font-medium ${trendColor}`}>
                  {kpi.change}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}