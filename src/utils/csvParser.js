/**
 * Parse CSV string to JSON array
 * @param {string} csvText - Raw CSV text
 * @returns {Array} Array of objects with keys from header row
 */
export function parseCSV(csvText) {
  if (!csvText || csvText.trim() === '') {
    return [];
  }

  const lines = csvText.trim().split('\n');
  
  if (lines.length === 0) {
    return [];
  }

  // Parse header row
  const headers = lines[0].split(',').map(header => header.trim());

  // Parse data rows
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    
    if (values.length === headers.length) {
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index].trim();
      });
      data.push(row);
    }
  }

  return data;
}

/**
 * Parse a single CSV line, handling quoted values
 * @param {string} line - Single CSV line
 * @returns {Array} Array of values
 */
function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of value
      values.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  // Add last value
  values.push(current);

  return values;
}

/**
 * Fetch and parse CSV from URL
 * @param {string} url - CSV URL
 * @returns {Promise<Array>} Parsed data
 */
export async function fetchCSV(url) {
  try {
    const response = await fetch(url, {
      cache: 'no-cache', // Always get fresh data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error('Error fetching CSV:', error);
    throw error;
  }
}

