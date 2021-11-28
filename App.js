const { useState, useEffect } = React;

function App() {
  // state
	const [imgSrc, setImgSrc] = useState('');
	const [count, setCount] = useState(5);
	const [dogList, setDogList] = useState([]);

  // functions
	const onKeyPress = (e) => {
		if (e.key === 'ArrowRight') {
			setDogList(prev => [...prev, imgSrc]);
			getNextImage();
		} else if (e.key === 'ArrowLeft') {
			getNextImage();
		}
	};

	const getNextImage = () => {
		fetch('https://dog.ceo/api/breeds/image/random')
			.then((res) => res.json())
			.then((data) => setImgSrc(data.message))
      .then(() => setCount(5))
			.catch((err) => console.log(err));
	};
  
  // useEffect hooks 
  useEffect(() => {
		getNextImage();
  }, []);

  useEffect(() => {
		window.addEventListener('keydown', onKeyPress);
    
    return () => window.removeEventListener('keydown', onKeyPress);
  });

	useEffect(() => {
		const interval = setInterval(() => {
      if (count === 0) {
        getNextImage();
      } else {
			setCount((count) => count - 1);
      }
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [count]);

  // JSX
	return (
		<div className="app">
			<h1>Your New Best Friend!</h1>
			<h3>
				Press the arrow keys on your keyboard. Left to skip, Right to Adopt.
			</h3>
			<h2>Current Dog:</h2>
			<section>
				<img src={imgSrc} alt="dog image" />
			</section>
			<h2>Time Remaining: {count}</h2>
      <h2>Adopted {dogList.length} {dogList.length === 1 ? 'dog' : 'dogs'}</h2>
			<div>{dogList.length > 0 && dogList.map((dog, i) => <img key={i} src={dog} />)}</div>
		</div>
	);
}

//Render the application
ReactDOM.render(<App />, document.getElementById('root'));
