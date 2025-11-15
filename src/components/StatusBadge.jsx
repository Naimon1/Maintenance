import { STATUS_COLORS } from '../utils/constants';

export function StatusBadge({ status }) {
  const colors = STATUS_COLORS[status] || STATUS_COLORS['Working'];

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${colors.bg} ${colors.text} ${colors.border}`}
    >
      {status}
    </span>
  );
}

