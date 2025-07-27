import { Country } from "../models/country.model";
import { ICountry } from "../types/country.types";

export class CountryService {
  async getAllCountries(): Promise<ICountry[]> {
    const countries = await Country.find().sort({ name: 1 }).lean();
    return countries.map(this.mapCountryToResponse);
  }

  async getCountryByIso(iso: string): Promise<ICountry | null> {
    const country = await Country.findOne({
      iso: iso.toUpperCase(),
    }).lean();
    return country ? this.mapCountryToResponse(country) : null;
  }

  async getCountryByCode(code: string): Promise<ICountry | null> {
    const country = await Country.findOne({ code }).lean();
    return country ? this.mapCountryToResponse(country) : null;
  }

  async searchCountries(query: string): Promise<ICountry[]> {
    const searchRegex = new RegExp(query, "i");
    const countries = await Country.find({
      $or: [{ name: searchRegex }, { code: searchRegex }, { iso: searchRegex }],
    })
      .sort({ name: 1 })
      .lean();
    return countries.map(this.mapCountryToResponse);
  }

  async seedCountries(countriesData: any[]): Promise<void> {
    const existingCount = await Country.countDocuments();
    if (existingCount === 0) {
      await Country.insertMany(countriesData);
    }
  }

  private mapCountryToResponse(country: any): ICountry {
    return {
      id: country.id,
      name: country.name,
      code: country.code,
      iso: country.iso,
      flag: country.flag,
      mask: country.mask,
    };
  }
}
