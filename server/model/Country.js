
import { Schema, model, Types } from 'mongoose';

const countrySchema = new Schema({
  name: { type: String, required: true, unique: true }, // e.g., "United States"
  code: { type: String, required: true, unique: true }, // e.g., "US"
}, { timestamps: true });

export const Country = model('Country', countrySchema);
