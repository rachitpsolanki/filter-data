import filterData from '../../src/filterData';

import data from './data.json';
import SearchType from '../../src/lib/SearchType';

describe('includeNull', () => {
  test('includeNull=true', () => {
    const searchConditions = [
      {
        name: 'name',
        value: 'not exist',
        type: SearchType.EQ,
      },
    ];

    const result = filterData(data, searchConditions, { includeNull: true });

    expect(result).toEqual([
      {
        noName: 'no name error',
      },
    ]);
  });

  test('includeNull=false', () => {
    const searchConditions = [
      {
        name: 'name',
        value: 'not exist',
        type: SearchType.EQ,
      },
    ];

    const result = filterData(data, searchConditions, { includeNull: false });

    expect(result).toEqual([]);
  });
});

describe('like search', () => {
  test('caseSensitive=false', () => {
    const searchConditions = [
      {
        name: 'name',
        value: 'dav',
        type: SearchType.LK,
      },
    ];

    const result = filterData(data, searchConditions);

    expect(result).toEqual([
      {
        name: 'David Johnson',
        age: 32,
      },
    ]);
  });

  test('caseSensitive=true(not exist)', () => {
    const searchConditions = [
      {
        name: 'name',
        value: 'dav',
        type: SearchType.LK,
      },
    ];

    const result = filterData(data, searchConditions, { caseSensitive: true });

    expect(result).toEqual([]);
  });

  test('caseSensitive=true(exist)', () => {
    const searchConditions = [
      {
        name: 'name',
        value: 'Dav',
        type: SearchType.LK,
      },
    ];

    const result = filterData(data, searchConditions, { caseSensitive: true });

    expect(result).toEqual([
      {
        name: 'David Johnson',
        age: 32,
      },
    ]);
  });
});

describe('area search', () => {
  test('greater than + less than', () => {
    const searchConditions = [
      {
        name: 'age',
        value: 25,
        type: SearchType.GT,
      },
      {
        name: 'age',
        value: 34,
        type: SearchType.LTE,
      },
    ];

    const result = filterData(data, searchConditions);

    expect(result).toEqual([
      {
        name: 'David Johnson',
        age: 32,
      },
    ]);
  });
});
