import JCalendar from 'reactjs-persian-calendar'
import React , {useState , ChangeEvent} from 'react';

type JCalendarInputProps = {
  value: string | null;
  onChange?: (value: string | null) => void;
};

export function JCalendarInput(props: JCalendarInputProps ) {
  const today = new Date().toLocaleDateString("en-US").split('/');
  const initialState = `${today[2]}-${today[0]}-${today[1]}` 
  const [state , setState] = useState('not defined')
  
  const changeCal = (faCalc : string , enCalc : string) => {
      
      setState(faCalc)
      props.onChange?.(enCalc)
  }

  const changeTime = (event : ChangeEvent<HTMLInputElement> ) => {
    console.log(event.timeStamp)
  }

  return (
    <div>
      <div>
          {state}
        <div>
          <JCalendar
          locale={'fa'} 
          color={'#2563eb'}
          size={30}
          onClick={changeCal}
          itemRender={(key, item, children) => children}
          />
        </div>
   <div>
     
   <label htmlFor="appt">Choose a time for your meeting:</label>

<input onChange={(e) => changeTime(e)} type="time" id="appt" name="appt"
       min="09:00" max="18:00"  />




   </div>
      
      </div>
    </div>
  );
}

