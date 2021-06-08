import React, {useState, useEffect, useRef, CSSProperties} from 'react';
import Header from './components/Header';
import Table from './components/Table';
// import QuestionCard from './components/QuestionCard';
import { fetchQuestions } from './API';
import './App.css';
const bodyStyles: CSSProperties = {
  display:'flex',
  justifyContent: 'center',
  width: '100%',
}

const App: React.FC = () => {
  
  const [loading, setLoading] = useState(false);
  const questionsRef = useRef([]);
  const [page, setPage] = useState(1);
  const [noData, setNoData] = useState(false);

  const startStack = async (page: number) => {
    setLoading(true);
    setTimeout(() => {
      fetchQuestions(page).then((res) => {
        const newPage = page + 1;
        const newList = questionsRef.current.concat(res);
        questionsRef.current = newList;
        setPage(newPage);
        if(res.length===0)
          setNoData(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() =>{
        setLoading(false);
      })
    }, 1500)
    // let allQuestions = await fetchQuestions(page);
    // // console.log(allQuestions);
    // questionsRef.current = allQuestions;
    // setLoading(false);
  }

  window.onscroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      if(!noData) {
        startStack(page);
      }
    }
  }

  useEffect(()=>{
    startStack(page);
  }, []);

  return (
    <div className="App">
      <Header/> 
      <div style={bodyStyles}>
      {loading ?  
        <div className="lds-dual-ring"></div> : null}
      {!loading && (
        <>
          <Table questionData={questionsRef.current}/>
        </>       
      )}
      </div>
    </div>
  );
}

export default App;
