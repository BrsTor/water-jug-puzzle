import { SteinAlgorithm } from './stein.algorithm';

describe('SteinAlgorithm', () => {
  describe('findGCD', () => {
    it('should return the gcd of two positive numbers', () => {
      expect(SteinAlgorithm.findGCD(48, 18)).toBe(6);
    });

    it('should return the gcd of two equal numbers', () => {
      expect(SteinAlgorithm.findGCD(7, 7)).toBe(7);
    });

    it('should return the non-zero number if one number is zero', () => {
      expect(SteinAlgorithm.findGCD(0, 5)).toBe(5);
      expect(SteinAlgorithm.findGCD(10, 0)).toBe(10);
    });

    it('should return 0 if both numbers are zero', () => {
      expect(SteinAlgorithm.findGCD(0, 0)).toBe(0);
    });

    it('should handle one number being a multiple of the other', () => {
      expect(SteinAlgorithm.findGCD(12, 36)).toBe(12);
    });

    it('should handle prime numbers', () => {
      expect(SteinAlgorithm.findGCD(13, 17)).toBe(1);
    });

    it('should handle large numbers', () => {
      expect(SteinAlgorithm.findGCD(123456, 789012)).toBe(12);
    });
  });
});