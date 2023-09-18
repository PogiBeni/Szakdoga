export default function ErrorMsg({errorMSG}) {
    return (
        <>
            {errorMSG ?
                <div className="alert alert-danger form-control p-2" role="alert">
                    {errorMSG}
                </div>
                : ""}
        </>
    )
}