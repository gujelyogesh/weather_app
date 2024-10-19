
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [city, setCity] = useState('')
  const [cityError, setCityError] = useState('')
  const [weather, setWeather] =  useState([])
  const [dateState, setDateState] = useState(new Date());
  const [currentDay, setCurrentDay] = useState('');

 
      const fetchapi =async()=>{
        try{
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"dd531bc590d6d661d0e88d6ec73139e5"}`)
             console.log(response,"res");
            setWeather(response);
            
        }catch(err){
          console.log(err);
          
        }
      }


  const handleSearch = (e) => {
    e.preventDefault()
    if(city == ""){
      setCityError("Enter The City Name");
    }
    fetchapi()
  }
  
  
// create variable with time
  const t = new Date();
  const c = t.getHours() - 12;
  useEffect(() => {
    setInterval(() => {
      setDateState(new Date());
    }, 1000);
  }, []);
// create variable current day
  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });
    setCurrentDay(dayOfWeek);
  }, []);
// create variable  current date 
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  return (
    <div>
      <div className="grid w-full place-items-center bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-gray-700" style={{height:"700px"}}>
        <section className="grid min-h-[600px] w-full max-w-md rounded-2xl bg-white bg-gradient-to-tl from-purple-800 via-violet-900 to-purple-800 p-6 img">

          <div className="flex h-full flex-col gap-y-2 rounded-2xl text-violet-100">
            <div className="relative flex items-center gap-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search absolute left-4 h-5 w-5 text-violet-800">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>

              <input type ="text"className="w-full rounded-full bg-purple-300 placeholder:text-violet-800/50 py-3 pl-11 pr-4 text-violet-800 outline-none focus:ring-0" placeholder="Enter the City Name" onChange={((e)=>{setCity(e.target.value);
              setCityError("");
              })} 
            value={city}/>
              <button className="grid aspect-square h-12 w-12 place-items-center rounded-full bg-violet-600 outline-none transition-colors duration-200 ease-in-out hover:bg-violet-500" onClick={handleSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-right h-5 w-5">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
            <div>{cityError}</div>
            <header className="date space-y-2 text-xl font-medium tracking-tighter text-center">
              <h1><span className='mx-2 '>Day</span>{currentDay} and <span>{date}</span></h1>
              <p className="text-5xl font-extrabold">
              {dateState.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
         
          hour12: true,
        })}
            </p>
            </header>
            <main className="b relative flex-1">
              <div id="weather" className="weather mx-auto my-4 h-28 max-w-xs">

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide h-full w-full lucide-cloud-hail"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M16 14v2" /><path d="M8 14v2" /><path d="M16 20h.01" /><path d="M8 20h.01" /><path d="M12 16v2" /><path d="M12 22h.01" /></svg>

              </div>
             
                { weather && 
               (
                 <>
                 <div className="text-center space-y-4 pt-3">
                <h2 className="font-bold text-3xl text-white">{weather?.data?.name}</h2>
                <h3 className="font-extrabold text-5xl">{weather?.data?.main?.temp}°C</h3>
              </div>
              
              <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 border-t border-violet-500 pt-3 text-violet-300">
                <div className="wave flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-waves h-12 w-12">
                    <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                    <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                    <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                  </svg>
                  <div className="">
                    <p className="text-sm font-extrabold">{weather?.data?.main?.humidity}%</p>
                    <p className="text-sm font-medium">Humidity</p>
                  </div>
                </div>
                <div className="wave flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-waves h-12 w-12">
                    <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                    <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                    <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                  </svg>
                  <div className="">
                    <p className="text-sm font-extrabold">{weather?.data?.wind?.speed}%</p>
                    <p className="text-sm font-medium">Wind Speed</p>
                  </div>
               
                </div>
              </div>
              </>
               ) }
           
          </main>
          </div>
           
        </section>
      </div>
    </div>
  );
}

export default App;
