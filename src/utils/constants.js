// Google Sheets CSV URLs
export const EQUIPMENT_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRPHLo0KqsMoOj0F-DDvG74oQB_jEJOURhUGTm-QYC7wes-F8zXkWQwKj01pGLoSDVpFS_pq-cGPqun/pub?gid=0&single=true&output=csv';
export const REPORTS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRljV4iUhL9qRYaur18PhOB_ciLtLtI_b039Dew7PD8Dvw3OboUKtT-VCab0uBG-AhFGMOKDBu6pVgC/pub?gid=0&single=true&output=csv';

// Google Forms URLs
export const REPORT_ISSUE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfM4IfHhasEqStWCecgSuNBXc_9FYifUwy5jdP7uVz2-s5h9g/viewform?usp=sharing&ouid=117493956697007271173';
export const REPORT_STATUS_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSceBePXUvCJHkUCSZmFhWWj4kohRFqjLO3KaldKEBHd5VArCA/viewform?usp=sharing&ouid=117493956697007271173';

export const CLUSTERS = {
  RED: 'Red',
  BLUE: 'Blue',
  YELLOW: 'Yellow',
};

export const EQUIPMENT_TYPES = {
  WASHER: 'Washer',
  DRYER: 'Dryer',
};

export const STATUS = {
  WORKING: 'Working',
  OUT_OF_ORDER: 'Out of Order',
  UNDER_MAINTENANCE: 'Under Maintenance',
};

export const STATUS_COLORS = {
  [STATUS.WORKING]: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-800 dark:text-green-300',
    border: 'border-green-200 dark:border-green-800',
  },
  [STATUS.OUT_OF_ORDER]: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-800 dark:text-red-300',
    border: 'border-red-200 dark:border-red-800',
  },
  [STATUS.UNDER_MAINTENANCE]: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-800 dark:text-yellow-300',
    border: 'border-yellow-200 dark:border-yellow-800',
  },
};

export const CLUSTER_COLORS = {
  [CLUSTERS.RED]: 'bg-red-500',
  [CLUSTERS.BLUE]: 'bg-blue-500',
  [CLUSTERS.YELLOW]: 'bg-yellow-500',
};

export const ISSUE_TYPES = {
  EQUIPMENT_MALFUNCTION: 'Equipment malfunction',
  CLEANLINESS: 'Cleanliness issue',
  OTHER: 'Other',
};

export const REFRESH_INTERVAL = 60000; // 60 seconds

