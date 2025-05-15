import css from './ErrorMessage.module.css';
export default function errorMessage() {
    return (
        <div className={css.box}>
            ErrorMessage: something not works!
        </div>
    );
 }