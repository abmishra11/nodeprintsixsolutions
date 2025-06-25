/**
 * Represents a Country record as it lives in MongoDB
 * and as it is returned by your REST API.
 */
export interface Country {
  /** MongoDB ObjectId rendered as string */
  _id: string;                 // e.g. "6651f2c27899b53c3a4c60d1"
  /** Human-readable name – must be unique */
  name: string;                // e.g. "India"
  /** ISO-3166 alpha-2 or alpha-3 code – must be unique */
  code: string;                // e.g. "IN"
  /** Injected by mongoose timestamps */
  createdAt: string;           // ISO date string
  updatedAt: string;
}

/**
 * What the client sends when creating a country.
 * No _id / timestamps yet.
 */
export type CreateCountryPayload = Omit<Country, "_id" | "createdAt" | "updatedAt">;

/**
 * What the client sends when *partially* updating a country.
 */
export interface UpdateCountryPayload {
  id: string;                               // path param
  updatedData: Partial<CreateCountryPayload>;
}
