import React, {CSSProperties} from 'react'
import './PopUp.css';


const modelStyle: CSSProperties = {
    position: 'absolute',
    top: '10vh',
    left: '20%',
    width: '60%',
    zIndex: 100,
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
}


const questionBox: CSSProperties = {
    border: '2px solid grey',
    padding: '7px',
    backgroundColor: '#e6e6ff',
    marginBottom: '30px'
}


const bodyBox: CSSProperties = {
    border: '2px solid grey',
    padding: '7px',
    backgroundColor: 'pink',
    marginBottom: '30px'
}


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


const PopUpModel: React.FC<ChildComponentProps> = (props) => {
    return (
        <div id="model-container" style={modelStyle}>
            <p>Question : </p>
            <div style={questionBox}>
                <p>{props.questionData[0].title}</p>
            </div>
            <p>Body : </p>
            <div id="body-container" style={bodyBox} dangerouslySetInnerHTML={{__html: props.questionData[0].body}}/>

            <div>
                <a href={props.questionData[0].link}>See on Stack Overflow</a>
            </div>
        </div>
    )
}

export default PopUpModel
