import { useState, useEffect, useRef } from 'react';

// Define the props interface for the KeysEditorDialog component
interface KeysEditorDialogProps {
  isOpen: boolean; // Controls the visibility of the dialog
  onClose: () => void; // Callback function to close the dialog

  // Props for standard keys
  initialCombo?: string[]; // Initial array of key combinations for standard keys
  initialLabel?: string; // Initial label for standard keys
  onSave?: (combo: string[], label: string) => void; // Callback to save standard key combo and label

  // Props for encoder keys
  initialEncoderClickCombo?: string[];
  initialEncoderUpCombo?: string[];
  initialEncoderDownCombo?: string[];
  initialEncoderClickLabel?: string; // Separate label for click
  initialEncoderUpLabel?: string;    // Separate label for up
  initialEncoderDownLabel?: string; // Separate label for down
  onSaveEncoder?: (
    clickCombo: string[],
    clickLabel: string,
    upCombo: string[],
    upLabel: string,
    downCombo: string[],
    downLabel: string
  ) => void;

  isEncoderMode?: boolean; // New prop to indicate if the dialog is for an encoder

  // New props for config and display settings
  isConfigMode?: boolean; // New prop to indicate if the dialog is for config mode
  isDisplayMode?: boolean; // New prop to indicate if the dialog is for display mode
  initialConfigOs?: string;
  initialConfigLayout?: string;
  initialDisplayContrast?: number;
  initialDisplayTimeout?: number;
  onSaveConfigDisplay?: (config: { os: string; layout: string }, display: { contrast: number; timeout: number }) => void;
}

// Function to generate all alphabet characters (uppercase and lowercase)
const generateAlphabet = () => {
  const alphabet = [];
  for (let i = 0; i < 26; i++) {
    alphabet.push(String.fromCharCode(65 + i)); // Uppercase A-Z
  }
  for (let i = 0; i < 26; i++) {
    alphabet.push(String.fromCharCode(97 + i)); // Lowercase a-z
  }
  return alphabet;
};

// Function to generate numbers from 0 to 9
const generateNumbers = () => {
  const numbers = [];
  for (let i = 0; i <= 9; i++) {
    numbers.push(String(i));
  }
  return numbers;
};

// A comprehensive list of common special keys, based on KeyboardEvent.key values
const specialKeys = [
  // Modifiers
  'Shift', 'Ctrl', 'Alt', 'Win', 'Cmd',

  // Common action/navigation keys
  'Enter', 'Space', 'Tab', 'Escape', 'Backspace', 'Delete', 'Insert',
  'Home', 'End', 'PageUp', 'PageDown',
  'up', 'down', 'left', 'right',

  // Lock and system keys
  'CapsLock', 'NumLock', 'ScrollLock', 'PrintScreen',

  // Punctuation and symbols (common ones, based on KeyboardEvent.key)
  ';', '=', ',', '-', '.', '/', '`', '[', '\\', ']', "'",
  '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '|', ':', '"', '<', '>', '?', '~'
];

// Combine all possible keys into one array
const possibleKeys = [
  ...generateAlphabet(),
  ...generateNumbers(),
  ...specialKeys
].sort((a, b) => a.localeCompare(b)); // Sort alphabetically for easier searching

// Pre-set options for config and display
const osOptions = ['windows', 'mac', 'linux'];
const layoutOptions = ['cs', 'sk', 'en', 'de'];

// Helper to map 0-255 value to closest percentage number (1-100)
const mapValueToContrastPercent = (value: number): number => {
  return Math.round((value / 255) * 100);
};

// Helper to map percentage number (1-100) to 0-255 value
const mapContrastPercentToValue = (percent: number): number => {
  // Ensure percent is within 1-100 range before mapping
  const clampedPercent = Math.max(1, Math.min(100, percent));
  return Math.round((clampedPercent / 100) * 255);
};


// KeysEditorDialog functional component
function KeysEditorDialog({
  isOpen,
  onClose,
  initialCombo,
  initialLabel,
  onSave,
  initialEncoderClickCombo,
  initialEncoderUpCombo,
  initialEncoderDownCombo,
  initialEncoderClickLabel,
  initialEncoderUpLabel,
  initialEncoderDownLabel,
  onSaveEncoder,
  isEncoderMode,
  isConfigMode, // Destructure new prop
  isDisplayMode, // Destructure new prop
  initialConfigOs,
  initialConfigLayout,
  initialDisplayContrast,
  initialDisplayTimeout,
  onSaveConfigDisplay,
}: KeysEditorDialogProps) {
  // State for standard key combo and label
  const [combo, setCombo] = useState<string[]>([]);
  const [label, setLabel] = useState<string>('');

  // States for encoder combos and their individual labels
  const [clickCombo, setClickCombo] = useState<string[]>([]);
  const [clickLabel, setClickLabel] = useState<string>('');
  const [upCombo, setUpCombo] = useState<string[]>([]);
  const [upLabel, setUpLabel] = useState<string>('');
  const [downCombo, setDownCombo] = useState<string[]>([]);
  const [downLabel, setDownLabel] = useState<string>('');

  // New states for config and display settings
  const [configOs, setConfigOs] = useState<string>('');
  const [configLayout, setConfigLayout] = useState<string>('');
  const [displayContrastPercent, setDisplayContrastPercent] = useState<number>(0); // Now stores percentage number
  const [displayTimeoutSeconds, setDisplayTimeoutSeconds] = useState<number>(0); // Now stores seconds

  const [openDropdown, setOpenDropdown] = useState<string | number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Helper to map initial combos, ensuring each is an array with at least one empty string if initially empty
  const mapInitialCombo = (initial: string[] | undefined) => {
    if (!initial || initial.length === 0) return [''];
    return initial.map(key => {
      const match = specialKeys.find(sKey => sKey.toLowerCase() === key.toLowerCase());
      return match || key;
    });
  };

  // Effect to initialize the combo(s) and label(s) when the dialog opens or initial values change
  useEffect(() => {
    if (isEncoderMode) {
      setClickCombo(mapInitialCombo(initialEncoderClickCombo));
      setClickLabel(initialEncoderClickLabel || '');
      setUpCombo(mapInitialCombo(initialEncoderUpCombo));
      setUpLabel(initialEncoderUpLabel || '');
      setDownCombo(mapInitialCombo(initialEncoderDownCombo));
      setDownLabel(initialEncoderDownLabel || '');
    } else if (isConfigMode) { // Separate condition for config mode
      setConfigOs(initialConfigOs || osOptions[0]); // Default to first option if not set
      setConfigLayout(initialConfigLayout || layoutOptions[0]); // Default to first option if not set
    } else if (isDisplayMode) { // Separate condition for display mode
      setDisplayContrastPercent(mapValueToContrastPercent(initialDisplayContrast || 0)); // Map initial value to percentage number
      setDisplayTimeoutSeconds(Math.round((initialDisplayTimeout || 0) / 1000)); // Map initial ms to seconds
    } else {
      setCombo(mapInitialCombo(initialCombo));
      setLabel(initialLabel || '');
    }
    setOpenDropdown(null);
    setSearchTerm('');
  }, [
    isOpen,
    isEncoderMode,
    isConfigMode,
    isDisplayMode,
    initialCombo,
    initialLabel,
    initialEncoderClickCombo,
    initialEncoderUpCombo,
    initialEncoderDownCombo,
    initialEncoderClickLabel,
    initialEncoderUpLabel,
    initialEncoderDownLabel,
    initialConfigOs,
    initialConfigLayout,
    initialDisplayContrast,
    initialDisplayTimeout,
  ]);

  if (!isOpen) return null;

  // Function to toggle the visibility of a specific dropdown
  const toggleDropdown = (keyIdentifier: string | number) => {
    setOpenDropdown(openDropdown === keyIdentifier ? null : keyIdentifier);
    setSearchTerm('');
  };

  // Function to handle changing a key in a combo (for both standard and encoder keys)
  const handleChange = (value: string, keyIdentifier: string | number) => {
    if (typeof keyIdentifier === 'number') {
      // Standard key: keyIdentifier is the index
      const updated = [...combo];
      updated[keyIdentifier] = value;
      setCombo(updated);
    } else {
      // Encoder key: keyIdentifier is like 'click-0', 'up-1', etc.
      const [type, indexStr] = keyIdentifier.split('-');
      const index = parseInt(indexStr);

      if (type === 'click') {
        const updated = [...clickCombo];
        updated[index] = value;
        setClickCombo(updated);
      } else if (type === 'up') {
        const updated = [...upCombo];
        updated[index] = value;
        setUpCombo(updated);
      } else if (type === 'down') {
        const updated = [...downCombo];
        updated[index] = value;
        setDownCombo(updated);
      }
    }
    setOpenDropdown(null);
  };

  // Function to add a new empty dropdown to the combo (only for standard keys)
  const addDropdown = () => {
    if (combo.length < 5) {
      setCombo([...combo, '']);
    }
  };

  // Function to remove a dropdown from the combo (only for standard keys)
  const removeDropdown = (index: number) => {
    const updated = combo.filter((_, i) => i !== index);
    setCombo(updated.length === 0 ? [''] : updated);
  };

  // Function to add a new empty key to an encoder combo
  const addKeyToEncoderCombo = (comboType: 'click' | 'up' | 'down') => {
    const limit = 5;
    if (comboType === 'click' && clickCombo.length < limit) {
      setClickCombo([...clickCombo, '']);
    } else if (comboType === 'up' && upCombo.length < limit) {
      setUpCombo([...upCombo, '']);
    } else if (comboType === 'down' && downCombo.length < limit) {
      setDownCombo([...downCombo, '']);
    }
  };

  // Function to remove a key from an encoder combo
  const removeKeyFromEncoderCombo = (comboType: 'click' | 'up' | 'down', index: number) => {
    if (comboType === 'click') {
      const updated = clickCombo.filter((_, i) => i !== index);
      setClickCombo(updated.length === 0 ? [''] : updated);
    } else if (comboType === 'up') {
      const updated = upCombo.filter((_, i) => i !== index);
      setUpCombo(updated.length === 0 ? [''] : updated);
    } else if (comboType === 'down') {
      const updated = downCombo.filter((_, i) => i !== index);
      setDownCombo(updated.length === 0 ? [''] : updated);
    }
  };

  // Function to handle saving the combo(s)
  const handleSave = () => {
    const transformAndClean = (currentCombo: string[]) => {
      const cleaned = currentCombo.filter(Boolean); // Filters out empty strings, null, undefined
      return cleaned.map(key => {
        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          return key.toUpperCase(); // Ensure uppercase for single letters
        }
        return key.toLowerCase();
      });
    };

    if (isEncoderMode && onSaveEncoder) {
      onSaveEncoder(
        transformAndClean(clickCombo),
        clickLabel,
        transformAndClean(upCombo),
        upLabel,
        transformAndClean(downCombo),
        downLabel
      );
    } else if (onSaveConfigDisplay) {
      // Determine the current config and display values based on the active mode
      const currentConfig = {
        os: isConfigMode ? configOs : (initialConfigOs || osOptions[0]),
        layout: isConfigMode ? configLayout : (initialConfigLayout || layoutOptions[0]),
      };

      const currentDisplay = {
        contrast: isDisplayMode ? mapContrastPercentToValue(displayContrastPercent) : (initialDisplayContrast || 0),
        timeout: isDisplayMode ? displayTimeoutSeconds * 1000 : (initialDisplayTimeout || 0),
      };

      onSaveConfigDisplay(currentConfig, currentDisplay);
    } else if (onSave) {
      onSave(transformAndClean(combo), label);
    }
    onClose();
  };

  // Filter the possible keys based on the search term
  const filteredKeys = possibleKeys.filter(k =>
    k.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // KeyDropdown component with focus management for search input
  const KeyDropdown = ({
    value,
    idx,
    labelTxt,
    onChange,
    onRemove,
    onAdd,
    currentOpenDropdown,
    toggleDropdownFn,
    comboLength,
  }: {
    value: string;
    idx: number | string;
    labelTxt?: string;
    onChange: (val: string, id: number | string) => void;
    onRemove?: (id: number | string) => void;
    onAdd?: () => void;
    currentOpenDropdown: number | string | null;
    toggleDropdownFn: (id: number | string) => void;
    comboLength?: number;
  }) => {
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Effect to focus the search input when the dropdown opens
    useEffect(() => {
      if (currentOpenDropdown === idx && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [currentOpenDropdown, idx]);

    return (
      <div className="relative flex items-center space-x-2 flex-grow">
        {labelTxt && <label className="text-left text-sm font-medium text-gray-300 w-24 flex-shrink-0">{labelTxt}:</label>}
        <button
          id={`dropdownBtn-${idx}`}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-left inline-flex items-center justify-between w-40 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-150 ease-in-out"
          onClick={() => toggleDropdownFn(idx)}
        >
          <span className="truncate">{value || '(empty)'}</span>
          <svg
            className="w-2.5 h-2.5 ml-3 transform transition-transform duration-150"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
            style={{ transform: currentOpenDropdown === idx ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {currentOpenDropdown === idx && (
          <div className="z-10 absolute left-0 w-60 bg-white rounded-lg shadow-xl dark:bg-gray-700 border border-gray-600 top-full mt-2">
            <div className="p-3 border-b border-gray-200 dark:border-gray-600">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search key..."
                  ref={searchInputRef} // Attach ref here
                />
              </div>
            </div>
            <ul className="h-48 overflow-y-auto text-sm text-gray-700 dark:text-gray-200 py-1">
              <li
                className="pl-6 pr-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-left transition duration-100 ease-in-out rounded-md mx-1"
                onClick={() => onChange('', idx)}
              >
                (empty)
              </li>
              {filteredKeys.length > 0 ? (
                filteredKeys.map((k) => (
                  <li
                    key={k}
                    className="pl-6 pr-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-left transition duration-100 ease-in-out rounded-md mx-1"
                    onClick={() => onChange(k, idx)}
                  >
                    {k}
                  </li>
                ))
              ) : (
                <li className="pl-6 pr-4 py-2 text-gray-400 dark:text-gray-500 text-left">No results</li>
              )}
            </ul>
          </div>
        )}

        {/* Remove button logic: show if onRemove is provided AND there's more than one key in the combo */}
        {onRemove && (comboLength && comboLength > 1) && (
          <button
            className="bg-red-500 text-white px-4 p-2 rounded-lg hover:bg-red-600 transition duration-150 ease-in-out flex items-center justify-center"
            onClick={() => onRemove(idx)}
            title="Remove Key"
          >
            -
          </button>
        )}
        {/* Add button logic: show if onAdd is provided AND there are less than 5 keys */}
        {onAdd && (comboLength && comboLength < 5) && (
          <button
            className="bg-blue-500 text-white px-4 p-2 rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out flex items-center justify-center"
            onClick={onAdd}
            title="Add Key"
          >
            +
          </button>
        )}
      </div>
    );
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#333333DD] z-50 font-sans">
      <div className="bg-[#444] p-6 rounded-lg shadow-lg w-auto text-white text-center min-w-[300px]">
        <h2 className="text-2xl font-bold mb-6">
          {isEncoderMode ? 'Edit Encoder Actions' : isConfigMode ? 'Edit Configuration' : isDisplayMode ? 'Edit Display' : 'Edit Key'}
        </h2>

        {/* Conditional Label Input (only for standard keys) */}
        {!isEncoderMode && !isConfigMode && !isDisplayMode && (
          <div className="mb-4">
            <label htmlFor="combo-label" className="block text-left text-sm font-medium text-gray-300 mb-1">
              Label:
            </label>
            <input
              type="text"
              id="combo-label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="e.g., 'Copy Text' or 'Open Menu'"
            />
          </div>
        )}

        {isEncoderMode ? (
          <>
            <h3 className="text-xl font-semibold mb-3 text-gray-200 text-left">Encoder Actions:</h3>
            <div className="flex flex-col gap-4 mb-6 items-start">
              {/* Encoder Click Action */}
              <div className="w-full"> {/* Added w-full to contain label and keys */}
                <div className="mb-2">
                  <label htmlFor="click-label" className="block text-left text-sm font-medium text-gray-300 mb-1">
                    Click Label:
                  </label>
                  <input
                    type="text"
                    id="click-label"
                    value={clickLabel}
                    onChange={(e) => setClickLabel(e.target.value)}
                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="e.g., 'Encoder Click'"
                  />
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  {clickCombo.map((value, idx) => (
                    <KeyDropdown
                      key={`click-${idx}`}
                      value={value}
                      idx={`click-${idx}`}
                      onChange={handleChange}
                      onRemove={() => removeKeyFromEncoderCombo('click', idx)}
                      onAdd={idx === clickCombo.length - 1 ? () => addKeyToEncoderCombo('click') : undefined}
                      currentOpenDropdown={openDropdown}
                      toggleDropdownFn={toggleDropdown}
                      comboLength={clickCombo.length}
                    />
                  ))}
                  {clickCombo.length === 0 && (
                    <KeyDropdown
                      value={''}
                      idx={`click-0`}
                      onChange={handleChange}
                      onAdd={() => addKeyToEncoderCombo('click')}
                      currentOpenDropdown={openDropdown}
                      toggleDropdownFn={toggleDropdown}
                      comboLength={clickCombo.length}
                    />
                  )}
                </div>
              </div>

              {/* Encoder Up Action */}
              <div className="w-full">
                <div className="mb-2">
                  <label htmlFor="up-label" className="block text-left text-sm font-medium text-gray-300 mb-1">
                    Rotate Up Label:
                  </label>
                  <input
                    type="text"
                    id="up-label"
                    value={upLabel}
                    onChange={(e) => setUpLabel(e.target.value)}
                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="e.g., 'Volume Up'"
                  />
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  {upCombo.map((value, idx) => (
                    <KeyDropdown
                      key={`up-${idx}`}
                      value={value}
                      idx={`up-${idx}`}
                      onChange={handleChange}
                      onRemove={() => removeKeyFromEncoderCombo('up', idx)}
                      onAdd={idx === upCombo.length - 1 ? () => addKeyToEncoderCombo('up') : undefined}
                      currentOpenDropdown={openDropdown}
                      toggleDropdownFn={toggleDropdown}
                      comboLength={upCombo.length}
                    />
                  ))}
                  {upCombo.length === 0 && (
                    <KeyDropdown
                      value={''}
                      idx={`up-0`}
                      onChange={handleChange}
                      onAdd={() => addKeyToEncoderCombo('up')}
                      currentOpenDropdown={openDropdown}
                      toggleDropdownFn={toggleDropdown}
                      comboLength={upCombo.length}
                    />
                  )}
                </div>
              </div>

              {/* Encoder Down Action */}
              <div className="w-full">
                <div className="mb-2">
                  <label htmlFor="down-label" className="block text-left text-sm font-medium text-gray-300 mb-1">
                    Rotate Down Label:
                  </label>
                  <input
                    type="text"
                    id="down-label"
                    value={downLabel}
                    onChange={(e) => setDownLabel(e.target.value)}
                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="e.g., 'Volume Down'"
                  />
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  {downCombo.map((value, idx) => (
                    <KeyDropdown
                      key={`down-${idx}`}
                      value={value}
                      idx={`down-${idx}`}
                      onChange={handleChange}
                      onRemove={() => removeKeyFromEncoderCombo('down', idx)}
                      onAdd={idx === downCombo.length - 1 ? () => addKeyToEncoderCombo('down') : undefined}
                      currentOpenDropdown={openDropdown}
                      toggleDropdownFn={toggleDropdown}
                      comboLength={downCombo.length}
                    />
                  ))}
                  {downCombo.length === 0 && (
                    <KeyDropdown
                      value={''}
                      idx={`down-0`}
                      onChange={handleChange}
                      onAdd={() => addKeyToEncoderCombo('down')}
                      currentOpenDropdown={openDropdown}
                      toggleDropdownFn={toggleDropdown}
                      comboLength={downCombo.length}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        ) : isConfigMode ? ( // Separate UI for config mode
          <>
            <h3 className="text-xl font-semibold mb-3 text-gray-200 text-left">Configuration:</h3>
            <div className="flex flex-col gap-4 mb-6 items-start">
              {/* OS */}
              <div className="w-full">
                <label htmlFor="config-os" className="block text-left text-sm font-medium text-gray-300 mb-1">
                  OS:
                </label>
                <select
                  id="config-os"
                  value={configOs}
                  onChange={(e) => setConfigOs(e.target.value)}
                  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {osOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              {/* Layout */}
              <div className="w-full">
                <label htmlFor="config-layout" className="block text-left text-sm font-medium text-gray-300 mb-1">
                  Layout:
                </label>
                <select
                  id="config-layout"
                  value={configLayout}
                  onChange={(e) => setConfigLayout(e.target.value)}
                  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {layoutOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </>
        ) : isDisplayMode ? ( // Separate UI for display mode
          <>
            <h3 className="text-xl font-semibold mb-3 text-gray-200 text-left">Display:</h3>
            <div className="flex flex-col gap-4 mb-6 items-start">
              {/* Contrast */}
              <div className="w-full">
                <label htmlFor="display-contrast" className="block text-left text-sm font-medium text-gray-300 mb-1">
                  Contrast (%):
                </label>
                <input
                  type="number"
                  id="display-contrast"
                  value={displayContrastPercent}
                  onChange={(e) => setDisplayContrastPercent(parseInt(e.target.value, 10) || 0)}
                  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  min="1"
                  max="100"
                />
              </div>
              {/* Timeout */}
              <div className="w-full">
                <label htmlFor="display-timeout" className="block text-left text-sm font-medium text-gray-300 mb-1">
                  Timeout (seconds):
                </label>
                <input
                  type="number"
                  id="display-timeout"
                  value={displayTimeoutSeconds}
                  onChange={(e) => setDisplayTimeoutSeconds(parseInt(e.target.value, 10) || 0)}
                  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  min="0"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <label className="block text-left text-sm font-medium text-gray-300 mb-1">
              Keys:
            </label>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
              {combo.map((value, idx) => (
                <KeyDropdown
                  key={idx}
                  value={value}
                  idx={idx}
                  onChange={handleChange}
                  onRemove={(id) => removeDropdown(id as number)} // Cast id to number for standard key removal
                  currentOpenDropdown={openDropdown}
                  toggleDropdownFn={toggleDropdown}
                  comboLength={combo.length}
                />
              ))}

              {combo.length < 5 && (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out shadow-md"
                  onClick={addDropdown}
                >
                  +
                </button>
              )}
            </div>
          </>
        )}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 transition duration-150 ease-in-out"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-green-800 transition duration-150 ease-in-out"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default KeysEditorDialog;
