import { useContext } from 'react';

import { TenantContext } from '../core/tenantUtils';

export const useTenant = (): string => useContext(TenantContext);

export { createTenantUrl, resolveTenant } from '../core/tenantUtils';
