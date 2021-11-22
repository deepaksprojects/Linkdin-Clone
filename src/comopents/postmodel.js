import styled from "styled-components";
import { useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import firebase from "firebase";
import { postArticleAPI } from "../actions";



const PostModel = (props) => {
const [editorText, setEditorText] = useState("");
const [shareImage, setShareImage] = useState("");
const [videoLink, setVideoLink] = useState("")
const [assetArea, setAssetArea] = useState("")
const [uploadImage, setUploadImage] = useState({}); 

const handleChange = (e) => {
 
const image = e.target.files[0]
setUploadImage(image);

 if(image==="" || image === undefined) {
     alert(`not an image, then file is a ${typeof image}`);
     return;
 }

 const reader = new FileReader()
 
 reader.onload = () => {
        setShareImage(reader.result);
 }
 reader.readAsDataURL(image);
}
const switchAssetArea = (area) => {
    setShareImage("")
    setVideoLink("")
    setUploadImage("")
    setAssetArea(area);
}

const postArticle = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      
        return ;
    }

    const payload = {
        image: uploadImage,
        video: videoLink,
        user: props.user,
        descripstion: editorText,
        timestamp: firebase.firestore.Timestamp.now(),
    }
        props.postArticle(payload);
        reset(e);

}
 
const reset = (e) => {
    setEditorText("");
    setShareImage("")
    setVideoLink("")
    setAssetArea("")
    setUploadImage("")
    props.handleClick(e);
}
    return (
        <>
        { props.showModel === 'open' && (
    <Container>
       <Content>
          <Header>
              <h1>Create a Post</h1>
              <button onClick={(event) => reset(event)}>
                  <img src="\images\close.svg" alt="" />
              </button>
          </Header>
          <SharedContent>
              <UserInfo>
                  {props.user.photoURL ? (
                  <img src={props.user.photoURL}/>   
                  ) : (
                  <img src="\images\user.svg" alt="" />
                  )}
                  <span>{props.user.displayName}</span>
              </UserInfo>
              <Editor>
                <textarea 
                value={editorText}
                 onChange={(e) => setEditorText(e.target.value)}
                 placeholder="What do you want to talk about"
                 autoFocus={true} />
                </Editor>

                {  assetArea === "image" ? (
                <UplaodImage>
                    <input 
                    type="file"
                    accept="image/gif, image/jpeg, image/png"
                    name="image"
                    id="file"
                    style={{display:"none"}}
                    onChange={handleChange} 
                     />
                     <p>
                         <label htmlFor="file"> Select an image to share
                         </label>
                
                     </p>
                     {
                         shareImage && <img src={shareImage} />
                         
                     }
                      </UplaodImage>
                     ) : (
                         assetArea === "media" && (
                     <>
                     <input type="text" 
                     placeholder="Please input a video link"
                     value={videoLink}
                     onChange={(e) => setVideoLink(e.target.value)} />
                     {videoLink && (
                         <ReactPlayer width="100%" url={videoLink} />
                     )}
                     
                     </>
                     )
                     )}
          </SharedContent>
           
          <SharedCreation>
              <AttachAssets>
                  <AssetsButton onClick={() => switchAssetArea("image")}>
                      <img src="\images\photo_collection.svg" alt="" />
                  </AssetsButton>
                  <AssetsButton onClick={() => switchAssetArea("media")}>
                     <img src="\images\video_library.svg" alt="" />
                  </AssetsButton>
              </AttachAssets>
              <ShareComment>
              <AssetsButton>
                  <img src="\images\comment.svg" alt="" />
                  Anyone
              </AssetsButton>
              </ShareComment>
              <PostButton disabled={!editorText ? true : false} onClick={(event) => postArticle(event)} >
                  Post
              </PostButton>
          </SharedCreation>
       </Content>
    </Container>
        )}
    </>
 )};

const Container = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
z-index:9999;
color: black;
background-color: rgba(0, 0, 0, 0.8);
animation: fadeIn 0.3s;
`;

const Content = styled.div`
width: 100%;
max-width: 552px;
background-color: white;
max-height: 90%;
overflow: initial;
border-radius: 5px;
position: relative;
display: flex;
flex-direction: column;
top: 32px;
margin: 0 auto;

`;

const Header = styled.div`
padding: 16px 20px;
border-bottom: 1px solid rgba(0, 0, 0, 0.15);
font-size: 16px;
line-height: 1.5;
color: rgba(0, 0, 0, 0.6);
font-weight: 400;
display: flex ;
justify-content: space-between;
align-items: center;
button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    border: none;
    background: transparent;
    svg,img{
        pointer-events: none;
        
    }
}
`;
const SharedContent = styled.div`
display: flex;
flex-direction: column;
flex-grow: 1;
overflow-y: auto;
vertical-align: baseline;
background: transparent;
padding: 8px 12px;
`;
const UserInfo = styled.div`
display: flex;
align-items: center;
padding: 12px 24px;
svg,img{
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
}
 
span{
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
}

`;

const SharedCreation = styled.div`
display: flex;
justify-content: space-between;
padding: 12px 24px 12px 16px;

`;

const AssetsButton = styled.button`
align-items: center;
display: flex;
height: 40px;
min-width: auto;
color: rgba(0, 0, 0, 0.5);
border: none;
background: transparent;
`;


    const AttachAssets = styled.div`
    display: flex; 
    align-items: center;
    padding-right: 8px;
    ${AssetsButton} {
        width: 40px;
    }
    `;
  
    const ShareComment = styled.div`
    padding-left: 8px;
    margin-right: auto;
    border-left: 1px solid rgba(0, 0, 0, 0.15);
    ${AssetsButton} {
        svg,img{
            margin-right: 5px;
        }
    }
    
    `;

    const PostButton = styled.button`
    min-width: 60px;
    border-radius: 20px;
    padding-left: 16px;
    padding-right: 16px;
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2")};
    color: ${(props) => (props.disabled ? "rgba(1,1,1,0.2)" : "white")};
    border: none;
    &:hover {
        background:  ${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#004182")};
    }
    `;

    const Editor = styled.div`
    padding: 12px 24px;
    textarea{
        width: 100%;
        min-height: 100px;
        resize: none;
    }
    input{
        width: 100%;
        height: 35px;
        font-size: 16px;
        margin-bottom: 20px;
    }
    
    `;

    const UplaodImage= styled.div`
    text-align: center;
    
    img {
        width: 100%;
        
    }
    p{
        margin-bottom: 20px;
    }
    `;


const mapStateToProps= (state) => {
    return {
        user: state.userState.user,
    }
};
const mapDispatchToProps = (dispatch) =>({
    postArticle: (payload) => dispatch(postArticleAPI(payload)),
})
export default connect(mapStateToProps, mapDispatchToProps) (PostModel);

