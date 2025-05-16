import { Schema, model, Types } from 'mongoose';

const stateSchema = new Schema({
  name: { type: String, required: true }, // e.g., "California"
  code: { type: String, required: false }, // e.g., "CA" (optional)
  country: { type: Types.ObjectId, ref: 'Country', required: true },
}, { timestamps: true });

export const State = model('State', stateSchema);
