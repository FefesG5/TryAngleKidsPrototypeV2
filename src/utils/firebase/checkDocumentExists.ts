import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

export const checkDocumentExists = async (
  collectionPath: string[],
  docId: string,
): Promise<boolean> => {
  const docRef = doc(
    collection(db, ...(collectionPath as [string, ...string[]])),
    docId,
  );
  const docSnapshot = await getDoc(docRef);
  return docSnapshot.exists();
};
