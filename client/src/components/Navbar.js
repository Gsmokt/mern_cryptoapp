import React, { useState, useContext, useEffect } from "react";
import styles from "../styles/Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase-config";
import { signInWithPopup, signOut } from "firebase/auth";
import { AppContext } from "../store/Store";
import { FaUserCircle } from "react-icons/fa";
import { Drawer } from "@mui/material";
import { apiLogin, apiWatchlistCoins } from "./axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { coins, isLogged, setIsLogged, watchlist, setWatchlist } =
    useContext(AppContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const login = async (user) => {
    try {
      await apiLogin({
        user: user.uid,
      });
      localStorage.setItem("user", JSON.stringify(user));
      setIsLogged(user);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        login(res.user);
      })
      .catch((error) => toast.error(error.message));
  };

  const userSignOutAndClose = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        setIsLogged(null);
        setIsDrawerOpen(false);
      })
      .catch((error) => toast.error(error.message));
  };

  const getCoin = async () => {
    try {
      const { data } = await apiWatchlistCoins(isLogged?.uid);
      setWatchlist(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (isLogged) {
      getCoin();
    }
    // eslint-disable-next-line
  }, [isLogged]);

  return (
    <div>
      <div className={styles.navbar}>
        <h1>Crypto tracker</h1>
        <div className={styles.login}>
          <button onClick={() => navigate("/")}>
            <h1>Home</h1>
          </button>
          {!isLogged ? (
            <button onClick={signIn}>
              <h1>Login</h1>
            </button>
          ) : (
            <FaUserCircle
              onClick={() => setIsDrawerOpen(true)}
              className={styles.icon}
              size={50}
            />
          )}
          <Drawer
            PaperProps={{
              sx: { backgroundColor: "#26272b", color: "#DCDCDC" },
            }}
            anchor="right"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <div className={styles.drawer}>
              <div className={styles.list1}>
                <FaUserCircle size={70} />
                <p>Watchlist</p>
              </div>
              <div className={styles.list2}>
                {coins?.map((e) => {
                  if (watchlist?.includes(e.id)) {
                    return (
                      <div
                        className={styles.navSection}
                        key={e.id}
                        onClick={() => {
                          navigate(`/coin/${e.id}`);
                          setIsDrawerOpen(false);
                        }}
                      >
                        <img
                          className={styles.navIcons}
                          src={e.image}
                          alt="Not found"
                        />
                        <div className={styles.navCoins}>{e.name}</div>
                      </div>
                    );
                  } else return "";
                })}
              </div>

              <div className={styles.list3}>
                <button onClick={userSignOutAndClose}>Logout</button>
                <button onClick={() => setIsDrawerOpen(false)}>Close</button>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
