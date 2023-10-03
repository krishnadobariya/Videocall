import React, { useState } from 'react';
import { VideoRoom } from './VideoRoom';

export default function Call() {
  const [joined, setJoined] = useState(false);
  return (
    <>
      {/* <div>Wdj</div> */}
      {!joined && (

        <button onClick={() => setJoined(true)}>join</button>
      )}

      {joined && (
        <VideoRoom />
      )}
    </>
  )
}
