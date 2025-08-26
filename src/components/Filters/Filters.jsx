import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCategoryFilter,
  changeIngredientFilter,
} from "../../redux/filters/slice";
import {
  fetchCategories,
  fetchIngredients,
} from "../../redux/filters/operations";
import {
  selectCategories,
  selectIngredients,
  selectCategory,
  selectIngredient,
} from "../../redux/filters/selectors";
import { selectRecipes } from "../../redux/recipes/recipesSelectors.js";
import IconButton from "../IconButton/IconButton";
import { useIsMobileOrTablet } from "./useIsMobileOrTablet";
import ToastInfo from "../ToastInfo/ToastInfo.jsx";

import css from "./Filters.module.css";

export default function Filter() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobileOrTablet = useIsMobileOrTablet();

  const location = useLocation();
  const page = location.pathname.includes("favorites")
    ? "favorites"
    : location.pathname.includes("own")
    ? "own"
    : "main";

  const recipes = useSelector((state) => selectRecipes(state, page));
  const recipesCount = recipes?.length || 0;
  const categories = useSelector(selectCategories);
  const ingredients = useSelector(selectIngredients);
  const category = useSelector(selectCategory);
  const ingredient = useSelector(selectIngredient);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (!isModalOpen) return;
    const handleEsc = (event) => {
      if (event.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isModalOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) setIsModalOpen(false);
  };

  const handleResetClick = () => {
    dispatch(changeCategoryFilter(""));
    dispatch(changeIngredientFilter(""));
  };

  const handleCategoryChange = (e) => {
    dispatch(changeCategoryFilter(e.target.value));
  };

  const handleIngredientChange = (e) => {
    dispatch(changeIngredientFilter(e.target.value));
  };

  const renderFiltersForm = (isModal = false) => (
    <form className={isModal ? css.filtersModalForm : css.filtersForm}>
      <label>
        Category
        <select
          value={category}
          onChange={handleCategoryChange}
          className={
            isModal ? css.filtersModalCategory : css.filtersInputCategory
          }
        >
          <option value="" disabled>
            {isModal ? "e.g. Soup" : "Category"}
          </option>
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Ingredient
        <select
          value={ingredient}
          onChange={handleIngredientChange}
          className={
            isModal
              ? css.filtersModalInputIngredient
              : css.filtersInputIngredient
          }
        >
          <option value="" disabled>
            {isModal ? "e.g. Broccoli" : "Ingredient"}
          </option>
          <option value="">All</option>
          {ingredients.map((ing) => (
            <option key={ing._id} value={ing._id}>
              {ing.name}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        onClick={handleResetClick}
        className={isModal ? css.filtersModalResetBtn : css.filtersResetBtn}
      >
        Reset filters
      </button>
    </form>
  );

  return (
    <>
      <div className={css.filtersContainer}>
        <div className={css.filtersRow}>
          <span className={css.filtersCount}>
            {recipesCount} {recipesCount === 1 ? "recipe" : "recipes"}
          </span>

          {!isMobileOrTablet && renderFiltersForm()}

          {isMobileOrTablet && (
            <>
              <IconButton
                className={css.filtersModalOpenBtn}
                aria-label="Open filters"
                onClick={() => setIsModalOpen(true)}
              >
                <span className={css.filtersModalOpenBtnTxt}>Filters</span>
                <svg
                  className={css.filtersModalOpenBtnSvg}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <use xlinkHref="/icons.svg#icon-filter-24px" />
                </svg>
              </IconButton>

              {isModalOpen && (
                <div
                  className={css.filtersModalOverlay}
                  onClick={handleOverlayClick}
                  role="dialog"
                  aria-modal="true"
                >
                  <div className={css.filtersModal}>
                    <div className={css.filtersModalHeader}>
                      <span>Filters</span>
                      <button
                        type="button"
                        onClick={() => {
                          handleResetClick();
                          setIsModalOpen(false);
                        }}
                        className={css.filtersModalResetBtn}
                      >
                        Reset filters
                      </button>
                    </div>
                    {renderFiltersForm(true)}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <ToastInfo />
    </>
  );
}
