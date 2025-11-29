// src/api.js
// stubbed API layer — currently using localStorage so other code can import api if needed
const api = {
  get: async (path) => {
    // placeholder: no remote calls; return empty
    return { data: [] };
  },
  post: async (path, body) => {
    return { data: body };
  },
  delete: async (path) => {
    return { data: null };
  },
};

export default api;
