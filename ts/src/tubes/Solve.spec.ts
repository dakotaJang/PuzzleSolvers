import { solve } from "./Solve"

describe('Tubes', () => {
  it('[[]]', () => {
    const [{ solved, steps }] = solve([[]]);
    expect(solved).toBe(true);
    expect(steps).toEqual([]);
  })
  it('[[1]]', () => {
    const [{ solved, steps }] = solve([[1]]);
    expect(solved).toBe(true);
    expect(steps).toEqual([]);
  })
  it('[[1], []]', () => {
    const [{ solved, steps }] = solve([[1], []]);
    expect(solved).toBe(true);
    expect(steps).toEqual([]);
  })
  it('[[1, 1], []]', () => {
    const [{ solved, steps }] = solve([[1, 1], []]);
    expect(solved).toBe(true);
    expect(steps).toEqual([]);
  })
  it('[[1, 2], [1, 2], []]', () => {
    const [{ solved, steps }] = solve([[1, 2], [1, 2], []]);
    expect(solved).toBe(true);
    expect(steps).toEqual([[0,2],[1,2],[0,1]]);
  })
  it(`[
    [1,2,3],
    [1,2,3],
    [1,2,3],
    [],
    [],
  ]`, () => {
    const [{ solved, steps }] = solve([
      [1,2,3],
      [1,2,3],
      [1,2,3],
      [],
      [],
    ]);
    expect(solved).toBe(true);
    expect(steps).toBeDefined();
  })
  it(`[
    [1,2,1,2],
    [1,2,1,2],
    [],
    [],
  ]`, () => {
    const [{ solved, steps }] = solve([
      [1,2,1,2],
      [1,2,1,2],
      [],
      [],
    ]);
    expect(solved).toBe(true);
    expect(steps).toBeDefined();
  })
  it(`[
    [1,2,1,2],
    [],
  ]`, () => {
    const [{ solved, steps }] = solve([
      [1,2,1,2],
      [],
    ]);
    expect(solved).toBe(false);
    expect(steps).toBeUndefined();
  })
})
