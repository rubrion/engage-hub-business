import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { getDataSourceMode } from '../../config';
import { useTenant } from '../../hooks/useTenantContext';
import { getMockWorker } from '../../mocks/workerUtils';
import { semanticColors } from '../../theme/colors';
import { layout } from '../../theme/themeUtils';
import { debugLog, isDebugEnabled } from '../../utils/debugControl';

/**
 * Debug component for toggling data source and tenant
 */
const DataSourceToggle: React.FC = () => {
  const currentTenant = useTenant();

  const currentMode = getDataSourceMode();

  const [dataSource, setDataSource] = useState<'mock' | 'api'>(
    currentMode.IS_MOCK ? 'mock' : 'api'
  );

  const [tenant, setTenant] = useState<string>(currentTenant);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const handleDataSourceChange = async (
    _: React.MouseEvent<HTMLElement>,
    newValue: 'mock' | 'api'
  ) => {
    if (!newValue) return;

    setDataSource(newValue);
    setStatusMessage({ type: 'info', message: 'Switching data source...' });

    if (newValue === 'mock') {
      localStorage.setItem('useMSW', 'true');
      localStorage.setItem('useFirestore', 'false');
      localStorage.setItem('dataSource', 'mock');

      debugLog('Switching to Mock data source');

      if (window.__IS_MSW_ACTIVE__ !== true) {
        try {
          const worker = await getMockWorker();
          if (worker) {
            await worker.start({
              onUnhandledRequest: 'bypass',
              serviceWorker: {
                url: '/mockServiceWorker.js',
                options: { scope: '/' },
              },
            });
            window.__IS_MSW_ACTIVE__ = true;
            window.location.reload();
          } else {
            setStatusMessage({
              type: 'error',
              message: 'Failed to get MSW worker',
            });
          }
        } catch (error: unknown) {
          setStatusMessage({
            type: 'error',
            message: `Failed to start MSW: ${error instanceof Error ? error.message : String(error)}`,
          });
        }
      } else {
        window.location.reload();
      }
    } else {
      localStorage.setItem('useMSW', 'false');
      localStorage.setItem('dataSource', 'api');

      debugLog('Switching to API data source');

      if (window.__IS_MSW_ACTIVE__ === true) {
        try {
          const worker = await getMockWorker();
          if (worker) {
            worker.stop();
          }
          window.__IS_MSW_ACTIVE__ = false;
          window.location.reload();
        } catch (error: unknown) {
          debugLog('Error stopping MSW worker:', error);
          window.location.reload();
        }
      } else {
        window.location.reload();
      }
    }
  };

  const handleTenantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTenant(e.target.value);
  };

  const applyTenantChange = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('tenant', tenant);
    window.location.href = url.toString();
  };

  useEffect(() => {
    const checkDataSource = () => {
      const currentMode = getDataSourceMode();
      const currentSource = currentMode.IS_MOCK ? 'mock' : 'api';

      setDataSource(currentSource);
    };

    checkDataSource();

    const storageHandler = () => checkDataSource();
    window.addEventListener('storage', storageHandler);

    return () => {
      window.removeEventListener('storage', storageHandler);
    };
  }, []);

  if (!isDebugEnabled()) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: layout.offset.small,
        left: layout.offset.small,
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => setExpanded(!expanded)}
          sx={{ mb: 1 }}
        >
          {expanded ? 'Hide' : 'Debug'}
        </Button>

        {expanded && (
          <Paper
            sx={{
              p: 2,
              backgroundColor: 'rgba(0,0,0,0.8)',
              borderRadius: 2,
              backdropFilter: 'blur(4px)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              color: 'white',
              width: 300,
              position: 'absolute',
              bottom: layout.offset.medium,
              left: 0,
            }}
          >
            {statusMessage && (
              <Alert
                severity={statusMessage.type}
                sx={{ mb: 2, '& .MuiAlert-message': { color: 'text.primary' } }}
                onClose={() => setStatusMessage(null)}
              >
                {statusMessage.message}
              </Alert>
            )}

            {/* Tenant selection */}
            <Typography
              variant="caption"
              sx={{ display: 'block', textAlign: 'center', mb: 0.5 }}
            >
              Tenant: <strong>{currentTenant}</strong>
            </Typography>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <TextField
                size="small"
                value={tenant}
                onChange={handleTenantChange}
                placeholder="tenant-id"
                variant="outlined"
                sx={{
                  flex: 1,
                  mr: 1,
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255,255,255,0.5)',
                    },
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                  },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={applyTenantChange}
              >
                Apply
              </Button>
            </Box>

            {/* Data source toggle - simplified to just Mock and API */}
            <Typography
              variant="caption"
              sx={{ display: 'block', textAlign: 'center', mb: 0.5 }}
            >
              Data Source
            </Typography>
            <ToggleButtonGroup
              value={dataSource}
              exclusive
              onChange={handleDataSourceChange}
              size="small"
              aria-label="data source"
              sx={{ width: '100%', mb: 1 }}
            >
              <ToggleButton
                value="mock"
                sx={{
                  color: 'white',
                  '&.Mui-selected': { bgcolor: semanticColors.warning.main },
                  width: '50%',
                }}
              >
                Mock
              </ToggleButton>
              <ToggleButton
                value="api"
                sx={{
                  color: 'white',
                  '&.Mui-selected': { bgcolor: semanticColors.info.main },
                  width: '50%',
                }}
              >
                API
              </ToggleButton>
            </ToggleButtonGroup>

            {/* Config info */}
            <Typography
              variant="caption"
              sx={{ display: 'block', mt: 1, fontSize: '0.7rem' }}
            >
              <strong>Current Configuration:</strong>
              <br />
              Tenant: {currentTenant}
              <br />
              Mode: {dataSource}
              <br />
              MSW Active: {window.__IS_MSW_ACTIVE__ ? 'Yes' : 'No'}
              <br />
              {import.meta.env.VITE_USE_FIRESTORE === 'true' && (
                <span>
                  Using:{' '}
                  {currentMode.USE_FIRESTORE ? 'Firestore DB' : 'REST API'}
                  <br />
                </span>
              )}
              <br />
              <strong>Local Storage:</strong>
              <br />
              useMSW: {localStorage.getItem('useMSW') || 'not set'}
              <br />
              dataSource: {localStorage.getItem('dataSource') || 'not set'}
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default DataSourceToggle;
