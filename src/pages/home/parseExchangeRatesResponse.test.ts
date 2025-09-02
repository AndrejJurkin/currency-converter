import { describe, it, expect } from "vitest";
import { parseExchangeRatesResponse } from "./useExchangeRates";

describe("parseExchangeRatesResponse", () => {
  it("should parse the sample response correctly", () => {
    const sampleResponse = `01 Sep 2025 #169
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|13.669
Brazil|real|1|BRL|3.845
Bulgaria|lev|1|BGN|12.496`;

    const result = parseExchangeRatesResponse(sampleResponse);

    expect(result).toEqual([
      {
        country: "Australia",
        currency: "dollar",
        amount: 1,
        code: "AUD",
        rate: 13.669,
      },
      {
        country: "Brazil",
        currency: "real",
        amount: 1,
        code: "BRL",
        rate: 3.845,
      },
      {
        country: "Bulgaria",
        currency: "lev",
        amount: 1,
        code: "BGN",
        rate: 12.496,
      },
    ]);
  });
});
