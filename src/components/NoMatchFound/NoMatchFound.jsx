import css from "./NoMatchFound.module.css"
import { useDispatch } from 'react-redux';
import {resetFilters} from '../../redux/filters/slice.js'

export default function NoMatchFound() {
    const dispatch = useDispatch();
    const handleResetClick = () => {
        dispatch(resetFilters());
    }
    return (
        <div className={css.container}>
            <p className={css.title}>We're sorry! We were not able <span className={css.noBreak}>to find a match.</span></p>
            <button className={css.btn} type="button" onClick={handleResetClick}>Reset search and filters</button>
        </div>
    )
}