import { createRoot } from 'react-dom/client';
import './timeline-resources.css';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { useParams } from 'react-router-dom/cjs/react-router-dom';

import { extend } from '@syncfusion/ej2-base';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

import * as dataSource from './datasource.json';
import { Button } from '@mui/material';

/**
 * Schedule editor template sample
 */

const TimelineResource = () => {
    let {id,classname}= useParams();
    if(classname==="Class 6") classname="class6"
    else if(classname==="Class 7") classname="class7"
    else if(classname==="Class 8") classname="class8"
    else if(classname==="Class 9") classname="class9"
    else if(classname==="Class 10") classname="class10"
    const [scheduleData, setScheduleData] = useState(null);
    console.log(classname)
    // Function to fetch schedule data based on class name
    const fetchScheduleByClass = async () => {
        try {
            const response = await fetch(`https://victors-backend.vercel.app/schedule/getschedule/${classname}`);
            if (!response.ok) {
                throw new Error('Failed to fetch schedule');
            }
            const data = await response.json();
            console.log(data.schedule);
            setScheduleData(data.schedule);
        } catch (error) {
            console.error('Error fetching schedule:', error);
        }
    };
    
    // Function to create or update schedule data
    const createOrUpdateSchedule = async () => {
        try {
            const response = await fetch('https://victors-backend.vercel.app/schedule/updateschedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    class: classname,
                    schedule: scheduleData,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to create/update schedule');
            }
            console.log(response);
        } catch (error) {
            console.error('Error creating or updating schedule:', error);
        }
    };
    
    useEffect(() => {
        fetchScheduleByClass();
    }, [classname]); // Fetch schedule data whenever className changes
    

    function convertDateFormat(dateString) {
      // Create a new Date object from the provided date string
      const date = new Date(dateString);
  
      // Adjust to UTC time to avoid time zone shifts
      date.setMinutes(date.getMinutes());
  
      // Extract date components
      const year = date.getUTCFullYear();
      // Month needs to be adjusted by adding 1 because JavaScript months are zero-based
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
  
      // Extract time components
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  
      // Construct the ISO 8601 formatted date string
      const isoDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
  
      return isoDateString;
  }
  

    let scheduleObj = useRef(null);
    const data = extend([], scheduleData, null, true);
    const fields = {
        startTime: { name: 'StartTime', validation: { required: true } },
        endTime: { name: 'EndTime', validation: { required: true } },
    };
    const onEventRendered = (args) => {
        args.element.style.backgroundColor = args.data.ColorName;
    };
    const onActionBegin = (args) => {
        console.log(args.requestType)
        if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
            let data = args.data instanceof Array ? args.data[0] : args.data;
            args.cancel = !scheduleObj.current.isSlotAvailable(data.StartTime, data.EndTime);
            console.log(data)
            console.log(data.Id, data.Subject, data.ColorName)
            console.log(data.StartTime, convertDateFormat(data.StartTime))
            setScheduleData([...scheduleData, { "Id": data.Id, "Subject": data.Subject, "StartTime": convertDateFormat(data.StartTime), "EndTime": convertDateFormat(data.EndTime) ,ColorName:data.ColorName}])
        }else if(args.requestType==='eventRemove'){
            let data = args.data instanceof Array ? args.data[0] : args.data;
            let newData=[]
            for (let x=0;x<scheduleData.length;x++){
                if(scheduleData[x]["Id"]===data.Id){
                    continue;
                }
                newData.push(scheduleData[x]);
            }
            setScheduleData(newData)

        }
    };
    console.log(scheduleData)
    const editorHeaderTemplate = (props) => {
        return (<div id="event-header">
            {(props !== undefined) ? ((props.Subject) ? <div>{props.Subject}</div> : <div>Create New Event</div>) : <div></div>}
        </div>);
    };
    const editorTemplate = (props) => {
        return ((props !== undefined) ?
            <table className="custom-event-editor" style={{ width: '100%' ,border:"0px solid black"}} cellPadding={5}>
                <tbody>
                    <tr>
                        <td className="e-textlabel">Subject</td>
                        <td colSpan={4}>
                            <input id="Subject" className="e-field e-input" type="text" name="Subject" style={{ width: '100%' }} />
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">Color</td>
                        <td colSpan={4}>
                            <DropDownListComponent id="ColorName" placeholder='Choose status' data-name='ColorName' className="e-field" style={{ width: '100%' }} dataSource={['Salmon', 'Tomato', 'Gold','Orange','Yellow','Lime Green','Cyan']} />
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">From</td>
                        <td colSpan={4}>
                            <DateTimePickerComponent id="StartTime" format='dd/MM/yy hh:mm a' data-name="StartTime" value={new Date(props.startTime || props.StartTime)} className="e-field" />
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">To</td><td colSpan={4}>
                            <DateTimePickerComponent id="EndTime" format='dd/MM/yy hh:mm a' data-name="EndTime" value={new Date(props.endTime || props.EndTime)} className="e-field" />
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">Description</td>
                        <td colSpan={4}>
                            <textarea id="Description" className="e-field e-input" name="Description" rows={3} cols={50} style={{ width: '100%', height: '60px !important', resize: 'vertical' }} />
                        </td>
                    </tr>
                </tbody>
            </table>
            :
            <div></div>);
    };
    return (<div style={{marginTop:"-100px"}}>
        <Button onClick={createOrUpdateSchedule} variant='contained'>Submit Record</Button>
        <div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
            <div className='control-wrapper'>
                <ScheduleComponent width='100%' height='650px' selectedDate={new Date()} ref={scheduleObj} eventSettings={{ dataSource: data, fields: fields }} editorTemplate={editorTemplate}  editorHeaderTemplate={editorHeaderTemplate} actionBegin={onActionBegin} showQuickInfo={false} eventRendered={onEventRendered} readonly={false}>
                    <ViewsDirective>
                        <ViewDirective option='Day' />
                        <ViewDirective option='Week' />
                        <ViewDirective option='Month' />
                    </ViewsDirective>
                    <Inject services={[Day, Week, WorkWeek, Month, Resize, DragAndDrop]} />
                </ScheduleComponent>
            </div>
        </div>
    </div>
    
    </div>);
};
export default TimelineResource;
