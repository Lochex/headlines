// Random User API logic
import { receiveArticles } from '../actions/NewsServerActions';

export default function getNewsApi() {
  fetch('https://newsapi.org/v1/articles?source=techcrunch&apiKey=213327409d384371851777e7c7f78dfe')
      .then(response => response.json())
      .then(
        res => receiveArticles(res),
      )
      .catch((err) => {
        console.log('Fetch Error :-S', err);
      });
}
