import * as Api from "../Api";

export const CATEGORIES_OPENED = "CATEGORIES_OPENED";

export function categoriesOpened(categories) {
  return {
    type: "CATEGORIES_OPENED",
    categories
  };
}

export function getData() {
  return dispatch => {
    Api.getCategories()
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => {
        return res.json();
      })
      .then(categories =>
        dispatch(
          categoriesOpened(Api.toArray(categories.categories, "name"))
        )
      )
      .catch(error => console.error(error));
  };
}
