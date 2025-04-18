//=============================================================================
// Alerts Types
//=============================================================================
export const CLEAR_ALERTS = 'alertsSlice/clearAlerts';
export const ADD_ALERT = 'alertsSlice/addAlert';
export const SET_ACTIVE_KEY = 'alertsSlice/setActiveKey';
export const SET_CARET = 'alertsSlice/setCaret';
export const SET_LEVEL = 'alertsSlice/setLevel';

//=============================================================================
// ExecutePanel Types
//=============================================================================
export const EXECUTE_START = 'executePanelSlice/executeStart';
export const EXECUTE_STOP_ON_LOAD = 'executePanelSlice/executeStopOnLoad';
export const EXECUTE_STOP = 'executePanelSlice/executeStop';
export const SET_SHOW = 'executePanelSlice/setShow';
export const SET_EXECUTE_NAME = 'executePanelSlice/setExecuteName';
export const SET_PREFIX = 'executePanelSlice/setPrefix';
export const SET_STATES = 'executePanelSlice/setStates';
export const SET_STEP = 'executePanelSlice/setStep';
export const SET_STEPS = 'executePanelSlice/setSteps';
export const SET_STOP_ON_FILE_LOAD = 'executePanelSlice/setStopOnFileLoad';
export const SET_TEST_GENERATE = 'executePanelSlice/setTestGenerate';
export const OUTPUT_START = 'executePanelSlice/outputStart';
export const OUTPUT_LINE = 'executePanelSlice/outputLine';
export const OUTPUT_STOP = 'executePanelSlice/outputStop';

//=============================================================================
// Message Types
//=============================================================================
export const ADD_MESSAGE = 'messageSlice/addMessage';
export const DISABLE_MESSAGE = 'messageSlice/disableMessage';

//=============================================================================
// Model Types
//=============================================================================
export const INJECT = 'modelSlice/inject';
export const STARTUP = 'modelSlice/startup';
export const LOAD = 'modelSlice/load';
export const LOAD_INITIAL_STATE = 'modelSlice/loadInitialState';
export const CHANGE_NAME = 'modelSlice/changeName';
export const CHANGE_USER = 'modelSlice/changeUser';
export const CHANGE_VIEW = 'modelSlice/changeView';

export const CHANGE_SYMBOL_VALUE = 'modelSlice/changeSymbolValue';
export const FIX_SYMBOL_VALUE = 'modelSlice/fixSymbolValue';
export const FREE_SYMBOL_VALUE = 'modelSlice/freeSymbolValue';
export const CHANGE_SYMBOL_VIOLATION = 'modelSlice/changeSymbolViolations';
export const CHANGE_SYMBOL_CONSTRAINT = 'modelSlice/changeSymbolContraint';
export const CHANGE_SYMBOL_CONSTRAINTS = 'modelSlice/changeSymbolConstraints';
export const SET_SYMBOL_FLAG = 'modelSlice/setSymbolFlag';
export const RESET_SYMBOL_FLAG = 'modelSlice/resetSymbolFlag';
export const CHANGE_SYMBOL_INPUT = 'modelSlice/changeSymbolInput';
export const CHANGE_SYMBOL_HIDDEN = 'modelSlice/changeSymbolHidden';

export const CHANGE_INPUT_SYMBOL_VALUES = 'modelSlice/changeInputSymbolValues';
export const SAVE_INPUT_SYMBOL_VALUES = 'modelSlice/saveInputSymbolValues';
export const RESTORE_INPUT_SYMBOL_VALUES = 'modelSlice/restoreInputSymbolValues';

export const CHANGE_OUTPUT_SYMBOL_VALUES = 'modelSlice/changeOutputSymbolValues';
export const SAVE_OUTPUT_SYMBOL_CONSTRAINTS = 'modelSlice/SaveOutputSymbolConstraints';
export const RESTORE_OUTPUT_SYMBOL_CONSTRAINTS = 'modelSlice/restoreOutputSymbolContraints';

export const CHANGE_RESULT_OBJECTIVE_VALUE = 'modelSlice/changeResultObjectiveValue';
export const CHANGE_RESULT_TERMINATION_CONDITION = 'modelSlice/changeResultTerminationCondition';
export const CHANGE_RESULT_SEARCH_COMPLETED = 'modelSlice/changeResultSearchCompleted';

export const CHANGE_LABELS_VALUE = 'modelSlice/changeLabelsValue';
export const CHANGE_SYSTEM_CONTROLS_VALUE = 'modelSlice/changeSystemControlsValue';

export const SEARCH = 'modelSlice/search';
export const SEEK = 'modelSlice/seek';

export const SAVE_AUTO_SAVE = 'modelSlice/saveAutoSave';
export const RESTORE_AUTO_SAVE = 'modelSlice/restoreAutoSave';
export const DELETE_AUTO_SAVE = 'modelSlice/deleteAutoSave';

export const LOG_USAGE = 'modelSlice/logUsage';
export const ENABLE_DISPATCHER = 'modelSlice/enableDispatcher';

//=============================================================================
// Spinner Types
//=============================================================================
export const ENABLE_SPINNER = 'spinnerSlice/enableSpinner';
export const DISABLE_SPINNER = 'spinnerSlice/disableSpinner';
