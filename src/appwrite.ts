import { Client, Databases, ID, Query } from "appwrite";
import type { Movie } from "./api";

const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// define an Appwrite client instance and for given project
const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);

// define a Databases instance to interact with
const db = new Databases(client);

// HELPERS /////////////////////////////////////////////////////////////////////////////////////////

const listDocuments = (queries: string[]) =>
  db.listDocuments(DATABASE_ID, COLLECTION_ID, queries);

const updateDocument = (documentId: string, data: Record<string, any>) =>
  db.updateDocument(DATABASE_ID, COLLECTION_ID, documentId, data);

const createDocument = (data: Record<string, any>) =>
  db.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), data);

// PUBLIC FUNCTIONS ////////////////////////////////////////////////////////////////////////////////

export const updateSearchCount = async (searchTerm: string, movie: Movie) => {
  // 1 use appwrite client to check if the search term exists
  try {
    const result = await listDocuments([Query.equal("searchTerm", searchTerm)]);

    // 2 if it exists, update the search count
    if (result.documents.length > 0) {
      const [doc] = result.documents;

      await updateDocument(doc.$id, {
        count: doc.count + 1,
      });
    }

    // 3 if it doesn't exist, create a new document with the search term and count 1
    else {
      await createDocument({
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error(error);
  }
};
