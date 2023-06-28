import React, { useState } from 'react';
import moment from 'moment';
import './App.css';
import rideData from './getRides.json';

function App() {
  const [filter, setFilter] = useState('from');

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const preparedRideData = rideData.map(ride => {
    const newRideData = {
      from: ride.from,
      to: ride.to,
      starttime: ride.starttime,
      endtime: ride.endtime,
      duration: moment
        .utc(moment(ride.endtime, "HH:mm").diff(moment(ride.starttime, "HH:mm")))
        .format("H[h] m[min]")
    };

    return newRideData;
  });

  preparedRideData.sort((a, b) => {
    const startTimeA = moment(a.starttime, 'HH:mm');
    const startTimeB = moment(b.starttime, 'HH:mm');
    return startTimeA.diff(startTimeB);
  });

  const isFilterFromActive = filter === 'from';
  const isFilterToActive = filter === 'to';

  const filteredRideData = preparedRideData.filter(ride => {
    if (filter === 'from') {
      return ride.from === 'Frankfurt(Main)Hbf';
    } else if (filter === 'to') {
      return ride.to === 'Frankfurt(Main)Hbf';
    }
    return true;
  });

  const listItems = filteredRideData.map(ride => (
    <li key={ride.starttime} className="timelineItem">
      <div className="line">
        <div className="fromHbf">{ride.from}</div>
        <div className="rideDuration">{ride.duration}</div>
        <div className="toHbf">{ride.to}</div>
      </div>
      <div className="line">
        <div className="circle"></div>
        <div className="grayline"></div>
        <div className="circle"></div>
      </div>
      <div className="line">
        <div className="fromTime">{ride.starttime} Uhr</div>
        <div className="toTime">{ride.endtime} Uhr</div>
      </div>
    </li>
  ));

  return (
    <div className="main">
      <div>
        <h1 className="headline">DB Fahrplananzeige</h1>
      </div>
      <div className="redline"></div>
      <div>
        <button
          onClick={() => handleFilterChange('from')}
          disabled={isFilterFromActive}
        >
          von Frankfurt
        </button>
        <button
          onClick={() => handleFilterChange('to')}
          disabled={isFilterToActive}
        >
          nach Frankfurt
        </button>
      </div>
      <div className="timeline">
        <ul>{listItems}</ul>
      </div>
    </div>
  );
}

export default App;
