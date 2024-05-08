import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Login = () => {

  const userRef = useRef();
  const errRef = useRef();

  let navigate = useNavigate();

  const [ user, setUser ] = useState("");
  const [ pwd, setPwd ] = useState("");
  const [ errMsg, setErrMsg ] = useState("");
  const [ cookies, setCookies, removeCookies ] = useCookies(['user-auth']);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [pwd, user]);

  useEffect(() => {
    let auth = (cookies['user-auth']) ? true : false;
    if (auth) {
      navigate('/jobs-manager');
    }

  }, [])

  const loginCreds = {
    username: user,
    password: pwd
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    axios.post('http://localhost:8080/login/f4153f4c-77f0-4d82-afeb-ae728ecf6357', loginCreds)
      .then(response => {
        let fname = (response.data.returnData.f_name[0].toUpperCase() + response.data.returnData.f_name.slice(1))
        let lname = (response.data.returnData.l_name[0].toUpperCase() + response.data.returnData.l_name.slice(1))

        let cookiePackage = {
          user: user,
          pword: pwd,
          fname: fname,
          lname: lname
        }
        removeCookies('user-auth')
        setCookies('user-auth', JSON.stringify(cookiePackage), {path: "/", maxAge: 86400});
        navigate('/jobs-manager');
      })

    setUser('')
    setPwd('')
  };

  return (
    <>
      <section className="card login-card text-center w-25">
        <div className="card-body login-card-body">
          <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <div className="row card-title">
            <h1 col="6">Sign In</h1>
          </div>
          
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="row username-row justify-content-center">
                <label className="username-label" htmlFor="username">Username:</label>
                <input
                  type="text" 
                  id="username" 
                  ref={userRef} 
                  autoComplete="off" 
                  onChange={(e) => setUser(e.target.value)} 
                  value={user} 
                  required></input>
              </div>
              <div className="row password-row justify-content-center">
                <label className="password-label" htmlFor="password">Password:</label>
                <input 
                  type="password" 
                  id="password" 
                  onChange={(e) => setPwd(e.target.value)} 
                  value={pwd} 
                  required></input>
              </div>

              <div className="row justify-content-center">
                <button>Sign In</button>
              </div>

            </form>
        </div>
      </section>
    </>
  );

};


export default Login;