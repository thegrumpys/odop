import { logUsage } from './logUsage';

function safeUrl(value) {
  if (!value) return undefined;
  try {
    const url = new URL(value, window.location.origin);
    return url.origin + url.pathname;
  } catch {
    return undefined;
  }
}

function kind(value) {
  return value === null ? 'null' : Array.isArray(value) ? 'array' : typeof value;
}

function summary(value) {
  return typeof value === 'string' ? value.slice(0, 200) :
    typeof value === 'number' || typeof value === 'boolean' ? value : undefined;
}

export default function logDesignFetchError(error, response, type, name, source, phase) {
  response = response || error.response;
  const design = response?.data;
  const headers = response?.headers;
  const header = name => summary(typeof headers?.get === 'function' ? headers.get(name) : headers?.[name]);
  const isObject = design !== null && typeof design === 'object' && !Array.isArray(design);
  const reason = phase !== 'validate' ? 'Failure during ' + phase :
    !isObject ? 'Response is not a design object' :
    typeof design.type !== 'string' ? 'Response type is missing or is not a string' :
    'Response type does not match requested type';

  logUsage('event', 'DesignFetchError', {
    event_label: reason,
    source,
    phase,
    requested_type: type,
    design_name: name,
    error_name: summary(error.name),
    error_code: summary(error.code),
    response_kind: kind(design),
    received_type: summary(isObject ? design.type : undefined),
    received_type_kind: kind(isObject ? design.type : undefined),
    status: response?.status,
    content_type: header('content-type'),
    content_length: header('content-length'),
    request_id: header('x-request-id'),
    cache_control: header('cache-control'),
    request_url: safeUrl(response?.config?.url || error.config?.url),
    response_url: safeUrl(response?.request?.responseURL || error.request?.responseURL),
    response_keys: isObject ? Object.keys(design).slice(0, 20).map(key => key.slice(0, 80)) : undefined,
    jsontype: summary(isObject ? design.jsontype : undefined),
    version: summary(isObject ? design.version : undefined),
    response_length: typeof design === 'string' || Array.isArray(design) ? design.length : undefined,
    resembles_html: typeof design === 'string' ? /^\s*(<!doctype\s+html|<html[\s>])/i.test(design) : undefined,
    page_url: safeUrl(window.location.href),
    user_agent: navigator.userAgent.slice(0, 512),
    service_worker_controlled: Boolean(navigator.serviceWorker?.controller)
  });
}
