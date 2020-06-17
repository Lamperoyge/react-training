import { UPDATE_COLLECTIONS } from "./shop.types";

export const updateCollections = (payload) => {
  return {
    type: UPDATE_COLLECTIONS,
    payload: payload,
  };
};
