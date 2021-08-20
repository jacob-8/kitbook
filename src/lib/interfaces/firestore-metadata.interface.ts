export interface IFirestoreMetaData {
  id?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: firebase.default.firestore.Timestamp & firebase.default.firestore.FieldValue;
  updatedAt?: firebase.default.firestore.Timestamp & firebase.default.firestore.FieldValue;
}

export interface IFirestoreMetaDataAbbreviated {
  id?: string;
  cb?: string;
  ub?: string;
  ca?: firebase.default.firestore.Timestamp & firebase.default.firestore.FieldValue;
  ua?: firebase.default.firestore.Timestamp & firebase.default.firestore.FieldValue;
}
