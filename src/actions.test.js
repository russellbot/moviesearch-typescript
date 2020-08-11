import * as actions from './actions';
import { 
    CHANGE_SEARCH_FIELD,
    REQUEST_MOVIES_PENDING,
    REQUEST_MOVIES_SUCCESS,
    REQUEST_MOVIES_FAILED 
} from './constants.js';
import { shallow } from 'enzyme';
import nock from 'nock';

import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const mockStore = configureMockStore([thunkMiddleware])

it('should create an action to search robots', () => {
    const text = 'of the Jedi';
    const expectedAction = {
        type: CHANGE_SEARCH_FIELD,
        payload: text
    }
    expect(actions.setSearchField(text)).toEqual(expectedAction)
})

describe('Fetch movies pending action', () => {
    it('should create a Pending action on request movies', () => {
        const store = mockStore();
        store.dispatch(actions.requestMovies())
        const action = store.getActions();
        expect(action[0]).toEqual({type: "REQUEST_MOVIES_PENDING"})    
})
})

describe('Fetch movies successful action', () => {
    it('should create a SUCCESS action on successful fetch request', () =>{
        const store = mockStore();
        store.dispatch(actions.requestMovies())
        const action = store.getActions();
        // setting up mock fetch
        const scope = nock('https://www.omdbapi.com').get('/?s=star+wars&apikey=469942e0').reply(200, {
            Search: [{
                Title: "Star Wars: Episode IV - A New Hope",
                Year: "1977",
                imdbID: "tt0076759",
                Type: "movie",
                Poster: "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
            }]
        })
        
        //check that the mock fetch request matches
        expect(scope.interceptors[0].body).toEqual("{\"Search\":[{\"Title\":\"Star Wars: Episode IV - A New Hope\",\"Year\":\"1977\",\"imdbID\":\"tt0076759\",\"Type\":\"movie\",\"Poster\":\"https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg\"}]}")
    })    
})
