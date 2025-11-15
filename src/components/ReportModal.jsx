import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { REPORT_ISSUE_FORM_URL, REPORT_STATUS_FORM_URL } from '../utils/constants';

export function ReportModal({ isOpen, onClose, prefilledEquipment = null, type = 'issue' }) {
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setShowIframe(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const formUrl = type === 'status' ? REPORT_STATUS_FORM_URL : REPORT_ISSUE_FORM_URL;
  const title = type === 'status' ? 'Update Equipment Status' : 'Report Maintenance Issue';
  const description = type === 'status' 
    ? 'Report if this equipment is broken or working again.'
    : 'Report maintenance issues from your block and floor.';

  // Prefill equipment ID if provided
  const prefillParam = prefilledEquipment 
    ? `&entry.EQUIPMENT_ID=${encodeURIComponent(prefilledEquipment.id)}`
    : '';

  const embedUrl = formUrl.includes('YOUR_') 
    ? null 
    : `${formUrl}${prefillParam}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {!embedUrl ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Please configure your Google Form URLs in the constants file.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Update <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">src/utils/constants.js</code> with your form URLs.
              </p>
            </div>
          ) : (
            <>
              {!showIframe ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {prefilledEquipment && (
                      <span className="block mb-2 font-medium">
                        Reporting for: {prefilledEquipment.id} ({prefilledEquipment.cluster} Cluster)
                      </span>
                    )}
                  </p>
                  <button
                    onClick={() => setShowIframe(true)}
                    className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Open Report Form
                  </button>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                    Or{' '}
                    <a
                      href={embedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      open in new tab
                    </a>
                  </p>
                </div>
              ) : (
                <iframe
                  src={embedUrl}
                  className="w-full h-[600px] border-0 rounded"
                  title={title}
                >
                  Loading form...
                </iframe>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

