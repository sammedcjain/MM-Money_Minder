import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import $ from "jquery";
import Navbar from "../components/Navbar";
import LoadingPage from "../components/Loading";
import NotAuth from "../components/NotAuth";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState("");
  const [AuthUser, setAuthUser] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [CardsLoading, setCardsLoading] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    amount: 0,
    category: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;

    // Update the formData based on the input name
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const f_loadScript = async () => {
    const loadScript = (src, callback) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;

      script.onload = callback;

      document.body.appendChild(script);
    };

    loadScript("/js/jquery.min.js", () => {
      loadScript("/js/popper.js", () => {
        loadScript("/js/bootstrap.min.js", () => {
          loadScript("/dashboard/dashboard.js", () => {
            // All scripts are loaded
            setScriptsLoaded(true);
          });
        });
      });
    });
  };
  const handleFetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `http://localhost:5000/:user/dashboard/`,
          {
            headers,
          }
        );
        console.log(response.data);
        setExpenses(response.data.expenses);
        setItems(response.data.items);
        setUser(response.data.user);

        setAuthUser(true);
      } else {
        console.error("Token not found");
        setAuthUser(false);
        // Handle the case where the token is not available or not valid
      }
    } catch (error) {
      setAuthUser(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    handleFetchData();
    setLoading(false);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setCardsLoading(true);

    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.post(
          `http://localhost:5000/${user}/dashboard/add`,
          {
            date: formData.date,
            title: formData.title,
            amount: formData.amount,
            category: formData.category,
          },
          {
            headers,
          }
        );
        setCardsLoading(false);
        console.log(res);

        if (res.data && res.data.error) {
          toast.error(res.data.error, {
            duration: 3000,
            position: "bottom-right",
          });
        } else if (res.data) {
          handleFetchData();
          toast.success(res.data.message, {
            duration: 3000,
            position: "bottom-right",
          });
        }
      } else {
        console.log("Token not available!!");
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
      toast.error("An unexpected error occured", {
        duration: 3000,
        position: "bottom-right",
      });
    }
  }

  async function handleDeleteSubmit(e, expenseID) {
    e.preventDefault();
    setCardsLoading(true);

    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.post(
          `http://localhost:5000/${user}/dashboard/delete`,
          {
            expenseId: expenseID,
          },
          {
            headers,
          }
        );
        setCardsLoading(false);
        console.log(res);

        if (res.data && res.data.error) {
          toast.error(res.data.error, {
            duration: 3000,
            position: "bottom-right",
          });
        } else if (res.data) {
          handleFetchData();

          toast.success(res.data.message, {
            duration: 3000,
            position: "bottom-right",
          });
        }
      } else {
        console.log("Token not available!!");
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
      toast.error("An unexpected error occured", {
        duration: 3000,
        position: "bottom-right",
      });
    }
  }

  const incrementDate = () => {
    const dateInput = document.getElementById("date-input");
    const currentDate = new Date(dateInput.value);
    const nextDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    dateInput.value = nextDate.toISOString().split("T")[0];
  };

  const decrementDate = () => {
    const dateInput = document.getElementById("date-input");
    const currentDate = new Date(dateInput.value);
    const prevDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
    dateInput.value = prevDate.toISOString().split("T")[0];
  };
  if (Loading === true) {
    return <LoadingPage />;
  } else if (AuthUser === false) {
    return <NotAuth />;
  } else if (AuthUser === true && Loading === false) {
    f_loadScript();
    return (
      <>
        <Toaster />
        <link rel="icon" type="image/png" href="/landing_page/rupee.png" />
        <title>PennyWise-Dashboard</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        />
        <link rel="stylesheet" href="/dashboard/dashboard.css" />

        <Navbar user={user} />

        <div className="head container">
          <h1 className="responsive-h1">Hello {user}</h1>
          <h3>Welcome to your Dashboard</h3>
        </div>

        <div className="second">
          {/* Dashboard user input form */}
          <h2 className="cent">Add or Delete your expenses here</h2>
          <div>
            <form onSubmit={handleSubmit} className="inp-form" id="inp-form">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                onChange={handleChange}
                value={formData.date}
                required
              />
              <label htmlFor="item">Item:</label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                value={formData.title}
                placeholder="Add item"
                required
              />
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                placeholder="Amount in Rs"
                rows="1"
                onChange={handleChange}
                required
              />
              <label htmlFor="category">Category:</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="" disabled defaultValue>
                  Select an option
                </option>
                <option value="Food">Food</option>
                <option value="Housing">Housing</option>
                <option value="Health">Health</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Savings">Savings</option>
                <option value="Travel">Travel</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select>
              <button type="submit" className="inp-but">
                +
              </button>
            </form>
          </div>

          {/* dashboard card notes */}
          <div className="scrolling-wrapper">
            {expenses.reverse().map((expenseItem) => (
              <section
                key={expenseItem._id}
                className="my-5"
                style={{ maxWidth: "13rem" }}
              >
                <form
                  onSubmit={(e) => handleDeleteSubmit(e, expenseItem._id)}
                  className="del-form"
                  data-id={expenseItem._id}
                >
                  <input
                    type="hidden"
                    name="expenseId"
                    value={expenseItem._id}
                  />
                  <div className="card">
                    <div className="card-body">
                      <blockquote className="blockquote blockquote-custom bg-white px-3 pt-4">
                        <div className="blockquote-custom-icon shadow-1-strong">
                          {new Date(expenseItem.date).toLocaleDateString(
                            "en-GB"
                          )}
                        </div>
                        <p className="card_p">{expenseItem.description}</p>
                        <div className="pt-2 mt-2 border-top">
                          <p className="card_p">Rs {expenseItem.Amount}</p>
                        </div>
                      </blockquote>
                    </div>
                    <button type="submit" className="del-but">
                      -
                    </button>
                  </div>
                </form>
              </section>
            ))}
          </div>
        </div>

        <div
          className="container-fluid third"
          style={{
            backgroundColor: "#401c64",
            paddingTop: "50px",
            paddingBottom: "75px",
          }}
        >
          <h2 className="cent">Your expense history</h2>
          <div className="container">
            <form className="hist-form">
              <div className="form-group hide_or_not">
                <label htmlFor="date-input">Date:</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text desktop-only"
                      onClick={decrementDate}
                    >
                      &#x25C0;
                    </span>
                  </div>
                  <input
                    type="date"
                    className="form-control"
                    id="date-input"
                    name="date_input"
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text desktop-only"
                      onClick={incrementDate}
                    >
                      &#x25B6;
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="sort-select">Sort By:</label>
                <select
                  className="form-control"
                  id="sort-select"
                  name="sort_select"
                  required
                >
                  <option value="" disabled defaultValue>
                    Select an option
                  </option>
                  <option value="any">Any</option>
                  <option value="amount_asc">Amount Ascending</option>
                  <option value="amount_dec">Amount Descending</option>
                  <option value="category">Category</option>
                  <option value="date_asc">Date Ascending</option>
                  <option value="date_dec">Date Descending</option>
                </select>
              </div>
              <div style={{ textAlign: "center" }} className="form-group">
                <button
                  style={{ marginBottom: "20px", marginTop: "10px" }}
                  className="mid_button"
                  type="submit"
                  name="show_all"
                  value="true"
                >
                  Apply filter
                </button>
                <br />
              </div>
            </form>
            <div
              style={{ textAlign: "center" }}
              id="no_element"
              className="hidden"
            >
              <h2 style={{ textAlign: "center" }} id="no-elements-message"></h2>
              <button className="mid_button" type="submit">
                Show all
              </button>
            </div>
          </div>

          <div className="container table-responsive">
            <table id="data-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Amount in Rs</th>
                  <th>Date</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {expenses.length > 0 ? (
                  expenses.map((expense) => (
                    <tr key={expense._id}>
                      <td>{expense.description}</td>
                      <td>{expense.Amount}</td>
                      <td>
                        {expense.date
                          ? new Date(expense.date).toLocaleDateString(
                              "zh-Hans-CN"
                            )
                          : ""}
                      </td>
                      <td>{expense.category}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No expenses found for the selected date</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* links to other pages */}
        <div className="forth">
          <a href={`/${user}/insights`}>
            <button
              style={{ marginBottom: "10px" }}
              type="button"
              className="btn dash_link"
            >
              Smart Insights
            </button>
          </a>
          <br />
          <br />
          <a href={`/${user}/loans`}>
            <button
              style={{ marginBottom: "10px" }}
              type="button"
              className="btn dash_link"
            >
              Track Loans
            </button>
          </a>
        </div>

        <script
          src="https://kit.fontawesome.com/1465e7da9e.js"
          crossOrigin="anonymous"
        ></script>
      </>
    );
  }
}

export default Dashboard;
