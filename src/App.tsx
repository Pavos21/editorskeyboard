import { useState, useEffect } from 'react';
import { serialHandler } from './components/serialHandler';
import KeyboardSVG from './assets/KeyboardSVG';
import KeysEditorDialog from './components/KeysEditorDialog';
import { documents } from './data/files';

// Custom Confirmation Dialog Component
interface ConfirmationDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
        <p className="text-lg text-gray-100 mb-6">{message}</p>
        <div className="flex justify-around space-x-4">
          <button
            onClick={onConfirm}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};


function App() {
  const [unsupportedSerial, setUnsupportedSerial] = useState(false);
  const [connected, setConnected] = useState(false);
  const [editableJson, setEditableJson] = useState('');
  const [message, setMessage] = useState('');
  const [showOled, setShowOled] = useState(false);
  const [selectedFirmware, setSelectedFirmware] = useState<string>('');

  // New state to control the visibility of the JSON editor textarea
  const [showJsonEditor, setShowJsonEditor] = useState(false);

  // State to control the visibility of the dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // State to determine which mode the dialog should open in ('keys', 'encoder', 'config', 'display')
  const [editingMode, setEditingMode] = useState<'keys' | 'encoder' | 'config' | 'display' | null>(null);
  // State to store the index of the key being edited (only relevant for 'keys' mode)
  const [editingKeyIndex, setEditingKeyIndex] = useState<number | null>(null);

  // States for custom confirmation dialog
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [onConfirmAction, setOnConfirmAction] = useState<(() => void) | null>(null);


  // Define interfaces for the configuration structure
  interface KeyConfig {
    label: string;
    combo: string[];
  }

  interface EncoderConfig {
    click?: KeyConfig;
    up?: KeyConfig;
    down?: KeyConfig;
  }

  interface DeviceConfig {
    config: {
      os: string;
      layout: string;
    };
    keys: KeyConfig[];
    display: {
      contrast: number;
      timeout: number;
    };
    encoder: EncoderConfig;
  }

  // State to hold the parsed device configuration
  const [config, setConfig] = useState<DeviceConfig | null>(null);

  // Detect URL params on first load for serial support, OLED display presence, and firmware pre-selection
  useEffect(() => {
    if (!('serial' in navigator)) {
      setUnsupportedSerial(true);
    }

    const params = new URLSearchParams(window.location.search);
    let oledDetected = false;
    let firmwarePreselected = false;

    // Check for OLED related parameters
    if (params.has('b_oled_v1') || params.has('b_oled_v2') || params.has('b_bt_oled_v1') || params.has('b_bt_oled_v2')) {
      oledDetected = true;
    }
    setShowOled(oledDetected);

    // Check for firmware pre-selection parameters
    for (const file of documents) {
      if (params.has(file.param)) {
        setSelectedFirmware(file.name);
        firmwarePreselected = true;
        break;
      }
    }

    // Set a default firmware if none is pre-selected and there are files available
    if (!firmwarePreselected && documents.length > 0) {
      setSelectedFirmware(documents[0].name);
    }

    setMessage('Ready');
  }, []);

  /**
   * Opens the KeysEditorDialog in the specified mode.
   * @param mode The editing mode: 'keys', 'encoder', 'display', or 'config'.
   * @param keyId Optional. The ID of the key clicked (e.g., 'sw1', 'encoder', 'oled', 'settings').
   */
  const openEditorDialog = (mode: 'keys' | 'encoder' | 'config' | 'display', keyId?: string) => {
    setEditingMode(mode);
    setIsDialogOpen(true);

    if (mode === 'keys' && keyId) {
      // Find the index of the key based on its ID (labelKeys array)
      const index = labelKeys.indexOf(keyId);
      if (index !== -1) {
        setEditingKeyIndex(index);
      }
    } else {
      setEditingKeyIndex(null); // Clear key index if not in 'keys' mode
    }
  };

  /**
   * Handles saving changes for standard keys.
   * @param newCombo The updated key combination.
   * @param newLabel The updated label for the key.
   */
  const handleSaveCombo = (newCombo: string[], newLabel: string) => {
    if (editingKeyIndex !== null && config) {
      const updatedConfig = { ...config };
      updatedConfig.keys[editingKeyIndex] = { label: newLabel, combo: newCombo };
      setConfig(updatedConfig);
      setEditableJson(JSON.stringify(updatedConfig, null, 2));
    }
  };

  /**
   * Handles saving changes for encoder actions.
   * @param newClickCombo The updated combo for encoder click.
   * @param newClickLabel The updated label for encoder click.
   * @param newUpCombo The updated combo for encoder rotate up.
   * @param newUpLabel The updated label for encoder rotate up.
   * @param newDownCombo The updated combo for encoder rotate down.
   * @param newDownLabel The updated label for encoder rotate down.
   */
  const handleSaveEncoder = (
    newClickCombo: string[],
    newClickLabel: string,
    newUpCombo: string[],
    newUpLabel: string,
    newDownCombo: string[],
    newDownLabel: string
  ) => {
    if (config) {
      const updatedConfig = { ...config };
      updatedConfig.encoder = updatedConfig.encoder || {}; // Ensure encoder object exists
      updatedConfig.encoder.click = { label: newClickLabel, combo: newClickCombo };
      updatedConfig.encoder.up = { label: newUpLabel, combo: newUpCombo };
      updatedConfig.encoder.down = { label: newDownLabel, combo: newDownCombo };
      setConfig(updatedConfig);
      setEditableJson(JSON.stringify(updatedConfig, null, 2));
    }
  };

  /**
   * Handles saving changes for general configuration and display settings.
   * This function combines the logic for both config and display as per the updated dialog.
   * @param newConfig The updated config object (os, layout).
   * @param newDisplay The updated display object (contrast, timeout).
   */
  const handleSaveConfigAndDisplay = (
    newConfig: { os: string; layout: string },
    newDisplay: { contrast: number; timeout: number }
  ) => {
    if (config) {
      const updatedConfig = { ...config };
      updatedConfig.config = newConfig;
      updatedConfig.display = newDisplay;
      setConfig(updatedConfig);
      setEditableJson(JSON.stringify(updatedConfig, null, 2));
    }
  };

  // Connect to the serial port
  const connect = async () => {
    try {
      await serialHandler.init(115200);
      setConnected(true);
      setMessage('Connected to serial port');
    } catch (e) {
      setMessage(`Connection failed: ${(e as Error).message}`);
    }
  };

  // Load data from the connected device
  const loadData = async () => {
    const performLoad = async () => {
      try {
        await serialHandler.write('get\n');
        let result = '';
        setMessage('Receiving data...');
        const startTime = Date.now();

        // Loop with a timeout to wait for the complete data
        while (Date.now() - startTime < 10000) { // 10-second timeout
          const chunk = await serialHandler.read();
          if (chunk) {
            result += chunk;
            console.log('Serial chunk:', chunk);

            // Check if the end marker has been received
            if (result.includes('end-json')) {
              const finalJsonString = result.replace('end-json', '').trim();
              try {
                const parsed = JSON.parse(finalJsonString);
                setEditableJson(JSON.stringify(parsed, null, 2));
                setConfig(parsed); // Save parsed JSON
                setMessage('Data loaded successfully');
                return; // Exit after successful load
              } catch (parseError) {
                setMessage(`Failed to parse JSON from device. Error: ${(parseError as Error).message}`);
                console.error("Raw data received before parsing failed:", finalJsonString);
                return; // Exit after parsing failure
              }
            }
          }
          // If no chunk, we just continue waiting for more data until the timeout
        }

        // If the loop times out
        setMessage('Failed to load data: Timed out waiting for response from device.');
      } catch (e) {
        setMessage(`Load data failed: ${(e as Error).message}`);
      }
    };

    if (editableJson) {
      setConfirmationMessage('This will overwrite your current edits. Are you sure you want to load data from the device?');
      setOnConfirmAction(() => async () => {
        setShowConfirmationDialog(false);
        await performLoad();
      });
      setShowConfirmationDialog(true);
    } else {
      // If no edits, proceed directly
      await performLoad();
    }
  };

  // Upload data to the connected device
  const uploadData = async () => {
    try {
      const parsed = JSON.parse(editableJson);
      const compact = JSON.stringify(parsed);
      await serialHandler.write(compact + '\n');
      setConfig(parsed);

      let response = '';
      try {
        // Keep reading until we get "ready-to-reboot" or no data
        while (true) {
          const chunk = await serialHandler.read();
          if (!chunk) break;
          response += chunk;

          // Disconnect as soon as the device is ready to reboot
          if (response.includes('ready-to-reboot')) {
            await serialHandler.close();
            //response += '\n(Port closed, device rebooting)';
            setConnected(false);
            setEditableJson('');
            setConfig(null);
            setShowJsonEditor(false); // Hide JSON editor on disconnect/reboot
            break;
          }
        }
      } catch (readError) {
        // If the device reboots before we see "ready-to-reboot"
        console.warn('Device rebooted during upload:', readError);
        response += '\n(Device rebooted)';
        await serialHandler.close();
      }

      //setMessage('Upload response:\n' + response);
      setMessage('Upload successful. Device rebooted');
    } catch (e) {
      setMessage(`Upload failed: ${(e as Error).message}`);
    }
  };

  // Disconnect from the serial port
  const disconnect = async () => {
    if (editableJson) {
      setConfirmationMessage('All not uploaded edits will be lost. Are you sure you want to disconnect?');
      setOnConfirmAction(() => async () => {
        setShowConfirmationDialog(false);
        await serialHandler.close();
        setConnected(false);
        setMessage('Disconnected');
        setEditableJson('');
        setConfig(null);
        setShowJsonEditor(false); // Hide JSON editor on disconnect
      });
      setShowConfirmationDialog(true);
    } else {
      // If no edits, proceed directly
      await serialHandler.close();
      setConnected(false);
      setMessage('Disconnected');
      setEditableJson('');
      setConfig(null);
      setShowJsonEditor(false); // Hide JSON editor on disconnect
    }
  };

  // Handle changes in the JSON textarea
  const handleJsonEdit = (value: string) => {
    setEditableJson(value);
    try {
      const parsed = JSON.parse(value);
      setConfig(parsed); // Keep parsed version in sync
    } catch {
      // Ignore errors while editing invalid JSON
    }
  };

  // Handle firmware selection change
  const handleFirmwareChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFirmware(event.target.value);
  };

  // Handle firmware download
  const handleFirmwareDownload = () => {
    const selectedFile = documents.find(file => file.name === selectedFirmware);
    if (selectedFile) {
      const link = document.createElement('a');
      link.href = selectedFile.url; // Use the URL from the object
      link.download = selectedFile.name; // Suggest filename for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setMessage(`Downloading ${selectedFile.name}...`);
    } else {
      setMessage('Please select a firmware file to download.');
    }
  };

  // Array of key IDs used by KeyboardSVG
  const labelKeys = ['sw1', 'sw2', 'sw3', 'sw4', 'sw5', 'sw6', 'sw7', 'sw8', 'encoder', 'oled', 'settings'];

  // This object is used to pass labels to KeyboardSVG.
  // It now prioritizes the 'label' from config.keys, falling back to combo.join('+') if label is not present.
  const labelsFromJson = config ? labelKeys.reduce((acc, key, idx) => {
    if (key === 'encoder') {
      // For the 'encoder' group, we might want a combined label or a generic one.
      // Here, I'm combining the labels of its sub-actions for display.
      const clickLabel = config.encoder?.click?.label || config.encoder?.click?.combo?.join('+') || '';
      const upLabel = config.encoder?.up?.label || config.encoder?.up?.combo?.join('+') || '';
      const downLabel = config.encoder?.down?.label || config.encoder?.down?.combo?.join('+') || '';
      acc[key] = `C:${clickLabel} | U:${upLabel} | D:${downLabel}`;
    } else if (key === 'oled') {
      acc[key] = `Contrast: ${config.display?.contrast || 0}, Timeout: ${config.display?.timeout || 0}`;
    } else if (key === 'settings') {
      acc[key] = `OS: ${config.config?.os || ''}, Layout: ${config.config?.layout || ''}`;
    }
    else {
      // For standard keys, use the explicit label or fall back to joining the combo
      acc[key] = config.keys[idx]?.label || config.keys[idx]?.combo?.join('+') || '';
    }
    return acc;
  }, {} as Record<string, string>) : {};

  // Also update encoder labels to use the explicit label if available
  if (config?.encoder) {
    labelsFromJson.click = config.encoder.click?.label || config.encoder.click?.combo?.join('+') || '';
    labelsFromJson.up = config.encoder.up?.label || config.encoder.up?.combo?.join('+') || '';
    labelsFromJson.down = config.encoder.down?.label || config.encoder.down?.combo?.join('+') || '';
  }

  return (
    <>
      {unsupportedSerial && (
        <>
          <div className="fixed top-0 left-0 w-full bg-red-600 text-white text-center py-2 z-50 shadow-md">
            ⚠️ Your browser does not support the Web Serial API. Page won't work. ⚠️
          </div>
          <div className="fixed inset-0 bg-[#333333DD] z-40 pointer-events-auto"></div>
        </>
      )}
      {/* Main container: flex-col on mobile, md:flex-row on desktop */}
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-gray-100 overflow-y-auto">
        {/* LEFT PANEL: Takes full width on mobile, 30vh height. On desktop, flex-none and full height. */}
        <div className="flex-none bg-gray-800 h-auto w-screen md:h-screen md:w-auto flex items-start">
          {/* KeyboardSVG is left-aligned, full screen height */}
          <KeyboardSVG
            className="h-full w-auto mx-auto" /* Added mx-auto for horizontal centering on mobile */
            // When a key is clicked, open the dialog in the correct mode based on the ID
            onKeyClick={(id) => {
              if (id === 'encoder') {
                openEditorDialog('encoder', id);
              } else if (id === 'oled') {
                openEditorDialog('display', id);
              } else if (id === 'settings') {
                openEditorDialog('config', id);
              } else {
                openEditorDialog('keys', id);
              }
            }}
            labels={labelsFromJson}
            showOled={showOled}
          />
        </div>

        {/* RIGHT: JSON Editor & Controls: Takes remaining height on mobile, flex-1 on desktop */}
        <div className="flex-1 p-8 bg-gray-900">
          <h1 className="text-4xl font-extrabold mb-8 text-indigo-400">
            Editor's Keyboard editor
          </h1>

          <div className="flex flex-wrap gap-4 mb-8"> {/* Changed to flex-wrap and gap for better mobile button layout */}
            {!connected ? (
              <button
                onClick={connect}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Connect
              </button>
            ) : (
              <button
                onClick={disconnect}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Disconnect
              </button>
            )}

            {connected && (
              <>
                <button
                  onClick={loadData}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Load data
                </button>
                <button
                  onClick={uploadData}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Upload data
                </button>
              </>
            )}
          </div>

          {/* Moved message pre tag */}
          <pre className="mb-8 p-4 bg-gray-800 rounded-lg text-gray-300 text-sm overflow-auto">
            {message}
          </pre>

          {/* Firmware Download Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-3 text-gray-200">
              Firmware Download
            </h2>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center"> {/* Adjusted for mobile stacking */}
              <select
                value={selectedFirmware}
                onChange={handleFirmwareChange}
                className="flex-grow w-full sm:w-auto p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {documents.map((file) => (
                  <option key={file.name} value={file.name}>
                    {file.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleFirmwareDownload}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto" /* Full width on mobile */
              >
                Download
              </button>
            </div>
          </div>

          {connected && (
            <>
              <hr className="border-t border-gray-700 my-8" />
              <h2 className="text-xl font-bold text-yellow-400 mb-4">Advanced</h2>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-3 text-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between"> {/* Adjusted for mobile stacking */}
                  Edit Raw Configuration
                  <button
                    onClick={() => setShowJsonEditor(!showJsonEditor)}
                    className="mt-2 sm:mt-0 ml-0 sm:ml-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out w-full sm:w-auto" /* Full width on mobile */
                  >
                    {showJsonEditor ? 'Hide Editor' : 'Show Editor'}
                  </button>
                </h3>
                {showJsonEditor && (
                  <textarea
                    value={editableJson}
                    onChange={(e) => handleJsonEdit(e.target.value)}
                    rows={12}
                    className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                  />
                )}
              </div>
            </>
          )}
        </div>

        {/* KeysEditorDialog component */}
        {config && isDialogOpen && (
          <KeysEditorDialog
            isOpen={isDialogOpen}
            onClose={() => {
              setIsDialogOpen(false);
              setEditingMode(null); // Reset mode on close
              setEditingKeyIndex(null); // Reset key index on close
            }}
            // Pass the current editing mode as boolean flags
            isEncoderMode={editingMode === 'encoder'}
            isConfigMode={editingMode === 'config'}
            isDisplayMode={editingMode === 'display'}

            // Props for 'keys' mode
            initialCombo={editingMode === 'keys' && editingKeyIndex !== null ? config.keys[editingKeyIndex]?.combo || [''] : ['']}
            initialLabel={editingMode === 'keys' && editingKeyIndex !== null ? config.keys[editingKeyIndex]?.label || '' : ''}
            onSave={handleSaveCombo}

            // Props for 'encoder' mode
            initialEncoderClickCombo={editingMode === 'encoder' ? config.encoder?.click?.combo || [''] : undefined}
            initialEncoderUpCombo={editingMode === 'encoder' ? config.encoder?.up?.combo || [''] : undefined}
            initialEncoderDownCombo={editingMode === 'encoder' ? config.encoder?.down?.combo || [''] : undefined}
            initialEncoderClickLabel={editingMode === 'encoder' ? config.encoder?.click?.label || '' : undefined}
            initialEncoderUpLabel={editingMode === 'encoder' ? config.encoder?.up?.label || '' : undefined}
            initialEncoderDownLabel={editingMode === 'encoder' ? config.encoder?.down?.label || '' : undefined}
            onSaveEncoder={handleSaveEncoder}

            // Props for 'config' and 'display' mode (combined handler)
            initialConfigOs={config.config?.os}
            initialConfigLayout={config.config?.layout}
            initialDisplayContrast={config.display?.contrast}
            initialDisplayTimeout={config.display?.timeout}
            onSaveConfigDisplay={handleSaveConfigAndDisplay}
          />
        )}

        {/* Custom Confirmation Dialog */}
        {showConfirmationDialog && onConfirmAction && (
          <ConfirmationDialog
            message={confirmationMessage}
            onConfirm={onConfirmAction}
            onCancel={() => setShowConfirmationDialog(false)}
          />
        )}
      </div>
    </>
  );
}

export default App;
