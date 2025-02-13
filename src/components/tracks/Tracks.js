import React, { Component } from "react";

import { Consumer } from "../../context";
import Spinner from "../layout/Spinner";
import Track from "./Track";

class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {({ track_list, heading }) => {
          if (!track_list.length) return <Spinner />;
          return (
            <React.Fragment>
              <h3 className="text-center mb-4">{heading}</h3>
              <div className="row">
                {track_list.map((item) => (
                  <Track key={item.track.track_id} track={item.track} />
                ))}
              </div>
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Tracks;
