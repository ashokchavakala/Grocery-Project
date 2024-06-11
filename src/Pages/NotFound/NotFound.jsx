import React from 'react'

function NotFound() {
  return (
    <div>
       <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <img
            src="https://placehold.co/100x100"
            alt="404"
            className="img-fluid mb-4"
          />
          <h1 className="display-4 mb-3">Page Not Found</h1>
          <p className="lead">
            Oops! The page you are looking for might have been removed or is
            temporarily unavailable.
          </p>
          <a href="/" className="btn btn-primary btn-lg">
            Go Home
          </a>
        </div>
      </div>
    </div>
    </div>
  )
}

export default NotFound
