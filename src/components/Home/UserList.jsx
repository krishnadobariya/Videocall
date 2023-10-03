import './user.scss';
import Users from '../../Lists';
import { useState } from 'react';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { VideoRoom } from '../VideoRoom';



const UserList = () => {
    const [user, setuser] = useState(Users[0]);
    const [joined, setJoined] = useState(false);

    return (
        <>
            {console.log(Users)}
            <div className="container clearfix">
                <div className="people-list" id="people-list">
                    <ul className="list">
                        {Users?.map((user) => {
                            return (
                                <li className="clearfix" onClick={() => { setuser(user) }}>
                                    <img src={user?.profile} alt="avatar" />
                                    <div className="about">
                                        <div className="name">{user?.useername}</div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className="chat">
                    <div className="chat-header clearfix">
                        <div className='main-div'>
                            <div>
                                <img src={user.profile} alt="avatar" />
                                <div className="chat-about">
                                    <div className="chat-with">Chat with {user.useername}</div>
                                    <div className="chat-num-messages">already 1 messages</div>

                                </div>
                                <i className="fa fa-star"></i>
                            </div>
                            <div className='child-video'>
                                {!joined && (<BsFillCameraVideoFill onClick={() => setJoined(true)} />)}

                                {joined && (
                                    <VideoRoom />
                                )}
                            </div>
                        </div>

                    </div>

                    <div className="chat-history"></div>
                    <div className="chat-message clearfix">
                        <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>
                        <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                        <i className="fa fa-file-image-o"></i>
                        <button>Send</button>

                    </div>

                </div>

            </div>



        </>
    )
}

export default UserList