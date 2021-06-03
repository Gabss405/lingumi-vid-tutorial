const BASE_URL =
  "https://lingumi-take-home-test-server.herokuapp.com/videoTutorials";

export default function fetchRequestHelper() {
  return fetch(BASE_URL)
    .then((res) => (res.status < 400 ? res : Promise.reject()))
    .then((res) => (res.status !== 204 ? res.json() : res))
    .catch((err) => {
      console.error("Fetch Error: ", err);
    });
}
