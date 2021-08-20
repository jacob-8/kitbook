import type { IFirestoreMetaData } from './firestore-metadata.interface';

export type IUser = User & Omit<IFirestoreMetaData, 'id'>;

interface User {
  uid?: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  roles?: IRoles;
  managing?: string[]; // | firebase.firestore.FieldValue; // dictionary Ids
  contributing?: string[]; // dictionary Ids
  // starred?: string[]; // in future save dictionary Ids to user that they star, to allow them quick access back to those dictionaries
  termsAgreement?: number;
  lastVisit?: firebase.default.firestore.Timestamp & firebase.default.firestore.FieldValue;
  unsubscribe?: firebase.default.firestore.Timestamp & firebase.default.firestore.FieldValue;
}

export interface IRoles {
  // editor?: boolean; // can edit and delete any content
  admin?: number; // 1 controls content; 2 controls user roles also (both can turn off admin role to view as normal user until page refresh)
}
