import { db } from "../FirebaseConfig";

const getAllDocumentNames = async (collectionName) => {
  try {
    const snapshot = await db.collection(collectionName).get();
    const documentNames = snapshot.docs.map((doc) => doc.id);
    return documentNames;
  } catch (error) {
    console.error('Error fetching document names: ', error);
    return [];
  }
};

export default getAllDocumentNames;
