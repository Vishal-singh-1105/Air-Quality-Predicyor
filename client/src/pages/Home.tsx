import { useEffect } from 'react';
import { useLocation } from 'wouter';
import Dashboard from './Dashboard';

/**
 * Home Page - Redirects to Dashboard
 */
export default function Home() {
  return <Dashboard />;
}
