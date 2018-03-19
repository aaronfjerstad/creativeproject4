import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stateSearchResults: [], //Corresponds to data names search.

    stateDocTitle: undefined, //Corresponds to data name.

    stateDoc: undefined //Corresponds to the data content.
  },
  getters: {
    searchResults: (state) => {
      if(state.stateSearchResults === undefined) return [];
      return state.stateSearchResults;
    },
    docTitle: (state) => {
      if(state.stateDocTitle === undefined) return "";
      return state.stateDocTitle;
    },
    doc: (state) => {
      // console.log("State changed. Recalculating doc");
      if(state.stateDoc === undefined) return {text:""}
      return state.stateDoc;
    }
  },
  mutations: {
    setSearchResults: (state, payload) => {
      state.stateSearchResults = payload;
    },
    setDocTitle: (state, payload) => {
      state.stateDocTitle = payload;
    },
    setDoc: (state, payload) => {
      // console.log("Setting document");
      // console.log(payload);
      state.stateDoc = payload;
    }
  },
  actions: {
    createDoc: ({commit,dispatch}, title) => {
      axios.post('/api/data/' + window.btoa(title), {text:""})
        .then(resp => {
          console.log("Created");
          dispatch('getDoc', title);
        }).catch(err => {
          commit('setDocTitle', "");
          commit('setDoc', {});
        });
    },
    search: ({commit}, query) => {
      axios.get('/api/names/' + window.btoa(query))
        .then(resp => {
          commit('setSearchResults', resp.data);
        }).catch(err => {
          commit('setSearchResults', []);
        });
    },
    getDoc: ({commit}, title) => {
      axios.get('/api/data/' + window.btoa(title))
        .then(resp => {
          // console.log("Got document");
          // console.log(JSON.stringify(resp.data));
          commit('setDocTitle', title);
          commit('setDoc', resp.data);
        }).catch(err => {
          // console.log("Failed to get document");
          commit('setDocTitle', "");
          commit('setDoc', {});
        });
    },
    modifyDoc: ({commit}, {title, doctext}) => {
      let body = {text:doctext};
      // console.log(body);
      axios.put('/api/data/' + window.btoa(title), body)
        .then(resp => {
          if(JSON.stringify(body) != JSON.stringify(resp.data)) {
            commit('setDocTitle', title);
            commit('setDoc', resp.data);
          }
        }).catch(err => {
          commit('setDocTitle', "");
          commit('setDoc', {});
        });
    },
    deleteDoc: ({commit}, title) => {
      axios.delete('/api/data/' + window.btoa(title))
        .then(resp => {
          commit('setDocTitle', "");
          commit('setDoc', {});
        }).catch(err => {

        });
    }
  }
});
