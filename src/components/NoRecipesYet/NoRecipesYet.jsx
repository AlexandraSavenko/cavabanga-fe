import css from "./NoRecipesYet.module.css"

export default function NoRecipesYet({recipesType, children}) {
    return (
            <div className={css.container}>
            <p className={css.title}>{`There is no your ${recipesType} recipes yet.`}</p>
            {children}
            </div>
        )
}