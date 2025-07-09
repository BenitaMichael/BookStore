import React, { useState } from 'react';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleReset = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');
      setMessage('Password reset link sent. Check your email.');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-purple-700 dark:text-white">
          Forgot Password
        </h2>
        <form className="space-y-4" onSubmit={handleReset}>
          <div>
            <Label value="Email address" />
            <TextInput
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" />
                <span>Sending...</span>
              </div>
            ) : (
              'Send Reset Link'
            )}
          </Button>
        </form>
        {message && <Alert color="success" className="mt-4">{message}</Alert>}
        {error && <Alert color="failure" className="mt-4">{error}</Alert>}
      </div>
    </div>
  );
};

export default ForgotPassword;
