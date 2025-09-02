import { describe, it, expect } from "vitest";
import {
  roundToTwoDecimals,
  convertCurrency,
  reverseConvertCurrency,
  formatCurrencyValue,
  parseAmount,
} from "./useCurrencyConverter";

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
    it("should convert CZK to EUR correctly", () => {
      expect(convertCurrency(1000, 24.44)).toBe(40.92);
      expect(convertCurrency(500, 24.44)).toBe(20.46);
    });

    it("should handle zero amounts", () => {
      expect(convertCurrency(0, 24.44)).toBe(0);
    });

    it("should handle zero rates", () => {
      expect(convertCurrency(1000, 0)).toBe(0);
    });

    it("should handle NaN inputs", () => {
      expect(convertCurrency(NaN, 24.44)).toBe(0);
      expect(convertCurrency(1000, NaN)).toBe(0);
    });
  });

  describe("reverseConvertCurrency", () => {
    it("should convert EUR to CZK correctly", () => {
      expect(reverseConvertCurrency(40.92, 24.44)).toBe(1000.08);
      expect(reverseConvertCurrency(20.46, 24.44)).toBe(500.04);
    });

    it("should handle zero amounts", () => {
      expect(reverseConvertCurrency(0, 24.44)).toBe(0);
    });

    it("should handle zero rates", () => {
      expect(reverseConvertCurrency(1000, 0)).toBe(0);
    });

    it("should handle NaN inputs", () => {
      expect(reverseConvertCurrency(NaN, 24.44)).toBe(0);
      expect(reverseConvertCurrency(1000, NaN)).toBe(0);
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
