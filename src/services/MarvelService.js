import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
  const { loading, request, error } = useHttp();

  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=495816dc7af4f256368c87b5aba513b1';
  _baseOffset = 210;

  

  const getAllCharacters = async (offset = this._baseOffset) => {
    const res = await getResource(`${_apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
    return res.data.results.map(this._transformCharacter);
  }

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  }

  _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items.length>0 ? char.comics.items.slice(0, 10) : [{name: 'There is no comics for this character'}]
      
    }
  }
}

export default MarvelService;