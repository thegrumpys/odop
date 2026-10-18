import React, { act } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import AdminLogNote from '../menus/Admin/AdminLogNote';
import { logUsage } from '../logUsage';

jest.mock('../logUsage', () => ({ logUsage: jest.fn() }));

global.IS_REACT_ACT_ENVIRONMENT = true;

let div;
let root;

beforeEach(() => {
  jest.clearAllMocks();
  div = document.createElement('div');
  document.body.appendChild(div);
  root = ReactDOMClient.createRoot(div);
  act(() => root.render(<AdminLogNote />));
  act(() => div.querySelector('a').click());
});

afterEach(() => {
  act(() => root.unmount());
  div.remove();
});

function enterNote(note) {
  const textarea = document.querySelector('textarea');
  act(() => {
    Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(textarea, note);
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
  });
}

function submitNote() {
  act(() => document.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
}

function pressEnter(options = {}) {
  const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true, ...options });
  act(() => document.querySelector('textarea').dispatchEvent(event));
  return event;
}

test('Enter submits the note', () => {
  enterNote('Submit with Enter');
  expect(pressEnter().defaultPrevented).toBe(true);
  expect(logUsage).toHaveBeenCalledTimes(1);
  expect(logUsage).toHaveBeenCalledWith('event', 'AdminLogNote', { event_label: 'Submit with Enter' });
});

test('Shift+Enter allows a new line without submitting', () => {
  enterNote('First line');
  expect(pressEnter({ shiftKey: true }).defaultPrevented).toBe(false);
  expect(logUsage).not.toHaveBeenCalled();
});

test('Enter does not submit an empty note or interrupt text composition', () => {
  enterNote('   ');
  pressEnter();
  expect(logUsage).not.toHaveBeenCalled();
  enterNote('Composing');
  expect(pressEnter({ isComposing: true }).defaultPrevented).toBe(false);
  expect(logUsage).not.toHaveBeenCalled();
});

test('opens a titled dialog with a textarea and footer buttons, rejecting blank notes', () => {
  expect(document.querySelector('.modal-title').textContent).toBe('Log Note');
  expect(document.querySelector('label').htmlFor).toBe(document.querySelector('textarea').id);
  const buttons = document.querySelectorAll('.modal-footer button');
  expect(Array.from(buttons, (button) => button.textContent)).toEqual(['Cancel', 'Submit']);
  expect(buttons[1].disabled).toBe(true);
  enterNote('   \n');
  submitNote();
  expect(logUsage).not.toHaveBeenCalled();
  expect(buttons[1].disabled).toBe(true);
});

test('submits a multiline note to the usage logger and clears the input', () => {
  const note = "Administrator's note\nSecond line";
  enterNote(note);
  expect(document.querySelector('button[type="submit"]').disabled).toBe(false);
  submitNote();
  expect(logUsage).toHaveBeenCalledTimes(1);
  expect(logUsage).toHaveBeenCalledWith('event', 'AdminLogNote', { event_label: note });
  act(() => div.querySelector('a').click());
  expect(document.querySelector('textarea').value).toBe('');
});

test('cancel discards the note without logging it', () => {
  enterNote('Discard this note');
  act(() => document.querySelector('.modal-footer button').click());
  expect(logUsage).not.toHaveBeenCalled();
  act(() => div.querySelector('a').click());
  expect(document.querySelector('textarea').value).toBe('');
});
