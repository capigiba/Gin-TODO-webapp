import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    const navigate = useNavigate();

    function HandleClick() {
        navigate("/");
    }

    return (
        <div className="container text-center justify-content-center align-items-center">
            <div className="row">
                <div className="col-md-6 offset md-3">
                    <h1 className="mt-3">Oops!</h1>
                    <p> Sorry, an unexpected error has occurred.</p>
                    <p>
                        <em>{error.statusText || error.message}</em>
                    </p>
                    <button type="button" class="btn btn-outline-info" onClick={HandleClick}>
                        Back to Home!
                    </button>
                </div>
            </div>
        </div>
    )
}