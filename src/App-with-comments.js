import {useEffect, useState} from 'react';

import './App.css';

function App() {
  /*
    The following three useState functions are used to keep track of state values in this project.
    useState takes one paramter, the initial value of that state variable.
    useState returns two values, we we destructure using array destructuring. The first value is the state value
    and the second is a function which allows us to update state
  */

  // Comments is initally set to an empty array. setComments is used in our useEffect function to update comments based on our external data source
  const [comments, setComments] = useState([]);
  // I set a loading state value here to prevent rendering errors in the time between our component mounts and our fetched data is received
  const [loading, setLoading] = useState(true);
  // Search value received from our serach box
  const [searchValue, setSearchValue] = useState('');

  /* useEffect is run after our component mounts to the DOM and whenever a state value is changed.
  useEffect is where we fetch external data
  */
  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments');
      const data = await response.json();
      // Sets our data to comments state variable
      setComments(data);
      // Set loading to false
      setLoading(false);
    };
    getData();
    /* The second parameter to useEffect is a dependency array. Whenever a value in the array is changed, the useEffect
    function will run again. If we include an empty array, as I did, useEffect will only run when the components mounts */
  }, []);

  /*
    Using React naming conventions, handleSearchChange is a function that is run whenever there is a change in our search box.
    handleSearchChange receives our event (e) as an arugment.
  */
  const handleSearchChange = (e) => {
    // The input value is found at e.target.value. This value is used to update our searchValue state variable
    setSearchValue(e.target.value);
  };

  // Using our searchValue, we filter through our comments and only return comments that contain our searchValur
  const filteredComments = comments.filter(comment => comment.name.includes(searchValue));
  return (
    <div className="App">
      <input
        onChange={handleSearchChange}
        placeholder="Search Names"
      />

      {/*
        Below, we are using a tertiary operator to check the value of loading. If true, it will render
        the value before the colon, <h1>Loading</h1>.
        Once our data is loaded, loading becomes false and renders the value after the colon.
      */}

      {
        loading ? (
          <h1>Loading</h1>
        ) : (
          // Pass comments as a prop to CommentTable component
          <CommentTable comments={filteredComments}/>
        )
      }
    </div>
  );
}

export default App;


// CommentsTable component
const CommentTable = (props) => {
  // We destructure the comments off of the props
  const {comments} = props;
  return (
    <div>
      <h1>Names</h1>

      {/* Map over our comments value and render a NamesColumn component for each comment */}
      {
        comments.map((comment) => (
          <NamesColumn key={comment.id} comment={comment} />
        ))
      }
    </div>
  )
}

// NamesColumn component
const NamesColumn = (props) => {
  const {name} = props.comment;
  return (
    <div>
      <p>{name}</p>
    </div>
  )
};

