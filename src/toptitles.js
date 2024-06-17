/**
 * Implements the top titles selection algorithm, see <code>README.md</code> for details. See
 * <code>test/test.js</code> to verify your implementation.
 *
 * Use the standard `JSON.parse` function to parse the given JSON data, but consider additional 
 * validation of the parsed results.
 * 
 * @param {String} contentData the JSON data of an array of `Content` structures, i.e. `"[{...}, {...}, ...]"`
 * @param {String} brandPreferencesData the JSON data of a dictionary, where the keys and values represent the user's _brand preferences_
 * @param {String} contentTypePreferencesData the JSON data of a dictionary, where the keys and values represent the user's _content type preferences_
 * @returns {[String]} the top titles 
 */
export function getTopTitles(contentData, brandPreferencesData, contentTypePreferencesData) {
    let content, brandPreferences, contentTypePreferences;

    try {
        content = JSON.parse(contentData);
        brandPreferences = JSON.parse(brandPreferencesData);
        contentTypePreferences = JSON.parse(contentTypePreferencesData);
    } catch (error) {
        console.error("Invalid JSON input", error);
        return [];
    }
   
    const recommendationArray = [];
    const scoredContentArray = [];
    const cutoffDate = new Date("2020-01-01T00:00:00.000Z");
    const preferenceValues = {
        dislike: -20,
        indifferent: 0,
        like: 10,
        adore: 30,
        love: 50
    };

    if (content.length > 0) {
        for (let movie of content){
            if (movie.availability.includes("US") && new Date(movie.availableDate) <= cutoffDate){
                let recommendationScore = 0;
                let brandAdjustment = preferenceValues[brandPreferences[movie.brand] || "indifferent"];
                let contentTypeAdjustment = preferenceValues[contentTypePreferences[movie.contentType] || "indifferent"];

                recommendationScore = movie.popularityScore + brandAdjustment + contentTypeAdjustment;
                scoredContentArray.push({title: movie.title, recommendationScore});
            }  
        }

        scoredContentArray.sort((a, b) => b.recommendationScore - a.recommendationScore || a.title.localeCompare(b.title));

        for (let i = 0; i < Math.min(5, scoredContentArray.length); i++) {
            recommendationArray.push(scoredContentArray[i].title);
        }
    }else {
        return [];
    }
    
    return recommendationArray;
}