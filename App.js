import React from 'react';
import Header from './components/Header'
import { StyleSheet, View, TouchableOpacity, Alert, Button } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      gameState:[
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ], //setea el estado del juego y que posiciones de las piezas se llenan 
      currentPlayer: 1, //para el turno de los jugadores 1: player1 y -1: player2
    }
  }
  // component did mount es llamado una vez que el componente este montado 
  componentDidMount() {
    this.initializeGame();
  }
  // para inicializar el juego hacemos la funcion siguiente que va a setear el estado del juego que sea un 2d array 
  // y va a tener un valor de 1 para la X, un valor de -1 para una O y un valos de cero para una celda en blanco 
  // vamos a inicializar el juego llenando todas las casillas con ceros, porque cuando empezamos el juego queremos que 
  // el tablero entero este vacio
  initializeGame = () => {
    this.setState({
      gameState: 
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ],
        currentPlayer:1,
    });
  }

  //va a retornar 1 si el jugador 1 gana, -1 si el jugador 2 gana o cero si nadie gano
  getWinner = () => {
    const NUM_TILES = 3;
    let arr = this.state.gameState;
    let sum;

    // check rows
    for(let i=0; i<NUM_TILES; i++){
      sum= arr[i][0] + arr[i][1] + arr[i][2];
      if(sum == 3 ) {return 1;}
      else if (sum == -3 ) {return -1;}
    }

    //check columns 
    for(let i=0; i< NUM_TILES; i++){
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if(sum == 3 ) {return 1;}
      else if (sum == -3 ) {return -1;}
    }

    // check diagonals
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if(sum == 3) {return 1;}
    else if (sum == -3 ) {return -1;}

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if(sum == 3) {return 1;}
    else if (sum == -3 ) {return -1;}

    // no winners
    return 0;
    
  }
  
  onTilePress = (row, col) => {
    //dont allow tiles to change
    let valor = this.state.gameState[row][col];
    if(valor !== 0) { return; }
    //Grab the current player
    let currentPlayer = this.state.currentPlayer;
    // set the correct tile
    let arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({
      gameState: arr
    });

    //switch to other player
    let nextPlayer = (currentPlayer ==1) ? -1 : 1;
    this.setState({
      currentPlayer:nextPlayer
    });

    //check for winners
    let winner = this.getWinner();
    if(winner == 1){
      Alert.alert("Jugador X es el ganador");
      this.initializeGame();
    }else if (winner == -1) {
      Alert.alert("Jugador O es el ganador");
      this.initializeGame();
    // caso de empate (nadie gana)  
    }else if (winner == 0 && this.state.gameState[0].indexOf(0) === -1 && this.state.gameState[1].indexOf(0) === -1 && this.state.gameState[2].indexOf(0) === -1) {
      Alert.alert("Empate");
      this.initializeGame();
    }
  }

  onNewGamePress = () => {
    this.initializeGame();
  }

  renderIcon = (row, col) => {
    const value = this.state.gameState[row][col];
    switch(value)
    {
      case 1: return <Icon style= {styles.iconx} name="close"/>;
      case -1 : return <Icon style= {styles.iconcircle} name="circle-outline"/>;
      default: return <View />;
    }
  }

  render() {
    return (
      <View style={styles.totalContainer}>
      <Header />
      <View style={styles.container}>
        <View style = {{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.onTilePress(0,0)} style = {[styles.square, { borderLeftWidth: 0, borderTopWidth: 0 }]}>{this.renderIcon(0,0)}</TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0,1)} style = {[styles.square, { borderTopWidth: 0 }]}>{this.renderIcon(0,1)}</TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0,2)} style = {[styles.square, { borderTopWidth: 0, borderRightWidth: 0 }]}>{this.renderIcon(0,2)}</TouchableOpacity>
        </View>  
        <View style = {{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.onTilePress(1,0)} style = {[styles.square, { borderLeftWidth: 0 }]}>{this.renderIcon(1,0)}</TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1,1)} style = {styles.square}>{this.renderIcon(1,1)}</TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1,2)} style = {[styles.square, { borderRightWidth: 0} ]}>{this.renderIcon(1,2)}</TouchableOpacity>
        </View> 
        <View style = {{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.onTilePress(2,0)} style = {[styles.square, { borderLeftWidth: 0, borderBottomWidth: 0}]}>{this.renderIcon(2,0)}</TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2,1)} style = {[styles.square, { borderBottomWidth: 0}]}>{this.renderIcon(2,1)}</TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2,2)} style = {[styles.square, { borderBottomWidth: 0, borderRightWidth: 0}]}>{this.renderIcon(2,2)}</TouchableOpacity>
        </View> 
      </View>


      <View style={{paddingTop:50}}>
        <Button title="Nuevo juego" onPress={this.onNewGamePress} />
      </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  totalConatiner: {
    backgroundColor: '#b0bec5',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    borderWidth: 3,
    borderColor: 'purple',
    width: 100,
    height: 100,
    backgroundColor: '#eceff1',
    justifyContent: "center",
    alignItems: "center",
  },
  iconx: {
    fontSize: 80,
  },
  iconcircle: {
    fontSize: 70,
  }
});
