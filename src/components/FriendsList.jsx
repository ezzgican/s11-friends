import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContextProvider';
import axios from 'axios';


export default function FriendsList(props) {
  const [friends, setFriends] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    axios.get("https://nextgen-project.onrender.com/api/s11d2/friends", {
      headers: {
        Authorization: auth?.token
      }
    })
    .then((res) => setFriends(res.data))
    .catch((err) => console.error(err));
  }, []);

  return (
    <div className="friendListDiv">
      <h1>FRIENDS LIST</h1>
      {friends.map((friend, key) => (
        <div className="friendList" key={key}>
          {friend.name}-{friend.email}
        </div>
      ))}
    </div>
  );
}
