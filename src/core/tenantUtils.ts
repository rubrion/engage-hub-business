import React, { createContext } from 'react';

import { FEATURES } from '../config';

/**
 * Resolves the current tenant based on the environment and URL
 *
 * In development: Uses the 'tenant' query parameter or falls back to 'demo'
 * In production: Uses the first subdomain of the hostname
 *
 * @example
 * // In development with ?tenant=acme
 * resolveTenant() // returns 'acme'
 *
 * // In production with acme.rubrion.com
 * resolveTenant() // returns 'acme'
 *
 * @returns The resolved tenant identifier
 */
export function resolveTenant(): string {
  // If multi-tenant feature is disabled, always return 'default'
  if (!FEATURES.MULTI_TENANT) {
    return 'default';
  }

  if (import.meta.env.DEV) {
    return new URL(window.location.href).searchParams.get('tenant') ?? 'demo';
  }

  return window.location.hostname.split('.')[0];
}

/**
 * Creates a tenant-specific URL
 *
 * @param tenant Tenant identifier
 * @param path URL path
 * @returns Fully qualified URL with tenant
 */
export function createTenantUrl(tenant: string, path: string): string {
  // If multi-tenant feature is disabled, don't include tenant in URL
  if (!FEATURES.MULTI_TENANT) {
    return new URL(path, window.location.origin).toString();
  }

  if (import.meta.env.DEV) {
    const url = new URL(path, window.location.origin);
    url.searchParams.set('tenant', tenant);
    return url.toString();
  }

  // In production, assume a subdomain-based routing
  const baseDomain = window.location.hostname.split('.').slice(1).join('.');
  return `https://${tenant}.${baseDomain}${path}`;
}

// Create tenant context
export const TenantContext = createContext<string>('demo');

// Props for TenantProvider
export interface TenantProviderProps {
  children: React.ReactNode;
  initialTenant?: string;
}
