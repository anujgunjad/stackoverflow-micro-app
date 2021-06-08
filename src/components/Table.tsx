import React, { useState, useRef } from "react";
import { timeConverter } from '../utils';
import PopUpModel from './PopUpModel';
import Overlay from '../UI/Overlay';
import { fetchSingleQuestions } from '../API';
import './Table.css';
// const tableMain: CSSProperties = {
//     position: 'absolute',
//     fontFamily: 'Arial, Helvetica, sans-serif',
//     borderCollapse: 'collapse',
//     width: '100%',
// }

// const tableHeadR: CSSProperties = {
//   paddingTop: '12px',
//   paddingBottom: '12px',
//   textAlign: 'left',
//   backgroundColor: '#04AA6D',
//   color:'white',
 
// }

interface Item {
    id: number,
    author: string,
    title: string,
    createdDate: number,
    link:string,
    body: string,
}


interface ChildComponentProps {
    questionData: Item[]
}


const Table: React.FC<ChildComponentProps> = (props) => {
    const[overlay, setOverlay] = useState(false);
    const singleQuestionRef = useRef([]);

    const rowHandler = async (id: number) => {
        let singleQuestion = await fetchSingleQuestions(id);
        singleQuestionRef.current = singleQuestion;
        setOverlay(true);
        window.scrollTo(0, 0);
    };  
    
    const closeOverLay = () => {
        setOverlay(false);
    }

    return(
        <div style={{margin:'20px'}}>
        <table id="questions" >
            <tbody>
            <tr >
                <th>Author</th>
                <th>Title</th>
                <th>Created Date</th>
            </tr>
            {
             props.questionData.map((e, i) => {
                 return(
                <tr key={e.id} onClick={() => rowHandler(e.id)}>
                    <td style={{fontWeight: 'bold'}}>{e.author}</td>
                    <td>{e.title}</td>
                    <td>{timeConverter(e.createdDate)}</td>
                </tr>
                 )
             })
            }
            </tbody>
        </table>
        {
            overlay && (
                <>
                    <Overlay closeOverLay = {closeOverLay}/>
                    <PopUpModel questionData = {singleQuestionRef.current}/>
                </>
            )
        }
        </div>
        
    )
}

export default Table;