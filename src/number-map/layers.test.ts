import { tripletOf, positiveOfTriplet } from "./layers";
import { strategy as square } from "./square";
import { strategy as triangle } from "./triangle";

test("round trip mapPositiveToNonnegativePair -> mapNonegativePairToPositive", () => {
  for (const { pairOf, positiveOf } of [square, triangle]) {
    let notNegative = 0;

    while (++notNegative < 100) {
      const pair = pairOf(notNegative);
      const notNegativePrime = positiveOf(pair);

      expect(notNegativePrime).toBe(notNegative);
    }
  }
});

test("mapPositiveToNonnegativeTriplet", () => {
  for (const { pairOf } of [square, triangle]) {
    const threeLayerMapper = tripletOf(pairOf, 3);

    expect(threeLayerMapper( 1)).toEqual([...pairOf(1), 0]);
    expect(threeLayerMapper( 2)).toEqual([...pairOf(1), 1]);
    expect(threeLayerMapper( 3)).toEqual([...pairOf(1), 2]);
 
    expect(threeLayerMapper( 4)).toEqual([...pairOf(2), 0]);
    expect(threeLayerMapper( 5)).toEqual([...pairOf(2), 1]);
    expect(threeLayerMapper( 6)).toEqual([...pairOf(2), 2]);
 
    expect(threeLayerMapper( 7)).toEqual([...pairOf(3), 0]);
    expect(threeLayerMapper( 8)).toEqual([...pairOf(3), 1]);
    expect(threeLayerMapper( 9)).toEqual([...pairOf(3), 2]);

    expect(threeLayerMapper(10)).toEqual([...pairOf(4), 0]);
    expect(threeLayerMapper(11)).toEqual([...pairOf(4), 1]);
    expect(threeLayerMapper(12)).toEqual([...pairOf(4), 2]);

    const oneLayerMapper = tripletOf(pairOf, 1);

    expect(oneLayerMapper(1)).toEqual([...pairOf(1), 0]);
    expect(oneLayerMapper(2)).toEqual([...pairOf(2), 0]);
    expect(oneLayerMapper(3)).toEqual([...pairOf(3), 0]);
    expect(oneLayerMapper(4)).toEqual([...pairOf(4), 0]);
  }
});

test("mapNonnegativeTripletToPositive", () => {
  for (const { pairOf, positiveOf } of [square, triangle]) {
    const threeLayerUnmapper = positiveOfTriplet(positiveOf, 3);
    // normal case
    expect(threeLayerUnmapper([...pairOf(1), 0])).toEqual(1);
    expect(threeLayerUnmapper([...pairOf(1), 1])).toEqual(2);
    expect(threeLayerUnmapper([...pairOf(1), 2])).toEqual(3);

    expect(threeLayerUnmapper([...pairOf(2), 0])).toEqual(4);
    expect(threeLayerUnmapper([...pairOf(2), 1])).toEqual(5);
    expect(threeLayerUnmapper([...pairOf(2), 2])).toEqual(6);

    expect(threeLayerUnmapper([...pairOf(3), 0])).toEqual(7);
    expect(threeLayerUnmapper([...pairOf(3), 1])).toEqual(8);
    expect(threeLayerUnmapper([...pairOf(3), 2])).toEqual(9);

    expect(threeLayerUnmapper([...pairOf(4), 0])).toEqual(10);
    expect(threeLayerUnmapper([...pairOf(4), 1])).toEqual(11);
    expect(threeLayerUnmapper([...pairOf(4), 2])).toEqual(12);

    const oneLayerUnmapper = positiveOfTriplet(positiveOf, 1);

    expect(oneLayerUnmapper([...pairOf(1), 0])).toEqual(1);
    expect(oneLayerUnmapper([...pairOf(2), 0])).toEqual(2);
    expect(oneLayerUnmapper([...pairOf(3), 0])).toEqual(3);
    expect(oneLayerUnmapper([...pairOf(4), 0])).toEqual(4);
  }
});
