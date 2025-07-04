import React from 'react';
import Alert from 'react-bootstrap/Alert';

export default function MessageAlert({ error }) {
//  console.log('MessageAlert','error=',error);
  if (!error) return null;

  const { message, severity } = error;
//  console.log('MessageAlert','message=',message,'severity=',severity);

  // Map custom severities to Bootstrap variants
  const variant = {
    error: 'danger',
    warning: 'warning',
    info: 'info'
  }[severity] || 'danger';

//  console.log('MessageAlert','message=',message,'variant=',variant);
  return (
    <Alert variant={variant} className="mt-3">{message}</Alert>
  );
}