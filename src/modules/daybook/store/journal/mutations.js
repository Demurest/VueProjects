// export const myMutation = ( state ) => {
//    return state
// }


export const setEntries = ( state, entries ) => {

    state.entries = [...state.entries, ...entries];
    state.isLoading = false;
}

export const updateEntry = ( state, payload ) => {
    const idx = state.entries.map((e) => e.id).indexOf( payload.id );
    state.entries[idx] = payload;
}

export const addEntry = ( state, payload ) => {

    state.entries = [payload, ...state.entries ];

}