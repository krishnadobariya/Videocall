// import React,{useEffect, useState} from 'react';

// import AgoraRTC from 'agora-rtc-sdk-ng';
// import { Videoplayer } from './Videoplayer';


// const APP_ID = '852bb78367cd4b73949328d178986001';
// const TOKEN = '007eJxTYJAuujWv9JjmrIYC779qskJePgJ6Dz0SVr1iaX/36fh2PXkFBgtTo6QkcwtjM/PkFJMkc2NLE0tjI4sUQ3MLSwszAwNDgYsqqQ2BjAxl1mGsjAwQCOJzMZRlpqTmKyQn5uQwMAAAatIeqw=='

// // const TOKEN = '007eJxTYFidxs/F1TJ/ge2UyZmNQeoPflwTn1u14mPUZ60pldaTbjYoMCSbmSVapFmYmFmYmpmkWBpamBgnGhtZpJqbGxiapZokT7wkndoQyMiQ/i+OiZEBAkF8LoayzJTUfIXkxJwcBgYA94ohYw=='
// const CHANNEL = 'video call';
// const client = AgoraRTC.createClient({mode:'rtc',codec:'vp8'})


// export const VideoRoom = () => {
//     const [users, setUsers] = useState([]);
//     const [localTracks, setLocalTracks] = useState([]);
  
//     const handleUserJoined = async (user, mediaType) => {
//       await client.subscribe(user, mediaType);
  
//       if (mediaType === 'video') {
//         setUsers((previousUsers) => [...previousUsers, user]);
//       }
  
//       if (mediaType === 'audio') {
//         // user.audioTrack.play()
//       }
//     };
  


// const handleUserLeft = (user) => {
//     setUsers((previousUsers) =>
//       previousUsers.filter((u) => u.uid !== user.uid)
//     );
//   };



// useEffect(() => {
//     client.on('user-published', handleUserJoined);
//     client.on('user-left', handleUserLeft);

//     client
//       .join(APP_ID, CHANNEL, TOKEN, null)
//       .then((uid) =>
//         Promise.all([
//           AgoraRTC.createMicrophoneAndCameraTracks(),
//           uid,
//         ])
//       )
//       .then(([tracks, uid]) => {
//         const [audioTrack, videoTrack] = tracks;
//         setLocalTracks(tracks);
//         setUsers((previousUsers) => [
//           ...previousUsers,
//           {
//             uid,
//             videoTrack,
//             audioTrack,
//           },
//         ]);
//         client.publish(tracks);
//       });

//     return () => {
//       for (let localTrack of localTracks) {
//         localTrack.stop();
//         localTrack.close();
//       }
//       client.off('user-published', handleUserJoined);
//       client.off('user-left', handleUserLeft);
//     //   client.unpublish(tracks).then(() => client.leave());
//     };
//   }, []);


//   return (
//     <div style={{display:"flex",justifyContent:"center"}}>
//         <div style={{display:"grid",gridTemplateColumns:'repeat(2,200px)'}}>
//       {
//         users.map((user)=>(
//            <Videoplayer key={user.uid} user={user}/>
//             ))
//       }

//       </div>


     
//     </div>
//   )
// }


import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { Videoplayer } from './Videoplayer';

const APP_ID = '852bb78367cd4b73949328d178986001';
const TOKEN = '007eJxTYJAuujWv9JjmrIYC779qskJePgJ6Dz0SVr1iaX/36fh2PXkFBgtTo6QkcwtjM/PkFJMkc2NLE0tjI4sUQ3MLSwszAwNDgYsqqQ2BjAxl1mGsjAwQCOJzMZRlpqTmKyQn5uQwMAAAatIeqw=='

// const TOKEN = '007eJxTYFidxs/F1TJ/ge2UyZmNQeoPflwTn1u14mPUZ60pldaTbjYoMCSbmSVapFmYmFmYmpmkWBpamBgnGhtZpJqbGxiapZokT7wkndoQyMiQ/i+OiZEBAkF8LoayzJTUfIXkxJwcBgYA94ohYw=='
const CHANNEL = 'video call';

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

export const VideoRoom = () => {
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);
  const [error, setError] = useState(null); // State to store error messages

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType === 'video') {
      setUsers((previousUsers) => [...previousUsers, user]);
    }

    if (mediaType === 'audio') {
      // user.audioTrack.play()
    }
  };

  const handleUserLeft = (user) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );
  };

  useEffect(() => {
    client.on('user-published', handleUserJoined);
    client.on('user-left', handleUserLeft);
    let uid; //
    // Check if camera and microphone are available
    AgoraRTC.getDevices()
      .then((devices) => {
        const camera = devices.find((device) => device.kind === 'videoinput');
        const microphone = devices.find((device) => device.kind === 'audioinput');
  
        if (!camera || !microphone) {
          setError('Camera or microphone not found. Please make sure they are connected and allowed.');
          return;
        }
  
        return client.join(APP_ID, CHANNEL, TOKEN, null);
      })
      .then((uid) => {
        if (!uid) {
          setError('Failed to join the channel.');
          return;
        }
  
        return AgoraRTC.createMicrophoneAndCameraTracks();
      })
      .then((tracks) => {
        if (!Array.isArray(tracks) || tracks.length < 2) {
          setError('Failed to create audio and video tracks.');
          return;
        }
  
        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks);
        setUsers((previousUsers) => [
          ...previousUsers,
          {
            uid,
            videoTrack,
            audioTrack,
          },
        ]);
        client.publish(tracks);
      })
      .catch((err) => {
        setError(err.toString());
      });
  
    return () => {
      for (let localTrack of localTracks) {
        localTrack.stop();
        localTrack.close();
      }
      client.off('user-published', handleUserJoined);
      client.off('user-left', handleUserLeft);
      // client.unpublish(tracks).then(() => client.leave());
    };
  }, []);

  if (error) {
    // Display the error message in your UI
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 200px)' }}>
        {users.map((user) => (
          <Videoplayer key={user.uid} user={user} />
        ))}
      </div>
    </div>
  );
};
