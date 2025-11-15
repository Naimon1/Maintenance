import { EquipmentCard } from './EquipmentCard';
import { STATUS } from '../utils/constants';

export function ClusterView({ equipment, onReportIssue }) {
  if (!equipment || equipment.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          No equipment found matching your filters.
        </p>
      </div>
    );
  }

  // Calculate stats
  const totalWashers = equipment.filter(e => e.type === 'Washer').length;
  const workingWashers = equipment.filter(
    e => e.type === 'Washer' && e.status === STATUS.WORKING
  ).length;

  const totalDryers = equipment.filter(e => e.type === 'Dryer').length;
  const workingDryers = equipment.filter(
    e => e.type === 'Dryer' && e.status === STATUS.WORKING
  ).length;

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                Washers Available
              </p>
              <p className="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-1">
                {workingWashers}/{totalWashers}
              </p>
            </div>
            <div className="text-4xl">🧺</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                Dryers Available
              </p>
              <p className="text-3xl font-bold text-purple-900 dark:text-purple-100 mt-1">
                {workingDryers}/{totalDryers}
              </p>
            </div>
            <div className="text-4xl">🌀</div>
          </div>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {equipment.map((item) => (
          <EquipmentCard
            key={item.id}
            equipment={item}
            onReportIssue={onReportIssue}
          />
        ))}
      </div>
    </div>
  );
}

