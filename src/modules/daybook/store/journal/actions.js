
import journalApi from "@/api/journalApi"

// export const myAction = async ({ commit }) => {

// }


export const loadEntries = async ({ commit }) => {
    const { data } = await journalApi.get('/entries.json')
    const entries = []
    for( let id of Object.keys(data)){
        entries.push({
            id,
            ...data[id]
        })
    }

    commit('setEntries', entries);
}

export const updateEntry = async ({ commit }, entry) => {
    try {
        const { date, picture, text} = entry
        const dataToSave= { date, picture, text }
        const url = `/entries/${entry.id}.json`
    
        const resp = await journalApi.put(url, dataToSave)
        console.log(resp);
        /**spread para romper la referncia al objeto */
        commit('updateEntry', {...entry});
    } catch (error) {
        console.error("Error updating entry: ", error);
    }

}

export const createEntry = async ({ commit }, entry) => {
    try {
        const { date, picture, text} = entry
        const dataToSave = { date, picture, text}
        const url = `entries.json`
        
        const response = await journalApi.post(url, dataToSave)
        
        dataToSave.id = response.name
        commit('addEntry', dataToSave)

        return response.name
    } catch (error){
        console.error("Error creating entry: ", error)
    }
}