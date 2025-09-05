import { describe, it, expect } from "vitest";
import {
  roundToTwoDecimals,
  convertCurrency,
  reverseConvertCurrency,
  formatCurrencyValue,
  parseAmount,
} from "../useCurrencyConverter";

describe("Currency conversion utilities", () => {
  describe("roundToTwoDecimals", () => {
    it("should round to two decimal places", () => {
      expect(roundToTwoDecimals(3.14159)).toBe(3.14);
      expect(roundToTwoDecimals(2.999)).toBe(3.0);
      expect(roundToTwoDecimals(10.555)).toBe(10.56);
    });

    it("should handle zero and negative numbers", () => {
      expect(roundToTwoDecimals(0)).toBe(0);
      expect(roundToTwoDecimals(-3.14159)).toBe(-3.14);
    });
  });

  describe("convertCurrency", () => {
    it("should convert CZK to EUR correctly with amount property", () => {
      expect(
        convertCurrency({ amount: 1000, rate: 1, currencyAmount: 1 })
      ).toBe(1000);
      expect(convertCurrency({ amount: 500, rate: 1, currencyAmount: 1 })).toBe(
        500
      );
    });

    it("should convert CZK to currencies with different amounts correctly", () => {
      expect(
        convertCurrency({ amount: 1000, rate: 6.2, currencyAmount: 100 })
      ).toBe(16129.03);
      expect(
        convertCurrency({ amount: 500, rate: 6.2, currencyAmount: 100 })
      ).toBe(8064.52);
    });

    it("should handle zero amounts", () => {
      expect(
        convertCurrency({ amount: 0, rate: 24.44, currencyAmount: 1 })
      ).toBe(0);
    });

    it("should handle zero rates", () => {
      expect(
        convertCurrency({ amount: 1000, rate: 0, currencyAmount: 1 })
      ).toBe(0);
    });

    it("should handle zero currency amounts", () => {
      expect(
        convertCurrency({ amount: 1000, rate: 24.44, currencyAmount: 0 })
      ).toBe(0);
    });

    it("should handle NaN inputs", () => {
      expect(
        convertCurrency({ amount: NaN, rate: 24.44, currencyAmount: 1 })
      ).toBe(0);
      expect(
        convertCurrency({ amount: 1000, rate: NaN, currencyAmount: 1 })
      ).toBe(0);
      expect(
        convertCurrency({ amount: 1000, rate: 24.44, currencyAmount: NaN })
      ).toBe(0);
    });
  });

  describe("reverseConvertCurrency", () => {
    it("should convert EUR to CZK correctly with amount property", () => {
      expect(
        reverseConvertCurrency({ amount: 1000, rate: 1, currencyAmount: 1 })
      ).toBe(1000);
      expect(
        reverseConvertCurrency({ amount: 500, rate: 1, currencyAmount: 1 })
      ).toBe(500);
    });

    it("should convert currencies with different amounts correctly", () => {
      expect(
        reverseConvertCurrency({
          amount: 16129.03,
          rate: 6.2,
          currencyAmount: 100,
        })
      ).toBe(1000);
      expect(
        reverseConvertCurrency({
          amount: 8064.52,
          rate: 6.2,
          currencyAmount: 100,
        })
      ).toBe(500);
    });

    it("should handle zero amounts", () => {
      expect(
        reverseConvertCurrency({ amount: 0, rate: 24.44, currencyAmount: 1 })
      ).toBe(0);
    });

    it("should handle zero rates", () => {
      expect(
        reverseConvertCurrency({ amount: 1000, rate: 0, currencyAmount: 1 })
      ).toBe(0);
    });

    it("should handle zero currency amounts", () => {
      expect(
        reverseConvertCurrency({ amount: 1000, rate: 24.44, currencyAmount: 0 })
      ).toBe(0);
    });

    it("should handle NaN inputs", () => {
      expect(
        reverseConvertCurrency({ amount: NaN, rate: 24.44, currencyAmount: 1 })
      ).toBe(0);
      expect(
        reverseConvertCurrency({ amount: 1000, rate: NaN, currencyAmount: 1 })
      ).toBe(0);
      expect(
        reverseConvertCurrency({
          amount: 1000,
          rate: 24.44,
          currencyAmount: NaN,
        })
      ).toBe(0);
    });
  });

  describe("formatCurrencyValue", () => {
    it("should convert valid numbers to strings", () => {
      expect(formatCurrencyValue(40.92)).toBe("40.92");
      expect(formatCurrencyValue(0)).toBe("0");
      expect(formatCurrencyValue(-10.5)).toBe("-10.5");
    });

    it("should return empty string for NaN", () => {
      expect(formatCurrencyValue(NaN)).toBe("");
    });
  });

  describe("parseAmount", () => {
    it("should parse valid number strings", () => {
      expect(parseAmount("1000")).toBe(1000);
      expect(parseAmount("40.92")).toBe(40.92);
      expect(parseAmount("0")).toBe(0);
    });

    it("should return 0 for invalid inputs", () => {
      expect(parseAmount("")).toBe(0);
      expect(parseAmount("abc")).toBe(0);
    });

    it("should handle negative numbers", () => {
      expect(parseAmount("-100")).toBe(-100);
    });
  });
});
