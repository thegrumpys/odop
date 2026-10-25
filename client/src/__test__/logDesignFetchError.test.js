import logDesignFetchError from '../logDesignFetchError';
import { logUsage } from '../logUsage';

jest.mock('../logUsage', () => ({ logUsage: jest.fn() }));

const type = 'Spring/Compression';
const record = () => logUsage.mock.calls[0][2];

beforeEach(() => jest.clearAllMocks());

test('records missing response type and useful response metadata without design contents', () => {
  const response = {
    status: 200,
    data: { jsontype: 'ODOP', version: '8', private_design: 'secret design contents' },
    headers: { 'content-type': 'application/json', 'x-request-id': 'request-123' },
    config: { url: '/api/v1/designs/Startup?token=secret', headers: { Authorization: 'Bearer secret' } },
    request: { responseURL: 'https://user:password@example.com/designs/Startup?token=secret#secret' }
  };
  logDesignFetchError(new Error('secret error contents'), response, type, 'Startup', 'App', 'validate');
  expect(logUsage).toHaveBeenCalledTimes(1);
  expect(logUsage).toHaveBeenCalledWith('event', 'DesignFetchError', expect.objectContaining({
    event_label: 'Response type is missing or is not a string',
    source: 'App', phase: 'validate', requested_type: type, design_name: 'Startup',
    response_kind: 'object', received_type_kind: 'undefined', status: 200,
    content_type: 'application/json', request_id: 'request-123',
    response_url: 'https://example.com/designs/Startup',
    jsontype: 'ODOP', version: '8'
  }));
  expect(record().request_url).toBe(window.location.origin + '/api/v1/designs/Startup');
  expect(JSON.stringify(record())).not.toMatch(/secret|password|Bearer|Authorization/);
});

test('records a mismatched type', () => {
  logDesignFetchError(new Error(), { data: { type: 'Solid' } }, type, 'Startup', 'FileOpen', 'validate');
  expect(record()).toMatchObject({
    event_label: 'Response type does not match requested type', received_type: 'Solid', received_type_kind: 'string'
  });
});

test.each([null, [], '<!DOCTYPE html><html></html>'])('records non-object responses: %p', data => {
  logDesignFetchError(new Error(), { data }, type, 'Startup', 'App', 'validate');
  expect(record().event_label).toBe('Response is not a design object');
  if (typeof data === 'string') {
    expect(record()).toMatchObject({ response_kind: 'string', response_length: data.length, resembles_html: true });
  }
});

test('records HTTP errors using the Axios error response and header getter', () => {
  const error = Object.assign(new Error(), {
    code: 'ERR_BAD_RESPONSE',
    response: { status: 500, data: {}, headers: { get: name => name === 'content-type' ? 'application/json' : null } }
  });
  logDesignFetchError(error, undefined, type, 'Startup', 'App', 'fetch');
  expect(record()).toMatchObject({ phase: 'fetch', status: 500, error_code: 'ERR_BAD_RESPONSE', content_type: 'application/json' });
});

test('records network failures without requiring a response', () => {
  logDesignFetchError(Object.assign(new Error(), { code: 'ERR_NETWORK' }), undefined, type, 'Startup', 'App', 'fetch');
  expect(record()).toMatchObject({ event_label: 'Failure during fetch', error_code: 'ERR_NETWORK', response_kind: 'undefined' });
});

test('distinguishes migration failures from fetch failures and bounds metadata', () => {
  const data = { type, version: 'v'.repeat(500) };
  for (let i = 0; i < 30; i++) data['key' + i] = 'private';
  logDesignFetchError(new TypeError(), { status: 200, data }, type, 'Startup', 'App', 'migrate');
  expect(record()).toMatchObject({ event_label: 'Failure during migrate', error_name: 'TypeError', status: 200 });
  expect(record().response_keys).toHaveLength(20);
  expect(record().version).toHaveLength(200);
});
