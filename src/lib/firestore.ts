import { getEnvVariable } from '../config';
import { debugError, debugLog } from '../utils/debugControl';

/**
 * Generic paginated response interface
 */
export interface PaginatedResponse<T> {
  items: T[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

const getFirebase = async () => {
  try {
    const { initializeApp } = await import('firebase/app');
    const {
      getFirestore,
      collection,
      getDocs,
      doc,
      getDoc,
      query,
      orderBy,
      limit,
      startAfter,
    } = await import('firebase/firestore');

    // Parse Firebase config from env variable or use empty object as fallback
    const firebaseConfig = (() => {
      try {
        const configStr = getEnvVariable('VITE_FIREBASE_CONFIG', '{}');
        return JSON.parse(configStr);
      } catch (e) {
        debugError('Failed to parse Firebase config:', e);
        return {};
      }
    })();

    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp);

    return {
      db,
      collection,
      getDocs,
      doc,
      getDoc,
      query,
      orderBy,
      limit,
      startAfter,
    };
  } catch (error) {
    debugError('Failed to load Firebase:', error);
    throw new Error('Firebase is not available');
  }
};

/**
 * Get paginated documents from a Firestore collection
 * Collection path should include the tenant, e.g. 'blogs/acme/posts'
 *
 * @param colPath Collection path including tenant
 * @param page Page number (1-indexed)
 * @param perPage Number of items per page
 * @returns Paginated response with items and metadata
 */
export async function getPaginated<T extends { id: string }>(
  colPath: string,
  page: number,
  perPage: number
): Promise<PaginatedResponse<T>> {
  // For debugging
  debugLog(`Fetching documents from collection: ${colPath}`);

  // Ensure the collection path has an odd number of segments (for a valid collection reference)
  let finalPath = colPath;
  const segments = colPath.split('/').filter(Boolean);

  if (segments.length % 2 === 0) {
    // If even number (like "blogs/demo"), append "documents" to make it a valid collection
    finalPath = `${colPath}/documents`;
    debugLog(`Adjusted collection path to: ${finalPath}`);
  }

  const firebase = await getFirebase();
  const { db, collection, getDocs, query, orderBy, limit, startAfter } =
    firebase;

  try {
    // First, get total count - not efficient, but Firestore doesn't provide count API
    const colRef = collection(db, finalPath);
    const snapshot = await getDocs(query(colRef));
    const totalItems = snapshot.size;
    const totalPages = Math.ceil(totalItems / perPage);

    debugLog(`Found ${totalItems} documents in collection ${finalPath}`);

    // Adjust page if it's out of bounds
    page = Math.max(1, Math.min(page, totalPages || 1));

    // Now get the actual page data with pagination
    let queryRef = query(colRef, orderBy('createdAt', 'desc'), limit(perPage));

    // If not the first page, need to use startAfter with cursor
    if (page > 1) {
      // Get the last document from the previous page
      const previousPageQuery = query(
        colRef,
        orderBy('createdAt', 'desc'),
        limit((page - 1) * perPage)
      );
      const previousPageDocs = await getDocs(previousPageQuery);
      const lastVisible =
        previousPageDocs.docs[previousPageDocs.docs.length - 1];

      if (lastVisible) {
        queryRef = query(
          colRef,
          orderBy('createdAt', 'desc'),
          startAfter(lastVisible),
          limit(perPage)
        );
      }
    }

    const pageSnapshot = await getDocs(queryRef);
    const items = pageSnapshot.docs.map((docSnapshot) => {
      return { id: docSnapshot.id, ...docSnapshot.data() } as unknown as T;
    });

    return {
      items,
      totalPages,
      currentPage: page,
      totalItems,
    };
  } catch (error) {
    debugError(`Error fetching documents from ${finalPath}:`, error);
    throw error;
  }
}

/**
 * Get a document by ID from a Firestore collection
 * Document path should include the tenant, e.g. 'blogs/acme/posts/post-1'
 *
 * @param path Document path including tenant and ID
 * @returns Document data with ID
 * @throws Error if document not found
 */
export async function getById<T extends { id: string }>(
  path: string
): Promise<T> {
  // For debugging
  debugLog(`Fetching document: ${path}`);

  // Ensure path has an even number of segments (for a valid document reference)
  let finalPath = path;
  const segments = path.split('/').filter(Boolean);

  if (segments.length % 2 !== 0) {
    debugError(
      `Invalid document path: ${path}. Document paths must have even number of segments.`
    );
    throw new Error(`Invalid document path: ${path}`);
  }

  const firebase = await getFirebase();
  const { db, doc, getDoc } = firebase;

  try {
    const docRef = doc(db, finalPath);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      throw new Error(`Document not found: ${finalPath}`);
    }

    return { id: snapshot.id, ...snapshot.data() } as unknown as T;
  } catch (error) {
    debugError(`Error fetching document ${finalPath}:`, error);
    throw error;
  }
}
