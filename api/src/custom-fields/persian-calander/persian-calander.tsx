import JCalendar from 'reactjs-persian-calendar'
import React , {useState} from 'react';

type JCalendarInputProps = {
  value: string | null;
  onChange?: (value: string | null) => void;
};

export function JCalendarInput(props: JCalendarInputProps ) {
  const [state , setState] = useState('notFound')
  
  const changeCal = (faCalc : string , enCalc : string) => {
      
      setState(faCalc)
      props.onChange?.(enCalc)
  }

  return (
    <div>
      <div>
          {state}
        <div>
          <JCalendar
          locale={'fa'} 
          color={'#000066'}
          size={30}
          onClick={changeCal}
          itemRender={(key, item, children) => children}
          />
        </div>
   <div>
     
   <label htmlFor="appt">Choose a time for your meeting:</label>

<input type="time" id="appt" name="appt"
       min="09:00" max="18:00" required />

<small>Office hours are 9am to 6pm</small>



   </div>
      
      </div>
    </div>
  );
}

