import {useEffect, useState} from 'react';

import './App.css';

function App() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments');
      const data = await response.json();
      setComments(data);
      setLoading(false);
    };
    getData();
  }, []);


  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };


  const filteredComments = comments.filter(comment => comment.name.includes(searchValue));
  return (
    <div className="App">
      <input
        onChange={handleSearchChange}
        placeholder="Search Names"
      />
      {
        loading ? (
          <h1>Loading</h1>
        ) : (
          <CommentTable comments={filteredComments}/>
        )
      }
    </div>
  );
}

export default App;


const CommentTable = (props) => {
  const {comments} = props;
  return (
    <div>
      <h1>Names</h1>
      {
        comments.map((comment) => (
          <NamesColumn key={comment.id} comment={comment} />
        ))
      }
    </div>
  )
}

const NamesColumn = (props) => {
  const {name} = props.comment;
  return (
    <div>
      <p>{name}</p>
    </div>
  )
};

