import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BACKEND_URL } from './../constant/constant';
import { fetchWrapper } from '_helpers';

// create slice

const name = 'cards';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const userActions = { ...slice.actions, ...extraActions };
export const usersReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        cards: {}
    }
}

function createExtraActions() {
    const baseUrl = `${BACKEND_URL}/cards`;

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
