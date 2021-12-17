
import NetworkDetector from './Hoc/NetworkDetector';

import React from 'react';
import Loading from './Loading.js'
import './App.css';


function Text(props) {

    console.log('Loading quotes')
    return (
        <div>
           
            <div id='text'><p>{props.data.quote}</p></div>
            <div id='author'><p>-{props.data.author}</p></div>
        </div>
    )
};


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            quote: '',
            author: '',
            load: false,
        }
        this.addQuote = this.addQuote.bind(this);
        this.setData = this.setData.bind(this)
    }

    setData(data) {

        // data is an object with 20 different objects containing quotes and authors
        const randNum = Math.floor(Math.random() * 20)
        const text = data[randNum].text;
        const auth = data[randNum].author;

        this.props.onClick();

        console.log('setting data and load to false')

        // we set the state properties to the text and
        // set load to the opposite of what it was before
        this.setState({
            quote: text,
            author: auth,
            load: !this.state.load
        })

    }

    // triggered on the first render so that if the page reloads or connection is secured again, 
    // the page will revert back to its original colors
    componentWillMount() {
        const body = document.querySelector("body");
        body.style.backgroundColor = '#E6B3B3';
    }

    // this lifecycle method will update the color to a different color everytime 
    // a change was made to the state
    componentDidUpdate(prevProps, prevState) {

        console.log('component updated')

        const body = document.querySelector("body");
        body.style.backgroundColor = this.props.newColor;

        const btn = document.getElementsByTagName("button");
        var value = Object.values(btn)
        for (let b of value) {
            b.style.backgroundColor = this.props.newColor;
        }

    }


    // this will fetch a random quote from an API
    async addQuote() {

        // we want to provide a loading screen temporarily while the user waits for data
        console.log('current value of load is ' + this.state.load)
        this.setState({
            load: true,
        })
        console.log('new value of load after setting ' + this.state.load)


        const response = await fetch('https://type.fit/api/quotes');
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const data = await response.json();

        // because the author may be null, we just replace it with 'unkown'
        Object.entries(data).forEach(function (entry) {
            if (entry[1]["author"] == null) {
                entry[1].author = "unknown";
            }
        })

        // updating the state of this component 
        this.setData(data);

    }


    render() {
        console.log('render is called')

        if (this.state.load === false) {
            console.log('load should not show because it is false')
        }
        else {
            console.log('load should show because it is true')
        }


        return (

            <div>

                <div id='quote-box' style={{ "color": this.props.newColor }}>

                    {/* if the load is true we display it */}
                    {this.state.load === true && <Loading />}

                    {/* if the load is false we display the quote instead */}
                    {this.state.load === false &&
                        <div><Text data={this.state} /></div>}

                    {/* Buttons to acccess different links and to also generate a new quote */}
                    <footer>
                        <button id='tmblr-btn'><a id='tumblr' href='https://www.tumblr.com/login?redirect_to=https%3A%2F%2Fwww.tumblr.com%2Fwidgets%2Fshare%2Ftool%3Fposttype%3Dquote%26tags%3Dquotes%252Cfreecodecamp%26caption%3DMae%2BJemison%26content%3DIt%25E2%2580%2599s%2Byour%2Bplace%2Bin%2Bthe%2Bworld%253B%2Bit%25E2%2580%2599s%2Byour%2Blife.%2BGo%2Bon%2Band%2Bdo%2Ball%2Byou%2Bcan%2Bwith%2Bit%252C%2Band%2Bmake%2Bit%2Bthe%2Blife%2Byou%2Bwant%2Bto%2Blive.%26canonicalUrl%3Dhttps%253A%252F%252Fwww.tumblr.com%252Fbuttons%26shareSource%3Dtumblr_share_button' target="blank"> Tumblr</a></button>
                        <button id='tweet-btn' ><a id='tweet-quote' href="https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22It%E2%80%99s%20your%20place%20in%20the%20world%3B%20it%E2%80%99s%20your%20life.%20Go%20on%20and%20do%20all%20you%20can%20with%20it%2C%20and%20make%20it%20the%20life%20you%20want%20to%20live.%22%20Mae%20Jemison" target='blank'>Twitter</a></button>
                        <button id='new-quote' onClick={this.addQuote}>New Quote</button>
                    </footer>

                </div>

                <div id={'creator'}>William Kim</div>

            </div>
        )
    }



};
// returns jsx of our quote box
export default NetworkDetector(App);