import mongoose, { Schema } from "mongoose";
import { ICountryDocument } from "../types/country.types";

const countrySchema = new Schema<ICountryDocument>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    iso: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    flag: {
      type: String,
      required: true,
      trim: true,
    },
    mask: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      transform: (doc, ret) => {
        delete ret._id;
        return ret;
      },
    },
  }
);

countrySchema.index({ name: "text", iso: 1, code: 1 });

export const Country = mongoose.model<ICountryDocument>(
  "Country",
  countrySchema
);
