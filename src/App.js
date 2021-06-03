import { useEffect, useState } from "react";
import "./App.css";
import fetchRequestHelper from "./ApiServices";
import Stars from "react-stars-display";
import { searchForTutorials, getTopRatedTutorialsForTags } from "./helpers";

function App() {
  const [allTutorials, setAllTutorials] = useState([]);
  const [currentTutorials, setCurrentTutorials] = useState([]);
  const [uniqueTags, setUniqueTags] = useState([]);
  const [currentlySelectedTags, setCurrentlySelectedTags] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetchRequestHelper()
      .then((fetchedTutorials) => {
        setAllTutorials(fetchedTutorials);
        console.log(fetchedTutorials);
        return fetchedTutorials;
      })
      .then((fetchedTutorials) => {
        fetchedTutorials.map((tutorial) => {
          return tutorial.tags.forEach((tag) => {
            setUniqueTags((prevUniqueTags) => {
              if (!prevUniqueTags.includes(tag))
                return [...prevUniqueTags, tag];
              else return prevUniqueTags;
            });
          });
        });
      });
  }, [refresh]);

  useEffect(() => {
    setCurrentTutorials(
      getTopRatedTutorialsForTags(currentlySelectedTags, allTutorials)
    );
  }, [currentlySelectedTags]);

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    setCurrentTutorials(searchForTutorials(e.target.value, allTutorials));
  };

  const handleRefresh = () => {
    setRefresh((prevState) => !prevState);
    setCurrentTutorials(allTutorials);
    setKeyword("");
    setCurrentlySelectedTags([]);
  };

  const handleTagClick = (clickedTag) => {
    if (currentlySelectedTags.includes(clickedTag)) {
      setCurrentlySelectedTags(
        currentlySelectedTags.filter((tag) => tag !== clickedTag)
      );
    } else {
      setCurrentlySelectedTags([...currentlySelectedTags, clickedTag]);
    }
  };

  const listTutorials = (list) => {
    return list
      .filter((_, idx) => idx < 50)
      .map((tutorial) => {
        return (
          <div className="tutorial-card">
            <div className="tutorial-card-tags-container">
              {tutorial.tags.map((tag, idx) => {
                return <span key={idx}>#{tag}</span>;
              })}
            </div>
            <div className="tutorial-title-teacher-container">
              <div className="tutorial-card-title">{tutorial.videoTitle}</div>
              <div className="tutorial-card-teacher">
                by teacher {tutorial.teacherName}
              </div>
            </div>

            <div className="tutorial-card-rating">
              <Stars
                stars={(tutorial.averageUserRating * 5).toFixed(1)}
                size={10} //optional
                spacing={2} //optional
                fill="#ea9c46" //optional
              />{" "}
              <span>{(tutorial.averageUserRating * 5).toFixed(1)}</span>
            </div>
          </div>
        );
      });
  };

  return (
    <div className="App">
      <header className="header">Vid-Tutorial</header>
      <div className="tag-pool">
        {currentlySelectedTags &&
          uniqueTags.map((tag, idx) => {
            return (
              <div
                key={idx}
                className={
                  currentlySelectedTags.includes(tag)
                    ? "tag-card selected"
                    : "tag-card"
                }
                onClick={() => handleTagClick(tag)}
              >
                #{tag}
              </div>
            );
          })}
      </div>
      <div className="search-refresh-container">
        <input
          placeholder="Search here 🔍"
          className="search-input"
          onChange={handleSearchChange}
          value={keyword}
        ></input>

        <div className="refresh-btn" onClick={handleRefresh}>
          Refresh 🔄
        </div>
      </div>
      <div className="results-label">
        {keyword.length ? (
          currentTutorials.length > 0 ? (
            <div>
              {" "}
              Found {currentTutorials.length} results containing "{keyword}":{" "}
            </div>
          ) : (
            <div> No results found </div>
          )
        ) : (
          <></>
        )}
      </div>
      <ul className="tutorial-list">
        {currentTutorials.length
          ? listTutorials(currentTutorials)
          : listTutorials(allTutorials)}
      </ul>
    </div>
  );
}

export default App;
