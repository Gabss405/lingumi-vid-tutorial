import { mockVideos } from "./mocks";
import { getTopRatedTutorialsForTags, searchForTutorials } from "./helpers";

describe("getTopRatedTutorialsForTags", () => {
  it("returns results with contatining input tag", () => {
    const mockTag = ["Medium"];
    const mockTopRatedTags = getTopRatedTutorialsForTags(mockTag, mockVideos);
    expect(
      mockTopRatedTags.every((video) => {
        return video.tags.includes(mockTag[0]);
      })
    ).toBe(true);
  });
  it("should order results by rating", () => {
    const mockTag = ["Exciting"];
    const mockTopRatedTags = getTopRatedTutorialsForTags(mockTag, mockVideos);
    expect(mockTopRatedTags[0].averageUserRating).toBeGreaterThan(
      mockTopRatedTags[1].averageUserRating
    );
    expect(mockTopRatedTags[3].averageUserRating).toBeGreaterThan(
      mockTopRatedTags[5].averageUserRating
    );
    expect(mockTopRatedTags[10].averageUserRating).toBeLessThan(
      mockTopRatedTags[9].averageUserRating
    );
  });
  it("should return maximum 20 returns", () => {
    const mockTag = ["Easy"];
    const mockTopRatedTags = getTopRatedTutorialsForTags(mockTag, mockVideos);
    expect(mockTopRatedTags.length).toBeLessThan(21);
  });
});

describe("searchForTutorials ", () => {
  it("returns results with title or teacher contatining search keyword", () => {
    const mockKeyword = ["Animals"];
    const mockTeacher = ["Katy"];
    const mockResults1 = searchForTutorials(mockKeyword, mockVideos);

    expect(
      mockResults1.every((video) => {
        return video.videoTitle.includes("Animals");
      })
    ).toBe(true);

    const mockResults2 = searchForTutorials(mockTeacher, mockVideos);
    expect(
      mockResults2.every((video) => {
        return video.teacherName.includes(mockTeacher[0]);
      })
    ).toBe(true);
  });
  it(" returns empty array if there's no match for keyword or teacher", () => {
    const mockKeyword = ["8s9fusdfsdjf"];
    const mockTeacher = ["aandsnd"];
    const mockResults1 = searchForTutorials(mockKeyword, mockVideos);
    expect(mockResults1).toHaveLength(0);
    const mockResults2 = searchForTutorials(mockTeacher, mockVideos);
    expect(mockResults2).toHaveLength(0);
  });
});
