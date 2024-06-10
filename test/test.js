import { readFileSync } from "fs";
import { getTopTitles } from "../src/toptitles"

function resourceTest(testCase) {
    const [contentData, brandPreferencesData, contentTypePreferencesData, expectedData] =
        readFileSync(`test/resources/input${testCase}.txt`).toString().split("\n");
    const expected = JSON.parse(expectedData);
    const result = getTopTitles(contentData, brandPreferencesData, contentTypePreferencesData);
    expect(result).toStrictEqual(expected);
}

test('Test input0.txt', () => {
    resourceTest(0);
});

test('Test input1.txt', () => {
    resourceTest(1);
});

test('Test input4.txt', () => {
    resourceTest(4);
});

test('Test input5.txt', () => {
    resourceTest(5);
});

test('Test input6.txt', () => {
    resourceTest(6);
});

test('Test input7.txt', () => {
    resourceTest(7);
});

test('Test input8.txt', () => {
    resourceTest(8);
});

test('Test input10.txt', () => {
    resourceTest(10);
});
