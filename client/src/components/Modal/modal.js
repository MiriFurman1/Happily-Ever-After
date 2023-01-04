import React, { useEffect } from "react";
import { useState } from 'react'
import "./modal.css";
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Modal({ modal, toggleModal, currentGuest, guests }) {


  const [guestName, setGuestName] = useState("")
  const [guestEmail, setGuestEmail] = useState("")
  const [numOfGuests, setNumOfGuests] = useState("")
  const [side, setSide] = useState("")
  const [jwt] = useState(Cookies.get('jwt'));
  const [newGuest, setNewGuest] = useState(null)

  useEffect(() => {
    if (!currentGuest) {
      const newGuest = {
        name: guestName,
        email: guestEmail,
        numberOfGuests: numOfGuests,
        side: side,
      };
      setNewGuest(newGuest)
    }
    else {
      setGuestName(currentGuest.name)
      setGuestEmail(currentGuest.email)
      setNumOfGuests(currentGuest.numberOfGuests)
      setSide(currentGuest.side)
    }
  }, [])



  let apiUrl = "http://localhost:5000/api";
  if (process.env.NODE_ENV === "production") {
    apiUrl = '/api'
  }



  useEffect(() => {
    if (modal) {
      setGuestName(currentGuest.name)
      setGuestEmail(currentGuest.email)
      setNumOfGuests(currentGuest.numberOfGuests)
      setSide(currentGuest.side)
    }

  }, [currentGuest, modal])



  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (currentGuest) {
      const updatedGuests = await guests.map((guest) => {
        if (guest._id === currentGuest._id) {
          return {
            ...guest,
            name: guestName,
            email: guestEmail,
            numberOfGuests: numOfGuests,
            side: side,
          };
        } else {
          return guest;
        }
      });

      var data = JSON.stringify({
        "guests": updatedGuests
      })

      var config = {
        method: 'patch',
        url: `${apiUrl}/mywedding`,
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios(config)
        .then(function (response) {
          console.log((response.data));
          toggleModal();
          window.location.reload(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    else if (newGuest) {
      const updatedGuests = [...guests, newGuest];
      var dataNew = JSON.stringify({
        "guests": updatedGuests
      })
      var configNew = {
        method: 'patch',
        url: `${apiUrl}/mywedding`,
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        },
        data: dataNew
      };

      axios(configNew)
        .then(function (response) {
          console.log((response.data));
          toggleModal();
          window.location.reload(false);
        })
        .catch(function (error) {
          console.log(error);
        });

    }
  }

  const handleDelete = async () => {
    // Remove the current guest from the array
    const updatedGuests = await guests.filter((guest) => guest._id !== currentGuest._id);

    var data = JSON.stringify({
      "guests": updatedGuests
    })

    var config = {
      method: 'patch',
      url: `${apiUrl}/mywedding`,
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log((response.data));
        toggleModal();
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  return (
    <>


      {(modal && (currentGuest || newGuest)) && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Guests</h2>
            <form>
              <label>
                Name: &nbsp;
                <input
                  type="Name"
                  name="GuestName"
                  value={guestName}
                  onChange={(event) => {
                    setGuestName(event.target.value)}}
                />
                {/* <h2>{guestName}</h2> */}
              </label>
              <label>
                Email: &nbsp;
                <input
                  type="email"
                  name="GuestEmail"
                  value={guestEmail}
                  onChange={(event) => setGuestEmail(event.target.value)}
                />
              </label>
              <label>
                Number of guests: &nbsp;
                <input
                  type="number"
                  name="numOfGuests"
                  value={numOfGuests}
                  onChange={(event) => setNumOfGuests(event.target.value)}
                />
              </label>
              <label>
                Side: &nbsp;
                <select
                  type="name"
                  name="side"
                  value={side}
                  onChange={(event) => setSide(event.target.value)}
                >
                  <option value="" selected disabled hidden>Choose here</option>
                  <option value="bride" >Bride</option>
                  <option value="groom">Groom</option>
                </select>
              </label>
            </form>
            <button onClick={handleSubmit}>save</button>
            {currentGuest && <button onClick={handleDelete}>Delete</button>}

            <button className="close-modal" onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      )}

    </>
  );
}