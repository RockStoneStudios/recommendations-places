
import {useState,useEffect} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {Room,Star} from '@material-ui/icons'
import './app.css';
import axios from 'axios';
import {format} from 'timeago.js'
import { Register } from './components/Register';
import {Login} from './components/Login'

function App() {
  const myStorage = window.localStorage;
  const [currentUser,setCurrentUser] =useState(null);
  const [pins,setPins] = useState([]);
  const [currentPlaceId,setCurrentPlaceId] = useState(null);
  const [title,setTitle] = useState(null);
  const [desc,setDes] = useState(null);
  const [showRegister,setShowRegister] = useState(false);
  const [showLogin,setShowLogin] = useState(false);
  const [star,setStar] = useState(0);
  const[newPlace, setNewPlace] = useState(null);
  const [viewport, setViewPort] = useState({
    width : "100vw",
    height : "100vh",
    latitude : 37 ,
    longitud : -122.45,
    zoom : 5
  })

  useEffect(()=>{
      const getPins = async()=>{
        try {
          const res = await axios.get('/pin/all');
          console.log(res.data);
          setPins(res.data);
        }catch(err){
          console.log(err)
        }
      };

      getPins();
  },[])

 const handleMarkerClick = (id,lat,long)=>{
     setCurrentPlaceId(id);
     setViewPort({...viewport,latitude : lat, longitud : long});
 }
 const handleAddClick = (e)=>{
       const [long,lat] = e.lngLat;
       setNewPlace({
         lat,
         long
       })
 }

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating: parseInt(star),
      lat: newPlace.lat,
      lon: newPlace.long,
    };
   console.log(newPin);
    try {
      const res = await axios.post("/pin/create", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = ()=>{
    myStorage.removeItem("user");
    setCurrentUser(null);
  }
  return (
    <div className='App'>
      <ReactMapGL {...viewport}
      mapboxApiAccessToken= {process.env.REACT_APP_MAPBOX}
      onViewportChange={nextViewport => setViewPort(nextViewport)} 
       mapStyle= "mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
       onDblClick={handleAddClick}
       transitionDuration= "200"
      >
        {pins.map((p)=>(
        <>
          <Marker 
          latitude={p.lat}
          longitude={p.lon}
          offsetLeft={-3.5*viewport.zoom}
          offsetTop={-7*viewport.zoom}
          > <Room style={{fontSize : viewport.zoom*7, color: p.username=== currentUser ? "tomato" : "slateblue" ,cursor : "pointer"}}
            onClick = {()=>handleMarkerClick(p._id, p.lat,p.long)}
          />
      </Marker>
       {p._id === currentPlaceId && (
      <Popup
        latitude={p.lat}
        longitude={p.lon}
        closeButton= {true}
        closeOnClick = {false}
        anchor='top'
        onClose={()=>setCurrentPlaceId(null)}
        >
        <div className='card'>
        <label>Place</label>
        <h4 className='place'>{p.title}</h4>
        <label>Review</label>
        <p className='desc'>{p.desc}</p>
        <label>Rating</label>
        <div className='stars'>
         {Array(p.rating).fill(<Star className='star'/>)}
        </div>
        <label>Information</label>
        <span className='username'>Created by <b>{p.username}</b></span>
        <span className='date'>{format(p.createdAt)}</span>
        </div> 
      </Popup>
       )}
      </>
        ))}
         {newPlace && (

        
        <Popup
        latitude={newPlace.lat}
        longitude={newPlace.long}
        closeButton= {true}
        closeOnClick = {false}
        anchor='top'
        onClose={()=>setNewPlace(null)}
        >
         <div>
          <form onSubmit={handleSubmit}>
            <label>Title</label>
           <input placeholder='Enter a Title' autoFocus  onChange={(e)=>setTitle(e.target.value)}/>
           <label>Review</label>
           <textarea placeholder='Say us something about this place.'  onChange={(e)=>setDes(e.target.value)}/>
           <label>Rating</label>
           <select  onChange={(e)=>setStar(e.target.value)}>
             <option>1</option>
             <option>2</option>
             <option>3</option>
             <option>4</option>
             <option>5</option>
           </select>
           <button className='submitButton' type='submit'>Add Pin</button>
          </form>
         </div>
      </Popup>
       )}
        {currentUser ? ( <button className='button logout' onClick={handleLogout}>LogOut</button>
        ) : (
       <div className='buttons'>
       <button className='button login' onClick={()=> setShowLogin(true)}>Login</button>
       <button className='button register' onClick={()=>setShowRegister(true)}>Register</button>
       </div>
       )}
        {showRegister &&
        <Register setShowRegister={setShowRegister}/>      
        }
       {showLogin && 
        <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser}/>
       }
     </ReactMapGL>
    </div>
  )
}

export default App;
