import { useState, useEffect } from "react";
import React from 'react';
import { Link } from 'react-router-dom';

const Loan = ({ user, friends, loans, totalGiveOrTake }) => {

    const [loanData, setLoanData] = useState({
        date: '',
        loan_type: '',
        person: '',
        newPerson: '',
        amount: '',
        reason: '',
      });
    
      const [filterData, setFilterData] = useState({
        date_input: '',
        sort_select: '',
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoanData({
          ...loanData,
          [name]: value,
        });
      };
    
      const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterData({
          ...filterData,
          [name]: value,
        });
      };
    
      const handleFormSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
      };
    
      const handleFilterSubmit = (e) => {
        e.preventDefault();
        // Add your filter submission logic here
      };
    
      function incrementDate() {
        const dateInput = document.getElementById('date-input');
        const currentDate = new Date(dateInput.value);
        const nextDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
        dateInput.value = nextDate.toISOString().split('T')[0];
    }
    
    function decrementDate() {
        const dateInput = document.getElementById('date-input');
        const currentDate = new Date(dateInput.value);
        const prevDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
        dateInput.value = prevDate.toISOString().split('T')[0];
    }

  return (
    <div class="loans" style="background:#633491">
        <h1 class="hloan">Loan Management</h1>
    <div>
      <div className="second">
        <h2 className="cent">Add/Delete Loans</h2>
        <form className="inp-form" onSubmit={handleFormSubmit}>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={loanData.date}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="type">Loan Type</label>
        <select
          name="loan_type"
          id="lb"
          value={loanData.loan_type}
          onChange={handleInputChange}
          required
        >
          <option className="opt" value="lent" name="lent">
            Lent
          </option>
          <option className="opt" value="borrowed" name="borrowed">
            Borrowed
          </option>
        </select>
        <label htmlFor="From">From</label>
        <select
          name="person"
          value={loanData.person}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled selected>
            Select a person
          </option>
          {friends.map((friend) => (
            <option key={friend} value={friend}>
              {friend}
            </option>
          ))}
          <option value="new">Add New Friend</option>
        </select>
        {loanData.person === 'new' && (
          <input
            type="text"
            name="newPerson"
            placeholder="New Friend"
            style={{ display: 'none' }}
          />
        )}
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          name="amount"
          placeholder="Amount in Rs"
          rows="1"
          value={loanData.amount}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="reason">Reason</label>
        <input
          type="text"
          name="reason"
          placeholder="Reason"
          value={loanData.reason}
          onChange={handleInputChange}
          required
        />
        <button className="inp-but" id="laddbtn" name="loan_button" type="submit">
          +
        </button>
      </form>
      <div className="scrolling-wrapper">
      {/* <!-- <div className="card-space"> --> */}
      {loans.length !== 0 &&
        loans.reverse().map((LoanItem) => (
          <section key={LoanItem._id} className="my-5">
            <form action={`/${user}/loans/delete`} method="post">
              <input type="hidden" name="loanid" value={LoanItem._id} />
              <div className="card">
                <div className="card-body">
                  <blockquote className="blockquote blockquote-custom bg-white px-3 pt-4">
                    <div className="blockquote-custom-icon shadow-1-strong">
                      {LoanItem.date.toLocaleDateString('en-GB')}
                    </div>
                    <p className="card_p">
                      {LoanItem.type === 'lent' ? (
                        <>
                          {LoanItem.type} to {LoanItem.name}
                        </>
                      ) : (
                        <>
                          {LoanItem.type} from {LoanItem.name}
                        </>
                      )}
                    </p>
                    <div className="pt-2 mt-2 border-top">
                      <p className="card_p">{LoanItem.amount}</p>
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
        <div className="container">
        {totalGiveOrTake.length !== 0 && (
          <div className="summarytable">
            <h2>Summary</h2>
            <table>
              <tbody>
                {totalGiveOrTake.map((friend) => (
                  <tr key={friend.name}>
                    <td>{friend.expense > 0 ? friend.name : 'You'}</td>
                    <td>{friend.expense > 0 ? 'owes' : 'owe'}</td>
                    <td>Rs. {Math.abs(friend.expense)}</td>
                    <td>
                      to{' '}
                      {friend.expense > 0 ? 'you' : friend.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </div>

      {/* Second Component */}
      <div className="third">
        <h2 className="cent">Track Your loans</h2>
        <div className="container">
        <form className="hist-form" onSubmit={handleFilterSubmit}>
          <div className="form-group hide_or_not">
            <label htmlFor="date-input">Date:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" onClick={decrementDate}>
                  <i className="fa-solid fa-caret-left" style={{ color: '#424b5c' }}></i>
                </span>
              </div>
              <input
                type="date"
                className="form-control"
                id="date-input"
                name="date_input"
                value={filterData.date_input}
                onChange={handleFilterChange}
              />
              <div className="input-group-append">
                <span className="input-group-text" onClick={incrementDate}>
                  <i className="fa-solid fa-caret-right" style={{ color: '#424b5c' }}></i>
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
              value={filterData.sort_select}
              onChange={handleFilterChange}
              required
            >
              <option value="" disabled selected>
                Select an option
              </option>
              <option name="any" value="any">
                Any
              </option>
              <option name="type" value="type">
                Type
              </option>
              <option name="amount_asc" value="amount_asc">
                Amount Ascending
              </option>
              <option name="amount_dec" value="amount_dec">
                Amount Descending
              </option>
              <option name="date_asc" value="date_asc">
                Date Ascending
              </option>
              <option name="date_dec" value="date_dec">
                Date Descending
              </option>
            </select>
          </div>
          <div style={{ textAlign: 'center' }} className="form-group">
            <button
              style={{ marginBottom: '20px', marginTop: '10px' }}
              className="mid_button"
              type="submit"
              name="show_all"
              value="true"
            >
              Apply filter
            </button>
          </div>
        </form>
        <div style={{ textAlign: 'center' }} id="no_element" className="hidden">
          <h2 style={{ textAlign: 'center' }} id="no-elements-message"></h2>
          <button id="show-all-button" className="mid_button" type="submit">
            Show all
          </button>
        </div>
      </div>

      <div className="container table-responsive">
        <table className="ltable" id="data-table">
          <thead>
            <th>Date</th>
            <th>Type</th>
            <th>From</th>
            <th style={{ width: '40%' }}>Reason</th>
            <th>Amount</th>
          </thead>
          <tbody id="data-table-body">
            {loans.length > 0 ? (
              loans.map((item) => (
                <tr key={item.date} style={{ textAlign: 'center' }}>
                  <td>{item.date ? item.date.toLocaleDateString('en-GB') : null}</td>
                  <td>{item.type}</td>
                  <td>{item.name}</td>
                  <td>{item.reason}</td>
                  <td>{item.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No loans found for the selected date</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>

      {/* Third Component */}
      <div className="forth">
        <Link to={`/${user}/dashboard`}>
          <button
            style={{
              background: '#401c64',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 'bold',
              padding: '0.5rem 1rem',
              margin: 'auto',
              borderRadius: '2rem',
              backgroundColor: '#401c64',
              border: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              transition: 'all 0.2s ease-in-out',
            }}
            type="button"
            className="btn dash_link"
          >
            Dashboard
          </button>
        </Link>
        <br />
        <br />
        <Link to={`/${user}/insights`}>
          <button
            style={{
              background: '#401c64',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 'bold',
              padding: '0.5rem 1rem',
              margin: 'auto',
              borderRadius: '2rem',
              backgroundColor: '#401c64',
              border: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              transition: 'all 0.2s ease-in-out',
            }}
            type="button"
            className="btn dash_link"
          >
            Insights
          </button>
        </Link>
      </div>
    </div>
    </div>
  );
};

export default Loan;
