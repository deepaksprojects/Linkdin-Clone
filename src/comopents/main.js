import styled from "styled-components";
import  PostModel from "./postmodel"
import {useState, useEffect} from "react"
import { connect } from "react-redux";
import { getArticlesAPI } from "../actions";
import ReactPlayer from "react-player";


const Main = (props) => {
  const [showModel, setShowModel] = useState("close")
  
  useEffect(() => {
    props.getArticles();
  }, [])


  
const handleClick = (e) => { 
  e.preventDefault(); 
  if(e.target !== e.currentTarget) {
    return ;
  }

  switch(showModel) {
    case "open": 
    setShowModel("close");
    break;
    case "close":
      setShowModel("open")
      break;
      default: 
      setShowModel('close')
      break
  }

} 
  return (
  
  
    <Container> 
      <ShareBox>
      <div>
        { props.user && props.user.photoURL ? (<img src={props.user.photoURL} />
          ):(
          <img src="\images\user.svg" alt="" />
          )}
          <button 
          onClick={handleClick} disabled={props.loading ? true : false}>Start a post</button>
        </div>
        <div>
          <button>
            <img src="\images\photo.svg" alt="" />
            <span> Photo</span>
          </button>

          <button>
            <img src="\images\Video.svg" alt="" />
            <span>Video</span>
          </button>

          <button>
            <img src="\images\event.svg" alt="" />
            <span>Event</span>
          </button>

          <button>
            <img src="\images\article.svg" alt="" />
            <span>Wirte-article</span>
          </button>
        </div>
      </ShareBox>
      <>
      {  props.articles.length ===0 ? (
    <p> there are no articles</p>
    ):(

       <Content>

         {props.loading && <img src="/images/Spin-logo.svg" />}

         {
           props.articles.length > 0 && props.articles.map((article, key) => (

        <Article key={key}>
          <SharedActor>
            <a>
              <img src={article.actor.image} alt="" />
              <div>
                <span>{article.actor.title}</span>
                <span>{article.actor.descripstion}</span>
                <span>{article.actor.date.toDate().toLocaleDateString()}</span>
              </div>
            </a>
            <button>
              <img src="\images\eliipsis.svg" alt="" />
            </button>
          </SharedActor>
          <Description>{article.descripstion}</Description>

          <SharedImg>
            <a>
              {
                !article.shareImg && article.video ? (<ReactPlayer width={'100%'} url= {article.video}/> 
                ):(
                  article.shareImg && <img src={article.shareImg} style ={{width:'100%'}} />
                )
                
              }
            </a>
          </SharedImg>

          <SocialCounts>
            <li>
              <button>
                <img src="\images\like.svg" alt="" />
                <img src="\images\clap.svg" alt="" />
                <img src="\images\heart.svg" alt="" />
                <a>75</a>
              </button>
            </li>
            <li>
              <a>{article.comments}</a>
            </li>
          </SocialCounts>
          <SocialAction>
         
            <button>
            <img src="\images\like 2.svg" alt="" />
              <span>Like</span>
              
              <Tooltip>
                <img src="\images\like tool.svg" alt=""  />
                <img src="\images\celebrate.svg" alt=""  />
                <img src="\images\support.svg" alt=""  />
                <img src="\images\heart.svg" alt=""  />
                <img src="\images\insightful.svg" alt="" />
                <img src="\images\curious.svg" alt=""  />
              </Tooltip>
             
            </button>

            <button>
              <img src="\images\comment2.svg" alt="" />
              <span>Comment</span>
            </button>

            <button>
              <img src="\images\share.svg" alt="" />
              <span>Share</span>
            </button>

            <button>
              <img src="\images\send.svg" alt="" />
              <span>Send</span>
            </button>
          </SocialAction>
        </Article>
         ))}
        </Content>
        )}
        </>
      <PostModel showModel={showModel} handleClick={handleClick} />
    </Container>
    
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 /15%), rgb(0 0 0 /20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;

  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, o.6);
      font-size: 14px;
      line-height: 48px;
      min-height: 48px;
      background: transparent;
      border: none;
      align-items: center;
      display: flex;
      font-weight: 600;

      span {
        margin-left: 2px;
      }
    }

    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;

      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
    }

    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
    }
    span {
      text-align: left;
      &:first-child {
        font-size: 14px;
        font-weight: 700;
        color: rgba(0, 0, 0, 1);
      }

      &:nth-child(n + 1) {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;

  img {
    object-fit: center;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  /* text-align: left; */
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  margin: 0 16px;
  padding: 8px 0;
  li {
    font-size: 12.4px;
    align-items: center;
  }

  button {
    font-size: 12px;
    display: flex;
    border: none;
    background-color: white;

    img {
      margin-right: 5px;
      width: 13px;
      height: 13px;
    }
    &:hover {
      a {
        color: rgba(52, 52, 200 0.12);
        text-decoration: underline;
      }
    }
  }
`;

const Tooltip = styled.div`
  visibility: hidden;
  position: absolute;
  z-index: 1;
  bottom: 40px;
  left: 50px;
  margin-left: -70px;
  justify-content: space-between;
  background-color: white;
  border-radius: 40px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  transition: all 5s ease-in-out;


  img {
    width: 35px;
    height: 35px;
    margin: 5px 5px 5px;
    padding-left: 2px;
    top: 50%;
  }

`;
const SocialAction = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;

  button {
    border: none;
    background-color: white;
    display: inline-flex;
    align-items: center;
    padding: 8px;  
    color: #0a66c2;

  }
`;

const Content = styled.div`
text-align: center;
& > img {
  width: 30px;
}
`;
const mapStateToProps = (state) => {

return{
  loading: state.articleState.loading,
  user: state.userState.user,
  articles: state.articleState.articles
  }
}

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
   
})
export default connect (mapStateToProps,mapDispatchToProps)(Main);
