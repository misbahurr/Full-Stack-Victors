import { SliderValueLabel } from '@mui/material';
import * as React from 'react';
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom';

function Resources(){

    // console.log(className)
    const{id,classname}= useParams();
    console.log(classname,"10")
    const [resourceData, setResourceData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://victors-backend.vercel.app/resources/classes/${classname}/subjects`);
                if (response.ok) {
                    const data = await response.json();
                    const val=data[0].resources;
                    var req=[]
                    for (var x=0;x<val.length;x++){
                        req[val[x].title]=val[x].link;
                    }
                    setResourceData(req);
                    // console.log(resourceData,"21")
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [classname]); // Run effect whenever subject prop changes
    console.log(resourceData)
    return (<div className='images'>
    <div><a href={resourceData.Science}><img src="../../static/science.png" alt="Image 1" id="Science"/></a></div>
    <div><a href={resourceData["Math"]}><img src="../../static/math.jpg" alt="Image 2" id="Science"/></a></div>
    <div><a href={resourceData.SST}><img src="../../static/sst.jpg" alt="Image 3" id="Science"/></a></div>
    <div><a href={resourceData["English "]}><img src="../../static/english.jpg" alt="Image 4" id="Science"/></a></div>
    </div>)
}

export default Resources;