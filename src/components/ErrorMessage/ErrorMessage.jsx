import css from './errorMessage.module.css';
export default function errorMessage() {
    return (
        <div className={css.box}>
            ErrorMessage: something not works!
        </div>
    );
 }