import React from "react";
import styled from "styled-components";


const Text = (props) => {

const {children, size, color, bold, margin, width, height,  wordbreak, padding, position, top, left, textalign} = props;
 const styles = {size, color, bold, margin, width, height,  wordbreak, padding, position, top, left, textalign}
    return (
        <React.Fragment>
            <P {...styles}>{children}</P>
        </React.Fragment>
    )
}

Text.defaultProps ={
 size : null ,
 bold : false, 
 color : "#000000",
 margin : null,
 width : null,
 height : null,
 wordbreak: null,
 padding: null,
 position: null,
 top:null,
 left:null,
 textalign: false, 
}

const P = styled.p`
    word-break : ${(props)=>props.wordbreak? `break-all` : null};
    ${(props)=>(props.bold? `font-weight: 600;`: `font-weight: 350;`)};
    ${(props)=>(`color : ${props.color};`)};
    ${(props)=> (`font-size: ${props.size};`)};
    ${(props)=>(`margin : ${props.margin};`)};
    ${(props)=>(`width : ${props.width};`)};
    ${(props)=>(`height : ${props.height};`)};
    ${(props)=>(`padding : ${props.padding};`)};
    ${(props) =>(`position : ${props.position};`)};
    ${(props) =>(`top : ${props.top};`)};
    ${(props) =>(`left : ${props.left};`)};
    ${(props)=> (props.textalign? `text-align: center;` : null)};
`;


export default Text;