import React, { useState } from "react";
import axios from "axios";
import { Consumer } from "../../context";
import Spinner from "../layout/Spinner";

const Search = () => {
  const [trackTitle, setTrackTitle] = useState("");
  const [buttonClick, setButtonClick] = useState(false);

  const changeHandler = (e) => {
    setTrackTitle(e.target.value);
  };

  const findTrack = (e, dispatch) => {
    e.preventDefault();
    setButtonClick(true);

    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        setButtonClick(false);
        dispatch({
          type: "SEARCH_TRACKS",
          payload: res.data.message.body.track_list,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Consumer>
      {(value) => {
        const { dispatch } = value;
        const inter = (e) => {
          findTrack(e, dispatch);
        };
        return (
          <div className="card card-body mb-4 p-4">
            <h1 className="display-4 text-center">
              <i className="fas fa-music"></i> Search For A Song
            </h1>
            <p className="lead text-center">Get the lyrics for any song</p>
            <form onSubmit={inter}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Song title..."
                  name="trackTitle"
                  value={trackTitle}
                  onChange={changeHandler}
                />
              </div>
              <button
                className="btn btn-primary btn-lg btn-block mb-5"
                type="submit"
              >
                Get track Lyrics
              </button>
            </form>
            {buttonClick && <Spinner />}
          </div>
        );
      }}
    </Consumer>
  );
};

export default Search;
