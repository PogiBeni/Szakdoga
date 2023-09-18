export default function InputWithLabel({children,label,addClassName})
{
    const divClassName = `form-floating ${addClassName || ''}`;
    return(
        <div className={divClassName}>
            {children}
                                   
            <label>{label}</label>
        </div>
    )
}