
import { DateRange } from 'react-date-range';
import { useState, useEffect, useRef } from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import useFetch from './hooks/useFetch';
import SpinnerModel from './components/SpinnerModal';



function App() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);

  const { data, loading, error } = useFetch("rooms", "GET", {})
  const [srcArray, setSrcArray] = useState(null)
  const [imgLoading, setImgLoading] = useState(false)

  useEffect(() => {
    let arr
    if (data) { arr = data['items'].map(ele => ele['imageUrl']) }
    data && setSrcArray(arr)
  }, [data])

  useEffect(() => {
    fetch('https://images.unsplash.com/photo-1551776235-dde6d482980b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80')
      .then(response => response.blob())
      .then(image => {
        // Create a local URL of that image
        const localUrl = URL.createObjectURL(image);
      });
  }, []);

  const counter = useRef(0);
  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= srcArray.length) {
      setImgLoading(false);
    }
  }


  return (

    <>
      <DateRange
        editableDateInputs={true}
        onChange={item => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />

      {(loading || imgLoading) && <SpinnerModel />}

      {
        srcArray &&
        <div>
          {srcArray.map(url =>
            <img
              key={url}
              src={url}
              onLoad={imageLoaded} />)}
        </div>
      }
    </>

  );
}

export default App;
