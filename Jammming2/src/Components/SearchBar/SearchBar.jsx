import React from "react";
import './SearchBar.css'

export class SearchBar extends React.Component {
    constructor(props){
        super(props);

        this.state = { term: "" };

        this.search = this.search.bind(this)
        this.handleTermChang = this.handleTermChang.bind(this)
    }

    search() {
        this.props.onSearch(this.state.term)
    }

    handleTermChang(e) {
        this.setState({ term: e.target.value });
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChang} />
                <button className="SearchButton" onClick={this.search} >SEARCH</button>
            </div>
        )
    }
}