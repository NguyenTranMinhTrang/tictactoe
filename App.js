import React from 'react';
import { StyleSheet, View, ImageBackground, Pressable, Alert, Text } from 'react-native';
import bg from './assets/bg.jpeg';

const copyMap = (original) => {
  const copy = original.map((arr) => {
    return arr.slice();
  })
  return copy;
}

export default function App() {
  const [data, setData] = React.useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);

  const [turn, setTurn] = React.useState('x');

  React.useEffect(() => {
    if (turn == 'o') {
      botTurn();
    }
  }, [turn])

  React.useEffect(() => {
    const winner = getWinner(data);
    if (winner) {
      gameWon(winner);
    } else {
      checkTieState();
    }
  }, [data]);

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

  }

  const getWinner = (map) => {

    // rows
    for (let i = 0; i < 3; i++) {
      const isRowX = map[i].every((cell) => cell === 'x')

      const isRowO = map[i].every((cell) => cell === 'o')

      if (isRowX) {
        return "x";
      }

      if (isRowO) {
        return "o";
      }
    }

    // column
    for (let j = 0; j < 3; j++) {
      let isColumnX = true;
      let isColumnO = true;
      for (let i = 0; i < 3; i++) {
        if (map[i][j] !== 'x') {
          isColumnX = false;
        }
        if (map[i][j] !== 'o') {
          isColumnO = false;
        }
      }

      if (isColumnX) {
        return "x";
      }
      if (isColumnO) {
        return "o";
      }
    }

    // Duong cheo
    let isCroosX = true;
    let isCroosO = true;
    let isReverseCrossX = true;
    let isReverseCrossO = true;

    for (let i = 0; i < 3; i++) {

      if (map[i][i] !== 'x') {
        isCroosX = false;
      }
      if (map[i][i] !== 'o') {
        isCroosO = false;
      }

      if (map[i][3 - i - 1] !== 'x') {
        isReverseCrossX = false;
      }
      if (map[i][3 - i - 1] !== 'o') {
        isReverseCrossO = false;
      }
    }

    if (isCroosX || isReverseCrossX) {
      return "x";
    }

    if (isCroosO || isReverseCrossO) {
      return "o";
    }


  }

  const checkTieState = () => {
    if (!data.some(row => row.some(cell => cell === ''))) {
      Alert.alert('Its a tie', 'tie', [
        {
          text: 'Restarts',
          onPress: resetGame
        }
      ])
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

  const botTurn = () => {
    const posiblePosition = [];

    data.forEach((row, indexRow) => {
      row.forEach((cell, indexColumn) => {
        if (cell === '') {
          posiblePosition.push({ row: indexRow, col: indexColumn });
        }
      });
    });

    let positionChoosed;

    // Attack
    posiblePosition.forEach(position => {
      const mapCopy = copyMap(data);
      mapCopy[position.row][position.col] = 'o';
      const winner = getWinner(mapCopy);
      if (winner === 'o') {
        positionChoosed = position;
      }
    })

    if (!positionChoosed) {
      posiblePosition.forEach(position => {
        const mapCopy = copyMap(data);
        mapCopy[position.row][position.col] = 'x';
        const winner = getWinner(mapCopy);
        if (winner === 'x') {
          positionChoosed = position;
        }
      })

    }

    if (!positionChoosed) {
      positionChoosed = posiblePosition[Math.floor(Math.random() * posiblePosition.length)];
    }

    if (positionChoosed) {
      onPress(positionChoosed.row, positionChoosed.col);
    }

  }

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg}>
        <Text
          style={{
            position: 'absolute',
            top: 50,
            fontSize: 20,
            color: 'white'
          }}
        >
          Current turn: {turn.toUpperCase()}
        </Text>
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
