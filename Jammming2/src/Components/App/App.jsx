import React from 'react'
import './App.css'
import { SearchBar } from '../SearchBar/SearchBar'
import { SearchResults } from '../SearchResults/SearchResults'
import { Playlist } from '../Playlist/Playlist'
import Spotify from '../../util/Spotify'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [], 
      playlistName: 'My playlist',
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist =this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }

  addTrack(track) {
    let newTrackList = this.state.playlistTracks;
    if(this.state.playlistTracks.find( savedTrack => savedTrack.id === track.id )){
      return;
    } else {
      newTrackList.push(track);
      this.setState({ playlistTracks: newTrackList });
    }
  }

  removeTrack(track) {
    let newTrackList = this.state.playlistTracks.filter( savedTrack => savedTrack.id !== track.id );
    newTrackList.filter( savedTrack => savedTrack.id !== track.id );
    this.setState({ playlistTracks: newTrackList });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name});
  }

  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(track => track.uri)
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(
      () => {this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })}
    )

  }

  search(term) {
    Spotify.search(term).then(
      searchResults => {this.setState({ searchResults: searchResults});}
    )
  }

  componentDidMount() {
    Spotify.getAccessToken();
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
          <Playlist playlistName={this.state.playlistName} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App


// { name: 'name1', artist: 'artis1', album: 'album1', id: 1}, 
// { name: 'name2', artist: 'artis2', album: 'album2', id: 2},
// { name: 'name3', artist: 'artis3', album: 'album3', id: 3}


// { name: 'playListName1', artist: 'playListArtis1', album: 'playListAlbum1', id: 1}, 
// { name: 'playListName2', artist: 'playListArtis2', album: 'playListAlbum2', id: 2},
// { name: 'playListName3', artist: 'playListArtis3', album: 'playListAlbum3', id: 3}

  