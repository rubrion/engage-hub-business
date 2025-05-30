import { useEffect, useState } from 'react';

import {
  resolveTenant,
  TenantContext,
  TenantProviderProps,
} from './tenantUtils';

/**
 * Provider component for tenant context
 */
export function TenantProvider({
  children,
  initialTenant,
}: TenantProviderProps) {
  const [tenant, setTenant] = useState<string>(
    initialTenant || resolveTenant()
  );

  useEffect(() => {
    if (!import.meta.env.DEV) return;

    const handleUrlChange = () => {
      const newTenant = resolveTenant();
      if (newTenant !== tenant) {
        setTenant(newTenant);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, [tenant]);

  return (
    <TenantContext.Provider value={tenant}>{children}</TenantContext.Provider>
  );
}
