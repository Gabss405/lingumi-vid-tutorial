/*
Inputs: collection of tags, typed by the user
Outputs: the top 20 rated video tutorials, which contain any of the tags provided
*/

export function getTopRatedTutorialsForTags(inputTags, tutorials) {
  let results = [];

  tutorials.forEach((item) => {
    if (inputTags.some((tag) => item.tags.includes(tag))) {
      return results.push(item);
    }
  });
  return results
    .sort((a, b) => (a.averageUserRating < b.averageUserRating ? 1 : -1))
    .slice(0, 20);
}

/*
Inputs: words typed by the user
Outputs: a collection of tutorials, which match the user search term
*/

export function searchForTutorials(input, tutorials) {
  let searchResults = [];
  tutorials.forEach((item) => {
    if (item.videoTitle.includes(input) || item.teacherName.includes(input))
      searchResults.push(item);
  });

  return searchResults;
}
