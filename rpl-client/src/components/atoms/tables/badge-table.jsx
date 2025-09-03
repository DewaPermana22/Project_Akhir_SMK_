import { getDaysRemainingText, getStatusConfig } from '../../../app/utils/penugasan';


export const StatusBadge = ({ status }) => {
  const config = getStatusConfig(status);
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.text}
    </span>
  );
};

export const DaysRemainingBadge = ({ deadline }) => {
  const { text, className } = getDaysRemainingText(deadline);
  return <span className={className}>{text}</span>;
};