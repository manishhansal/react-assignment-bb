import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BACKEND_URL } from './../constant/constant';
import { fetchWrapper } from '_helpers';

// create slice for get all cards
const name = 'cards';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// create slice for create a card
const createCardName = 'createCard';
const initialCreateCardState = createCardInitialState();
const extraCreateCardAction = createCardExtraAction();
const extraCreateCardReducers = createCardExtraReducer();
const createCardSlice = createSlice({ name: createCardName, initialState: initialCreateCardState, extraReducers: extraCreateCardReducers });

// exports
export const userActions = { ...slice.actions, ...extraActions };
export const usersReducer = slice.reducer;

//create card exports
export const createCardAction = { ...createCardSlice.actions, ...extraCreateCardAction };
export const createCardReducer = createCardSlice.reducer;

// get all cards implementation
function createInitialState() {
    return {
        cards: {}
    }
}

function createExtraActions() {
    const baseUrl = `${BACKEND_URL}/cards?limit=100`;

    return {
        getAll: getAll()
    };    

    function getAll() {
        return createAsyncThunk(
            `${name}/getAllCards`,
            async () => await fetchWrapper.get(baseUrl)
        );
    }
}

function createExtraReducers() {
    return {
        ...getAll()
    };

    function getAll() {
        var { pending, fulfilled, rejected } = extraActions.getAll;
        return {
            [pending]: (state) => {
                state.cards = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.cards = action.payload;
            },
            [rejected]: (state, action) => {
                state.cards = { error: action.error };
            }
        };
    }
}


//create card implementation
function createCardInitialState() {
    return {
        createCardResponse: {}
    }
}

function createCardExtraAction() {
    const baseUrl = `${BACKEND_URL}/cards`;

    return {
        createCard:createCard()
    };    
  
    function createCard() {
        return createAsyncThunk(
            `${name}/createCard`,
            async ({ number, expiry, name }) => await fetchWrapper.post(baseUrl,
                { name, "cardExpiration":expiry,"cardHolder":name,"cardNumber":number,"category": "VISA"})
        );
    }

}

function createCardExtraReducer() {
    return {
        ...createCard()
    };

    function createCard() {
        var { pending, fulfilled, rejected } = extraCreateCardAction.createCard;
        return {
            [pending]: (state) => {
                state.createCardResponse = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.createCardResponse = action.payload;
            },
            [rejected]: (state, action) => {
                state.createCardResponse = { error: action.error };
            }
        };
    }
}

