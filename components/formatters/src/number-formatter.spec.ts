import { adjustNumber } from './number-formatter';

describe('FormatterUtil', () => {
  interface TestCase {
    input: number;
    output: string;
  }

  describe('Adjusting number without abbreviation', () => {
    [
      {
        input: 0.123456789,
        output: '0.123',
      },
      {
        input: 1.23456789,
        output: '1.23',
      },
      {
        input: 12.3456789,
        output: '12.3',
      },
      {
        input: 123.456789,
        output: '123',
      },
      {
        input: 0.987654321,
        output: '0.988',
      },
      {
        input: 9.87654321,
        output: '9.88',
      },
      {
        input: 98.7654321,
        output: '98.8',
      },
      {
        input: 987.654321,
        output: '988',
      },
      {
        input: 0.0001,
        output: '< 0.001',
      },
      {
        input: -123.45,
        output: '-123',
      },
      {
        input: -10,
        output: '-10',
      },
      {
        input: -0.987654321,
        output: '-0.988',
      },
      {
        input: -0.0001,
        output: '-0.001',
      },
    ].forEach((testCase: TestCase) => {
      it(`should return ${testCase.input} with adjusted precision`, () => {
        expect(adjustNumber(testCase.input).toString()).toEqual(
          testCase.output,
        );
      });
    });
  });

  describe('Adjusting number with abbreviation', () => {
    [
      {
        input: 1234567890,
        output: '1.23bil',
      },
      {
        input: 123456789,
        output: '123mil',
      },
      {
        input: 12345678,
        output: '12.3mil',
      },
      {
        input: 1234567,
        output: '1.23mil',
      },
      {
        input: 123456,
        output: '123k',
      },
      {
        input: 12345,
        output: '12.3k',
      },
      {
        input: 1234,
        output: '1.23k',
      },
      {
        input: 123,
        output: '123',
      },
      {
        input: 0.1,
        output: '0.1',
      },
      {
        input: 0.0001,
        output: '< 0.001',
      },
      {
        input: -1234567890,
        output: '-1.23bil',
      },
      {
        input: -123456789,
        output: '-123mil',
      },
      {
        input: -12345678,
        output: '-12.3mil',
      },
      {
        input: -1234567,
        output: '-1.23mil',
      },
      {
        input: -123456,
        output: '-123k',
      },
      {
        input: -12345,
        output: '-12.3k',
      },
      {
        input: -1234,
        output: '-1.23k',
      },
      {
        input: -123,
        output: '-123',
      },
      {
        input: -12,
        output: '-12',
      },
      {
        input: -1,
        output: '-1',
      },
      {
        input: -0.0001,
        output: '-0.001',
      },
    ].forEach((testCase: TestCase) => {
      it(`should return ${testCase.input} in abbreviated version`, () => {
        expect(adjustNumber(testCase.input, true).toString()).toEqual(
          testCase.output,
        );
      });
    });
  });
});
