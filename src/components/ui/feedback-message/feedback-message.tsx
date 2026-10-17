import { Button } from '@/components/ui/button/button';
import { cn } from '@/lib/cn';

export type FeedbackVariant = 'error' | 'empty';

export interface FeedbackMessageProps {
  variant: FeedbackVariant;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const variantClasses: Record<FeedbackVariant, string> = {
  error: 'border-red-200 bg-red-50 text-red-900',
  empty: 'border-slate-200 bg-slate-50 text-slate-900',
};

export function FeedbackMessage({
  variant,
  title,
  description,
  actionLabel,
  onAction,
}: FeedbackMessageProps) {
  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={cn(
        'flex flex-col items-center gap-3 rounded-xl border p-8 text-center',
        variantClasses[variant],
      )}
    >
      <p className="text-base font-bold">{title}</p>
      {description && <p className="text-sm">{description}</p>}
      {actionLabel && onAction && (
        <Button variant={variant === 'error' ? 'primary' : 'secondary'} onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
