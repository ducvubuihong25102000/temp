export const translateObject = (entity, lang) => {
  let state = { ...entity };
  let langRemove = lang === "vi" ? "_en" : "_vi";
  Object.keys(entity).forEach((key) => {
    if (key.search(langRemove) > 0) {
      delete state[key];
    } else if (key.search(lang) > 0) {
      let newKey = key.replace(`_${lang}`, "");
      delete Object.assign(state, { [newKey]: state[key] })[key];
    }
  });
  return state;
};
export const translateArray = (list, lang) => {
  let state = [...list];
  if (state && state.length > 0) {
    return state.map((item) => translateObject(item, lang));
  }
};
