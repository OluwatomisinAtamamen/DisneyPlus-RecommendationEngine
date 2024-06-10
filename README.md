# Instructions
This project includes a basic Node.js project with a `src/toptitles.js` that contains the code for you to complete; the codebase comes with some example input and expected output, you can run the unit test in `test/toptitles.js` to verify your implementation.

We have no explicit performance or memory footprint requirements for the implementation; however, at the very least, it should work according to the following specification. We encourage you to consider as many strange scenarios as possible: unusual input, malicious input, etc.

The basic setup is to uncompress all source files and then verify that the project can be built using `npm`. Since the implementation is missing, running tests should result in a test failure.

```
project-dir> $ npm install && npm test

> disneystreaming-i21@1.0.0 test
> jest

 FAIL  test/test.js
  ✕ All example inputs (7 ms)
  ...

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        1.165 s
Ran all test suites.
```

You may refactor the code in any way you wish, add as many tests as you wish; the only strong requirement is that the function `getTopTitles in "src/toptitles.js"` remains and its return type and parameters remain intact. You should also not add any additional dependencies or settings to `package.json`.

```
export function getTopTitles(contentData, brandPreferencesData, contentTypePreferencesData) 
```

You can use your preferred IDE, but we will use the Maven automated build to assess your code; therefore, before submitting your solution--even if your solution fails some tests--you should check that your code _compiles_ using `npm test`. We will not be able to consider code that fails to compile.

# Requirements
We want Disney+ users to be able to find content that they are excited to watch and is most relevant to them. That means displaying some titles that we recommend based on their interests and watching habits.

For this challenge, we will provide you a list of content data. Each piece of content has information about its availability (countries and date available) and specific details such as title, brand, type of content, and a popularity score. For example:

```json
{
    "title": "Toy Story 3",
    "brand": "Pixar",
    "availability": ["CA", "FR", "US"],
    "availableDate": "2019-11-12T05:00:00.000Z",
    "popularityScore": 98,
    "contentType": "movie"
}
```

Note that the `availableDate` field is in JSON Date Format--ISO8601 `YYYY-MM-DDThh:mm:ss.sZ`.

Two sets of user preferences will be provided based on the `brand` and `contentType` attributes of a piece of content. The preferences keys will be possible values for the attribute (e.g. "Pixar" for `brand`) and the values are `String`s corresponding to the user preference adjustments.

## Preference Adjustments:
- dislike (-20)
- indifferent (+0)
- like (+10)
- adore (+30)
- love (+50)

For example, using the _Toy Story 3_ as an example, and the following brand and content type prefereces

`brand`
```json
{
  "Star Wars": "love",
  "Disney": "like",
  "Marvel": "dislike",
  "Pixar": "dislike"
}
```

`contentType`
```json
{
  "movie": "love",
  "series": "like",
  "short": "dislike"
}
```

we would calculate _Toy Story 3_'s final score as `128` = `98` (_base score_) `- 20` (_dislike_ the _Pixar_ brand) `+ 50` (_love_ the content type _movie_). If a key is missing from the dictionary, assume the value is "indifferent". For example, the `contentType` preferences could just be `{ "movie": "like" }` or even `{}`.

## Your Task
Implement the method `getTopTitles` which will:

- Calculate the overall score for each piece of content using the `popularityScore` as a base and adding or subtracting points based on the user's preferences. 
- The content must be available in the US and available on or before 01/01/2020 to receive a score. In the example above, "Toy Story 3" would receive an overall score of 128.
- Return an array of `String`s of the content titles that have the top 5 scores (sorted from highest to lowest score), are available in the US, and are available on or before 01/01/2020.
- If there is a tie, sort content alphabetically by content title.
- If there are fewer than 5 titles, return all titles sorted by score.
- If a preference value is missing, assume the user is "indifferent" and add 0.

You are also encouraged to consider unusual input parameters and error handling.

_Note: all content data was created for the purpose of this challenge. Popularity scores, availability countries and availability dates do not reflect real Disney data._
