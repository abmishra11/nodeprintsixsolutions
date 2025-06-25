/**
 * Represents a State record as it lives in MongoDB
 * and as it is returned by your REST API.
 */
export interface State {
  /** MongoDB ObjectId rendered as string */
  _id: string;                 // e.g. "6651f2c27899b53c3a4c60d1"
  /** Human-readable name – must be unique */
  name: string;                // e.g. "Utter Pradesh"
  /** ISO-3166 alpha-2 or alpha-3 code – Optional */
  code: string;                // e.g. "UP"
  /** MongoDB ObjectId rendered as string */
  countryId: string;                // e.g. "6651f2c27899b53c3a4c60d1"
  /** Injected by mongoose timestamps */
  createdAt: string;           // ISO date string
  updatedAt: string;
}

/**
 * What the client sends when creating a state.
 * No _id / timestamps yet.
 */
export type CreateStatePayload = Omit<State, "_id" | "createdAt" | "updatedAt">;

/**
 * What the client sends when *partially* updating a state.
 */
export interface UpdateStatePayload {
  id: string;                               
  updatedData: Partial<CreateStatePayload>;
}
