import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const versionFilePath = join(__dirname, '../../version.json');

// Initialize version file if it doesn't exist
try {
  readFileSync(versionFilePath);
} catch (error) {
  writeFileSync(versionFilePath, JSON.stringify({ version: '1.0.0', lastUpdated: new Date().toISOString() }, null, 2));
}

export const getVersion = async (req, res) => {
  try {
    const versionData = JSON.parse(readFileSync(versionFilePath, 'utf8'));
    res.json({ success: true, data: versionData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateVersion = async (req, res) => {
  try {
    const { version } = req.body;

    if (!version) {
      return res.status(400).json({ success: false, error: 'Version is required' });
    }

    const versionData = {
      version,
      lastUpdated: new Date().toISOString(),
    };

    writeFileSync(versionFilePath, JSON.stringify(versionData, null, 2));

    res.json({ success: true, data: versionData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
