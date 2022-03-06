import React from 'react';
import { StyleSheet, View, ImageBackground, Pressable, Alert } from 'react-native';
import bg from './assets/bg.jpeg';


export default function App() {
  const [data, setData] = React.useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);

  const [turn, setTurn] = React.useState('x');

  const onPress = (indexRow, indexColumn) => {
    if (data[indexRow][indexColumn] !== '') {
      Alert.alert('Position is already ocupied');
      return;
    }

    setData((map) => {

      const updatedMap = [...map];
      updatedMap[indexRow][indexColumn] = turn;
      return updatedMap;
    })

    setTurn(turn === 'x' ? 'o' : 'x');
    checkWinningState();
  }

  const checkWinningState = () => {

    // rows
    for (let i = 0; i < 3; i++) {
      const isRowX = data[i].every((cell) => cell === 'x')

      const isRowO = data[i].every((cell) => cell === 'o')

      if (isRowX) {
        gameWon('x');
        break;
      }

      if (isRowO) {
        gameWon('o');
        break;
      }
    }

    // column
    for (let j = 0; j < 3; j++) {
      let isColumnX = true;
      let isColumnO = true;
      for (let i = 0; i < 3; i++) {
        if (data[i][j] !== 'x') {
          isColumnX = false;
        }
        if (data[i][j] !== 'o') {
          isColumnO = false;
        }
      }

      if (isColumnX) {
        gameWon('x');
      }
      if (isColumnO) {
        gameWon('o');
      }
    }

    // Duong cheo
    let isCroosX = true;
    let isCroosO = true;
    let isReverseCrossX = true;
    let isReverseCrossO = true;

    for (let i = 0; i < 3; i++) {

      if (data[i][i] !== 'x') {
        isCroosX = false;
      }
      if (data[i][i] !== 'o') {
        isCroosO = false;
      }

      if (data[i][3 - i - 1] !== 'x') {
        isReverseCrossX = false;
      }
      if (data[i][3 - i - 1] !== 'o') {
        isReverseCrossO = false;
      }
    }

    if (isCroosX) {
      gameWon('x');
    }

    if (isCroosO) {
      gameWon('o');
    }

    if (isReverseCrossX) {
      gameWon('x');
    }

    if (isReverseCrossO) {
      gameWon('o');
    }

  }

  const gameWon = (player) => {
    Alert.alert('Congratulations!!!', `${player} winnnnn`, [
      {
        text: 'Restarts',
        onPress: resetGame
      }
    ])
  }

  const resetGame = () => {
    setData([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setTurn('x');
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg}>

        <View
          style={{
            width: '88%',
            aspectRatio: 1,
          }}
        >
          {
            data.map((row, indexRow) => (
              <View
                key={`row-${indexRow}`}
                style={{
                  flexDirection: 'row',
                  flex: 1,

                }}
              >
                {
                  row.map((cell, indexColumn) => (
                    <Pressable
                      key={`cell-${indexRow}-${indexColumn}`}
                      style={{
                        flex: 1,
                      }}

                      onPress={() => onPress(indexRow, indexColumn)}
                    >
                      {
                        (cell === 'o') && (
                          <View style={styles.circel} />
                        )
                      }


                      {
                        (cell === 'x') && (
                          <View style={styles.cross}>
                            <View style={styles.crossLine} />
                            <View style={[styles.crossLine, styles.crossLineReversed]} />
                          </View>
                        )
                      }
                    </Pressable>

                  ))
                }
              </View>
            ))
          }
        </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242D34',
    alignItems: 'center',
    justifyContent: 'center',

  },
  bg: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  circel: {
    flex: 1,
    borderRadius: 58,
    borderWidth: 18,
    borderColor: 'white',
    margin: 10
  },
  cross: {
    flex: 1
  },
  crossLine: {
    position: 'absolute',
    left: '48%',
    width: 10,
    height: '100%',
    backgroundColor: 'white',
    transform: [{
      rotate: '45deg'
    }],
    borderRadius: 5
  },

  crossLineReversed: {
    transform: [{
      rotate: '-45deg'
    }]
  }
});
