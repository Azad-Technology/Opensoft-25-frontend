// Signup.jsx
export function Signup() {
    return (
      <div className="split-container active">
        <div className="left-panel" style={{ backgroundImage: "url('public/Background.jpg')" }}>
          <div className="left-panel-content">
            <h1>Join My Deloitte</h1>
            <p>Link your email or social media profile, and step into a global network of insights and opportunities.</p>
          </div>
        </div>
        <div className="right-panel">
          <div className="form-container">
            <h2>Join My Deloitte</h2>
            <form>
              <label>Preferred site & language</label>
              <select>
                <option>United States (English)</option>
                <option>United Kingdom (English)</option>
                <option>España (Español)</option>
                <option>India (English)</option>
              </select>
              <label><input type="checkbox" /> <span>I reside in this location</span></label>
              <label>Email <span>*</span></label>
              <input type="email" placeholder="Enter your email" required />
              <label>First name <span>*</span></label>
              <input type="text" placeholder="Enter first name" required />
              <label>Last name <span>*</span></label>
              <input type="text" placeholder="Enter last name" required />
              <label>Password <span>*</span></label>
              <input type="password" placeholder="Create your password" required />
              <label>Re-enter password <span>*</span></label>
              <input type="password" placeholder="Re-enter your password" required />
              <label><input type="checkbox" /> <span>I have read and agree to the <a href="#">Privacy Notice</a> and <a href="#">Terms of Use</a></span></label>
              <button type="submit" className="btn-primary">Join</button>
            </form>
          </div>
        </div>
      </div>
    );
  }