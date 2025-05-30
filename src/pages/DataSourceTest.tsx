import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

import { IS_MOCK, USE_FIRESTORE } from '../config';
import BaseLayout from '../layouts/BaseLayout';
import { fetchBlogPosts, PaginatedBlogResponse } from '../services/blog';
import { fetchProjects, PaginatedProjectResponse } from '../services/projects';

// Use the actual response types from the services
type BlogData = PaginatedBlogResponse;
type ProjectData = PaginatedProjectResponse;

const DataSourceTest: React.FC = () => {
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [projectsData, setProjectsData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [networkLogs, setNetworkLogs] = useState<string[]>([]);

  const activeDataSource = IS_MOCK
    ? 'Mock (MSW)'
    : USE_FIRESTORE
      ? 'Firestore'
      : 'API';

  const addNetworkLog = useCallback((message: string) => {
    setNetworkLogs((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] ${message}`,
    ]);
  }, []);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setNetworkLogs([]);

    try {
      addNetworkLog(`Fetching blog posts from ${activeDataSource}...`);
      const blogs = await fetchBlogPosts(1, 3);
      setBlogData(blogs);
      addNetworkLog(`✅ Successfully fetched ${blogs.posts.length} blog posts`);

      addNetworkLog(`Fetching projects from ${activeDataSource}...`);
      const projects = await fetchProjects(1, 3);
      setProjectsData(projects);
      addNetworkLog(
        `✅ Successfully fetched ${projects.projects.length} projects`
      );
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(
        `Failed to fetch data: ${err instanceof Error ? err.message : String(err)}`
      );
      addNetworkLog(
        `❌ Error: ${err instanceof Error ? err.message : String(err)}`
      );
    } finally {
      setLoading(false);
    }
  }, [activeDataSource, addNetworkLog]);

  useEffect(() => {
    // Automatically fetch on first load
    fetchAllData();
  }, [fetchAllData]);

  return (
    <BaseLayout>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Data Source Test
        </Typography>

        <Paper
          sx={{
            p: 3,
            mb: 4,
            bgcolor: 'primary.light',
            color: 'primary.contrastText',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Active Data Source: <strong>{activeDataSource}</strong>
          </Typography>
          <Typography>
            This page tests which data source is actually being used to fetch
            data. Click "Refresh Data" to make new requests.
          </Typography>
        </Paper>

        <Box sx={{ mb: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={fetchAllData}
            disabled={loading}
            sx={{ mr: 2 }}
          >
            {loading ? 'Loading...' : 'Refresh Data'}
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Reset All Settings
          </Button>
        </Box>

        {error && (
          <Paper
            sx={{ p: 2, mb: 4, bgcolor: 'error.light', color: 'error.dark' }}
          >
            <Typography>{error}</Typography>
          </Paper>
        )}

        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {/* Blog Posts Data */}
          <Card sx={{ flex: 1, minWidth: 300 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Blog Posts Data
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {loading ? (
                <Typography>Loading...</Typography>
              ) : blogData ? (
                <Box>
                  <Typography>
                    <strong>Posts:</strong> {blogData.posts.length}
                  </Typography>
                  <Typography>
                    <strong>Total Pages:</strong> {blogData.totalPages}
                  </Typography>
                  <Typography sx={{ mt: 1, fontWeight: 'bold' }}>
                    First Post:
                  </Typography>
                  {blogData.posts.length > 0 && (
                    <Typography noWrap>{blogData.posts[0].title}</Typography>
                  )}
                </Box>
              ) : (
                <Typography>No data</Typography>
              )}
            </CardContent>
          </Card>

          {/* Projects Data */}
          <Card sx={{ flex: 1, minWidth: 300 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Projects Data
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {loading ? (
                <Typography>Loading...</Typography>
              ) : projectsData ? (
                <Box>
                  <Typography>
                    <strong>Projects:</strong> {projectsData.projects.length}
                  </Typography>
                  <Typography>
                    <strong>Total Pages:</strong> {projectsData.totalPages}
                  </Typography>
                  <Typography sx={{ mt: 1, fontWeight: 'bold' }}>
                    First Project:
                  </Typography>
                  {projectsData.projects.length > 0 && (
                    <Typography noWrap>
                      {projectsData.projects[0].title}
                    </Typography>
                  )}
                </Box>
              ) : (
                <Typography>No data</Typography>
              )}
            </CardContent>
          </Card>
        </Box>

        {/* Network Logs */}
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Network Logs
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box
              sx={{
                bgcolor: 'grey.900',
                color: 'grey.100',
                p: 2,
                borderRadius: 1,
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                maxHeight: 200,
                overflowY: 'auto',
              }}
            >
              {networkLogs.length > 0 ? (
                networkLogs.map((log, i) => (
                  <Box key={i} sx={{ mb: 0.5 }}>
                    {log}
                  </Box>
                ))
              ) : (
                <Typography variant="body2">
                  No network activity recorded
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Configuration Info */}
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Configuration Info
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Typography variant="subtitle2">Environment Variables:</Typography>
            <Box
              component="pre"
              sx={{
                p: 1,
                bgcolor: 'grey.100',
                borderRadius: 1,
                fontSize: '0.75rem',
                overflowX: 'auto',
              }}
            >
              {JSON.stringify(
                {
                  VITE_API_URL: import.meta.env.VITE_API_URL || '(not set)',
                  VITE_USE_FIRESTORE:
                    import.meta.env.VITE_USE_FIRESTORE || '(not set)',
                  VITE_FIREBASE_CONFIG: import.meta.env.VITE_FIREBASE_CONFIG
                    ? '(set)'
                    : '(not set)',
                },
                null,
                2
              )}
            </Box>

            <Typography variant="subtitle2" sx={{ mt: 2 }}>
              Local Storage Settings:
            </Typography>
            <Box
              component="pre"
              sx={{
                p: 1,
                bgcolor: 'grey.100',
                borderRadius: 1,
                fontSize: '0.75rem',
                overflowX: 'auto',
              }}
            >
              {JSON.stringify(
                {
                  dataSource: localStorage.getItem('dataSource'),
                  useMSW: localStorage.getItem('useMSW'),
                  useFirestore: localStorage.getItem('useFirestore'),
                  debugMode: localStorage.getItem('debugMode'),
                },
                null,
                2
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </BaseLayout>
  );
};

export default DataSourceTest;
