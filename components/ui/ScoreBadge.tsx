import React from 'react';
import { getScoreBand, getBandLabel } from '@/lib/reputation/bands';
// Assuming you are using lucide-react or similar for icons. 
// Swap these with your project's standard SVG icons if different.
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface ScoreBadgeProps {
  score: number;
  className?: string;
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score, className = '' }) => {
  const band = getScoreBand(score);
  const label = getBandLabel(band);

  // Color mappings that respect general contrast guidelines
  const bandStyles = {
    green: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
    amber: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
    red: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
  };

  const icons = {
    green: <CheckCircle className="w-4 h-4 mr-1.5" aria-hidden="true" />,
    amber: <AlertTriangle className="w-4 h-4 mr-1.5" aria-hidden="true" />,
    red: <XCircle className="w-4 h-4 mr-1.5" aria-hidden="true" />,
  };

  return (
    <div
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-sm font-medium ${bandStyles[band]} ${className}`}
      role="status"
      aria-label={`Reputation Score: ${score}%, Status: ${label}`}
    >
      {/* Icon provides visual a11y independent of color */}
      {icons[band]}
      
      {/* The visible score */}
      <span>{score}%</span>
      
      {/* Screen-reader only text ensures a11y requirements are met */}
      <span className="sr-only"> - {label}</span>
    </div>
  );
};