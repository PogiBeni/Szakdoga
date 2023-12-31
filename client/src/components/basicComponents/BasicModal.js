export default function BasicModal({children,name,title,size,centered})
{
    const modalSize = `modal-dialog modal-dialog-centered ${size || ''}`;
    const label = {name}+"Label"
    var isCenter="m-3"
    if(centered === true){isCenter = "modal-body d-flex align-items-center flex-column"}
    return(
        <div className="modal" id={name} tabIndex="-1" aria-labelledby={label} aria-hidden="true">
            <div className={modalSize}>
                <div className="modal-content">
                    <div className="modal-header  bg-dark text-white" data-bs-theme="dark">
                        <h1 className="modal-title fs-5 " id={name}>{title}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className={isCenter}>

                        {children}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}