import { Elysia, t } from "elysia";
import { CountryService } from "../services/countryService";
import { countryDocs } from "../swagger/schemas/country.schemas";
import { ApiResponse } from "../utils/response.utils";

const countryService = new CountryService();

export const countryController = new Elysia({ prefix: "/countries" })
  .get(
    "/",
    async ({ query, set }) => {
      try {
        const { search } = query;
        const countries = search
          ? await countryService.searchCountries(search)
          : await countryService.getAllCountries();

        return ApiResponse.success(
          { countries, total: countries.length },
          "Ülkeler başarıyla getirildi."
        );
      } catch (error: any) {
        set.status = 500;
        return ApiResponse.error(error.message);
      }
    },
    {
      query: t.Object({
        search: t.Optional(t.String()),
      }),
      detail: countryDocs.getAll,
    }
  )
  .get(
    "/iso/:iso",
    async ({ params, set }) => {
      try {
        const country = await countryService.getCountryByIso(params.iso);
        if (!country) {
          set.status = 404;
          return ApiResponse.error("Ülke bulunamadı.");
        }
        return ApiResponse.success(country, "Ülke başarıyla getirildi.");
      } catch (error: any) {
        set.status = 500;
        return ApiResponse.error(error.message);
      }
    },
    {
      params: t.Object({
        iso: t.String({ minLength: 2, maxLength: 2 }),
      }),
      detail: countryDocs.getByIso,
    }
  )
  .get(
    "/code/:code",
    async ({ params, set }) => {
      try {
        const country = await countryService.getCountryByCode(params.code);
        if (!country) {
          set.status = 404;
          return ApiResponse.error("Ülke bulunamadı.");
        }
        return ApiResponse.success(country, "Ülke başarıyla getirildi.");
      } catch (error: any) {
        set.status = 500;
        return ApiResponse.error(error.message);
      }
    },
    {
      params: t.Object({
        code: t.String(),
      }),
      detail: countryDocs.getByCode,
    }
  );
