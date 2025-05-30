import { config } from 'dotenv';
import { initializeApp } from 'firebase/app';
import { doc, getFirestore, setDoc, Timestamp } from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

import { mockBlogPosts } from '../src/mocks/mockBlogPosts';
import { mockProjects } from '../src/mocks/mockProjects';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: '.env.local' });

let firebaseConfig;
try {
  const configStr = process.env.VITE_FIREBASE_CONFIG;
  if (!configStr) {
    throw new Error('VITE_FIREBASE_CONFIG environment variable is not set');
  }
  firebaseConfig = JSON.parse(configStr);
} catch (error) {
  console.error('Failed to parse Firebase config:', error);
  console.log(
    'Please make sure VITE_FIREBASE_CONFIG is properly set in your .env.local file'
  );
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function addTimestamps<T>(
  obj: T
): T & { createdAt: Timestamp; updatedAt: Timestamp } {
  return {
    ...obj,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
}

async function importData() {
  try {
    console.log('\x1b[36m%s\x1b[0m', '🔥 Starting Firestore data import...');

    console.log('\x1b[33m%s\x1b[0m', '📝 Importing blog posts...');
    const blogPromises = mockBlogPosts.map(async (post) => {
      const postWithTimestamps = addTimestamps(post);
      await setDoc(doc(db, 'blogs', post.id), postWithTimestamps);
      return post.id;
    });

    const blogIds = await Promise.all(blogPromises);
    console.log(`✅ Imported ${blogIds.length} blog posts`);

    console.log('\x1b[33m%s\x1b[0m', '🚀 Importing projects...');
    const projectPromises = mockProjects.map(async (project) => {
      const projectWithTimestamps = addTimestamps(project);
      await setDoc(doc(db, 'projects', project.id), projectWithTimestamps);
      return project.id;
    });

    const projectIds = await Promise.all(projectPromises);
    console.log(`✅ Imported ${projectIds.length} projects`);

    console.log('\x1b[32m%s\x1b[0m', '✨ Data import completed successfully!');

    const report = {
      timestamp: new Date().toISOString(),
      blogPosts: blogIds,
      projects: projectIds,
      totalItemsImported: blogIds.length + projectIds.length,
    };

    const reportDir = path.join(__dirname, 'reports');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir);
    }

    const reportPath = path.join(reportDir, `import-report-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📊 Import report saved to ${reportPath}`);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Error importing data:', error);
    process.exit(1);
  }
}

importData();
