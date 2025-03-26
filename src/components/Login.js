// Login.jsx
export function Login() {
    return (
      <div className="split-container active">
        <div className="left-panel" style={{ backgroundImage: "url('background.jpg')" }}>
          <div className="left-panel-content">
            <h1>Welcome back to My Deloitte</h1>
            <p>Unlock your next level of success with streamlined access to Deloitte resources.</p>
          </div>
        </div>
        <div className="right-panel">
          <div className="form-container">
            <h2>Log in to your account</h2>
            <p>To join via SSO please click on the key button below</p>
            <form>
              <label>Email <span>*</span></label>
              <input type="email" placeholder="Enter your email" />
              <label>Password <span>*</span></label>
              <input type="password" placeholder="Enter your password" />
              <div className="options">
                <label><input type="checkbox" /> <span className="keep-me-logged-in">Keep me logged in</span></label>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>
              <button type="button" className="btn-primary">Log in</button>
            </form>
          </div>
        </div>
      </div>
    );
  }