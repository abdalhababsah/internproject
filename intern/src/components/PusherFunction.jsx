import React, {useEffect} from 'react';
//Pusher
import Pusher from 'pusher-js';
function PusherFunction() {
	//This will be called when your component is mounted
	useEffect(() => {
		const pusher = new Pusher('cb08501f5a58effcb64b', {
			cluster: 'ap2'
		})
		const channel1 = pusher.subscribe('my-channel');
		// You can bind more channels here like this
		// const channel2 = pusher.subscribe('channel_name2')
		channel1.bind('my-event',function(data) {
		    console.log(data)
		    // Code that runs when channel1 listens to a new message
		})
		
		return (() => {
			pusher.unsubscribe('my-channel')
			// pusher.unsubscribe('channel_name2')
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// [] would ensure that useEffect is executed only once


	return(
		<div>
			{/* Render Code here */}
		</div>
	)
}


export default PusherFunction;