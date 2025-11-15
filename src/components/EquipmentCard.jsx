import { FaWater } from 'react-icons/fa';
import { GiWashingMachine } from 'react-icons/gi';
import { MdLocalLaundryService } from 'react-icons/md';
import { formatDistanceToNow } from 'date-fns';
import { StatusBadge } from './StatusBadge';
import { EQUIPMENT_TYPES, CLUSTER_COLORS } from '../utils/constants';

export function EquipmentCard({ equipment, onReportIssue }) {
  const isWasher = equipment.type === EQUIPMENT_TYPES.WASHER;
  const Icon = isWasher ? GiWashingMachine : MdLocalLaundryService;
  
  const clusterColor = CLUSTER_COLORS[equipment.cluster] || 'bg-gray-500';

  const lastUpdated = equipment.last_updated 
    ? formatDistanceToNow(new Date(equipment.last_updated), { addSuffix: true })
    : 'Unknown';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 border border-gray-200 dark:border-gray-700">
      {/* Header with cluster indicator */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-1 h-12 rounded-full ${clusterColor}`}></div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {equipment.id}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {equipment.cluster} Cluster
            </p>
          </div>
        </div>
        <Icon className="text-3xl text-gray-400 dark:text-gray-500" />
      </div>

      {/* Type */}
      <div className="mb-3">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-medium">Type:</span> {equipment.type}
        </p>
      </div>

      {/* Status Badge */}
      <div className="mb-3">
        <StatusBadge status={equipment.status} />
      </div>

      {/* Notes */}
      {equipment.notes && (
        <div className="mb-3 p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            📝 {equipment.notes}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Updated {lastUpdated}
        </p>
        <button
          onClick={() => onReportIssue(equipment)}
          className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
        >
          Update Status
        </button>
      </div>
    </div>
  );
}

